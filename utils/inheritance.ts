
export type HeirType =
    | 'husband'
    | 'wife'
    | 'father'
    | 'mother'
    | 'son'
    | 'daughter'
    | 'paternal_grandfather'
    | 'paternal_grandmother'
    | 'maternal_grandmother';

export interface Heir {
    type: HeirType;
    count: number;
    names?: string[];
}

export interface CalculationResult {
    netDistributableEstate: number;
    wasiyyahAmount: number;
    funeralAndDebts: number;
    distributions: {
        heir: HeirType;
        share: number; // Fraction
        amount: number;
        count: number;
        names?: string[];
    }[];
}

export function calculateInheritance(
    totalEstate: number,
    funeralExpenses: number,
    debts: number,
    wasiyyah: number,
    heirs: Heir[]
): CalculationResult {
    const funeralAndDebts = funeralExpenses + debts;
    const estateAfterDebts = Math.max(0, totalEstate - funeralAndDebts);

    // Wasiyyah is max 1/3 of estate after debts
    const maxWasiyyah = estateAfterDebts / 3;
    const wasiyyahAmount = Math.min(wasiyyah, maxWasiyyah);
    const netDistributableEstate = estateAfterDebts - wasiyyahAmount;

    if (netDistributableEstate <= 0) {
        return {
            netDistributableEstate: 0,
            wasiyyahAmount,
            funeralAndDebts,
            distributions: [],
        };
    }

    // Simplified calculation logic for V1
    // In a real app, this would use a more robust fractional engine to handle Awal and Radd

    const shares: Record<string, number> = {};
    const counts: Record<string, number> = {};
    const namesMap: Record<string, string[]> = {};
    heirs.forEach(h => {
        counts[h.type] = h.count;
        if (h.names) namesMap[h.type] = h.names;
    });

    const hasChildren = (counts['son'] || 0) > 0 || (counts['daughter'] || 0) > 0;

    // 1. Spouses
    if (counts['husband']) {
        shares['husband'] = hasChildren ? 1 / 4 : 1 / 2;
    } else if (counts['wife']) {
        shares['wife'] = hasChildren ? 1 / 8 : 1 / 4; // Shared among all wives
    }

    // 2. Parents
    if (counts['father']) {
        shares['father'] = hasChildren ? 1 / 6 : 0; // If no children, he is residuary
    }
    if (counts['mother']) {
        if (hasChildren) {
            shares['mother'] = 1 / 6;
        } else {
            // simplified: if no children and no siblings...
            shares['mother'] = 1 / 3;
        }
    }

    // 3. Daughters (if no sons)
    if (!counts['son'] && counts['daughter']) {
        if (counts['daughter'] === 1) {
            shares['daughter'] = 1 / 2;
        } else {
            shares['daughter'] = 2 / 3; // Shared
        }
    }

    // Sum of fixed shares
    let totalFixedShare = Object.values(shares).reduce((a, b) => a + b, 0);

    // If totalFixedShare > 1, apply Awal (Proportional reduction)
    if (totalFixedShare > 1) {
        const factor = 1 / totalFixedShare;
        Object.keys(shares).forEach(k => shares[k] *= factor);
        totalFixedShare = 1;
    }

    // 4. Residue (Asabah)
    const residue = 1 - totalFixedShare;
    const residuaryDistributions: Record<string, number> = {};

    if (residue > 0) {
        // Priority: Son(s) & Daughter(s) in 2:1 ratio
        if (counts['son']) {
            const daughterCount = counts['daughter'] || 0;
            const totalParts = (counts['son'] * 2) + daughterCount;
            const partValue = residue / totalParts;

            residuaryDistributions['son'] = partValue * 2 * counts['son'];
            if (daughterCount > 0) {
                residuaryDistributions['daughter'] = partValue * daughterCount;
            }
        } else if (counts['father'] && !hasChildren) {
            // Father becomes residuary if no children
            residuaryDistributions['father'] = residue;
        } else {
            // Apply Radd (Redistribution to fixed heirs except spouse)
            // For simplicity, we'll just keep it as unallocated for now or give to father if exists
            if (counts['father']) {
                residuaryDistributions['father'] = (residuaryDistributions['father'] || 0) + residue;
            } else {
                // If no asabah, redistribute to others proportionally (Radd)
                const nonSpouseFixedHeirs = Object.keys(shares).filter(k => k !== 'husband' && k !== 'wife');
                const nonSpouseSum = nonSpouseFixedHeirs.reduce((a, k) => a + shares[k], 0);
                if (nonSpouseSum > 0) {
                    const raddFactor = (nonSpouseSum + residue) / nonSpouseSum;
                    nonSpouseFixedHeirs.forEach(k => shares[k] *= raddFactor);
                }
            }
        }
    }

    // Compile results
    const resultDistributions: CalculationResult['distributions'] = [];

    [...Object.keys(shares), ...Object.keys(residuaryDistributions)].forEach(k => {
        const type = k as HeirType;
        const fixedShare = shares[k] || 0;
        const residuaryShare = residuaryDistributions[k] || 0;
        const totalShare = fixedShare + residuaryShare;

        if (totalShare > 0) {
            // Avoid duplicates
            const existing = resultDistributions.find(d => d.heir === type);
            if (existing) {
                existing.share += totalShare;
                existing.amount += totalShare * netDistributableEstate;
                if (namesMap[type]) existing.names = namesMap[type];
            } else {
                resultDistributions.push({
                    heir: type,
                    share: totalShare,
                    amount: totalShare * netDistributableEstate,
                    count: counts[type] || 1,
                    names: namesMap[type]
                });
            }
        }
    });

    return {
        netDistributableEstate,
        wasiyyahAmount,
        funeralAndDebts,
        distributions: resultDistributions,
    };
}
