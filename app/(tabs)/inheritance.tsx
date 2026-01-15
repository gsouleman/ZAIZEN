import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useWealth } from '@/context/WealthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { calculateInheritance, HeirType } from '@/utils/inheritance';
import { exportInheritanceToPDF, exportWillToPDF } from '@/utils/pdf';
import React, { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const HEIR_TYPES: { type: HeirType, label: string }[] = [
    { type: 'husband', label: 'Husband' },
    { type: 'wife', label: 'Wife' },
    { type: 'father', label: 'Father' },
    { type: 'mother', label: 'Mother' },
    { type: 'son', label: 'Son' },
    { type: 'daughter', label: 'Daughter' },
];

export default function InheritanceScreen() {
    const {
        items,
        netWorth,
        totalDebts,
        formatCurrency,
        country,
        selectedHeirs,
        setSelectedHeirs,
        funeralExpenses,
        setFuneralExpenses,
        wasiyyah,
        setWasiyyah
    } = useWealth();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [editingHeirType, setEditingHeirType] = useState<HeirType | null>(null);

    const handleGenerateWill = async () => {
        const result = calculateInheritance(
            netWorth,
            parseFloat(funeralExpenses) || 0,
            totalDebts,
            parseFloat(wasiyyah) || 0,
            selectedHeirs
        );
        await exportWillToPDF(items, country, result, selectedHeirs);
    };

    const toggleHeir = (type: HeirType) => {
        setSelectedHeirs(prev => {
            const existing = prev.find(h => h.type === type);
            if (existing) {
                return prev.filter(h => h.type !== type);
            } else {
                return [...prev, { type, count: 1, names: [''] }];
            }
        });
    };

    const updateCount = (type: HeirType, delta: number) => {
        setSelectedHeirs(prev => prev.map(h => {
            if (h.type === type) {
                const newCount = Math.max(1, h.count + delta);
                let newNames = [...(h.names || [])];
                if (newCount > h.count) {
                    newNames.push('');
                } else if (newCount < h.count) {
                    newNames.pop();
                }
                return { ...h, count: newCount, names: newNames };
            }
            return h;
        }));
    };

    const updateName = (type: HeirType, index: number, name: string) => {
        setSelectedHeirs(prev => prev.map(h => {
            if (h.type === type) {
                const newNames = [...(h.names || [])];
                newNames[index] = name;
                return { ...h, names: newNames };
            }
            return h;
        }));
    };

    const results = useMemo(() => {
        return calculateInheritance(
            netWorth + totalDebts, // Total estate before debts
            parseFloat(funeralExpenses) || 0,
            totalDebts,
            parseFloat(wasiyyah) || 0,
            selectedHeirs
        );
    }, [netWorth, totalDebts, funeralExpenses, wasiyyah, selectedHeirs]);

    const handleExport = async () => {
        await exportInheritanceToPDF(results, country);
    };

    const currentEditingHeir = selectedHeirs.find(h => h.type === editingHeirType);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <ThemedText type="title">Inheritance</ThemedText>
                        <ThemedText style={styles.subtitle}>Calculate distribution (Fara'id)</ThemedText>
                    </View>
                    <TouchableOpacity
                        onPress={handleGenerateWill}
                        style={[styles.quickWillBtn, { backgroundColor: colors.primary }]}
                    >
                        <IconSymbol name="doc.text.fill" size={20} color="#FFF" />
                        <ThemedText style={styles.quickWillText}>Generate Will</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Estate Details</ThemedText>
                <View style={styles.inputGroup}>
                    <ThemedText style={styles.label}>Funeral Expenses (Est.)</ThemedText>
                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                        value={funeralExpenses}
                        onChangeText={setFuneralExpenses}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <ThemedText style={styles.label}>Bequests (Wasiyyah) - Max 1/3</ThemedText>
                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                        value={wasiyyah}
                        onChangeText={setWasiyyah}
                        keyboardType="numeric"
                    />
                </View>
            </ThemedView>

            <ThemedView style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Select Heirs</ThemedText>
                <View style={styles.heirGrid}>
                    {HEIR_TYPES.map((ht) => {
                        const selected = selectedHeirs.find(h => h.type === ht.type);
                        return (
                            <View key={ht.type} style={styles.heirItemContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.heirBtn,
                                        { borderColor: colors.border },
                                        selected && { backgroundColor: colors.primary, borderColor: colors.primary }
                                    ]}
                                    onPress={() => toggleHeir(ht.type)}
                                >
                                    <ThemedText style={[styles.heirBtnText, selected && { color: '#FFF' }]}>{ht.label}</ThemedText>
                                </TouchableOpacity>
                                {selected && (
                                    <View style={styles.heirControls}>
                                        <View style={styles.countControls}>
                                            <TouchableOpacity onPress={() => updateCount(ht.type, -1)}>
                                                <IconSymbol name="minus.circle.fill" size={20} color={colors.icon} />
                                            </TouchableOpacity>
                                            <ThemedText style={styles.countText}>{selected.count}</ThemedText>
                                            <TouchableOpacity onPress={() => updateCount(ht.type, 1)}>
                                                <IconSymbol name="plus.circle.fill" size={20} color={colors.icon} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.nameTag, { backgroundColor: colors.primary + '20' }]}
                                            onPress={() => {
                                                setEditingHeirType(ht.type);
                                                setNameModalVisible(true);
                                            }}
                                        >
                                            <IconSymbol name="person.2.fill" size={12} color={colors.primary} />
                                            <ThemedText style={[styles.nameTagText, { color: colors.primary }]}>Names</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </ThemedView>

            <ThemedView style={[styles.resultCard, { backgroundColor: colors.primary }]}>
                <View style={styles.resultHeader}>
                    <ThemedText style={styles.resultTitle}>Distribution Summary</ThemedText>
                    <TouchableOpacity onPress={handleExport} style={styles.exportIcon}>
                        <IconSymbol name="banknote.fill" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.resultRow}>
                    <ThemedText style={styles.resultLabel}>Net Distributable Estate:</ThemedText>
                    <ThemedText style={styles.resultValue}>{formatCurrency(results.netDistributableEstate)}</ThemedText>
                </View>

                <View style={styles.divider} />

                {results.distributions.length === 0 ? (
                    <ThemedText style={styles.noHeirsText}>Please select heirs to see distribution</ThemedText>
                ) : (
                    results.distributions.map((dist, idx) => (
                        <View key={idx} style={styles.distRow}>
                            <View style={{ flex: 1 }}>
                                <ThemedText style={styles.distHeir}>
                                    {dist.heir.charAt(0).toUpperCase() + dist.heir.slice(1)} ({dist.count})
                                </ThemedText>
                                {dist.names && dist.names.some(n => n.trim()) && (
                                    <ThemedText style={styles.distNames}>
                                        {dist.names.filter(n => n.trim()).join(', ')}
                                    </ThemedText>
                                )}
                                <ThemedText style={styles.distShare}>Share: {(dist.share * 100).toFixed(2)}%</ThemedText>
                            </View>
                            <ThemedText style={styles.distAmount}>{formatCurrency(dist.amount)}</ThemedText>
                        </View>
                    ))
                )}
            </ThemedView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={nameModalVisible}
                onRequestClose={() => setNameModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ThemedView style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <ThemedText type="subtitle" style={styles.modalTitle}>
                            Heir Names: {editingHeirType?.charAt(0).toUpperCase()}{editingHeirType?.slice(1)}
                        </ThemedText>

                        <ScrollView style={styles.nameList}>
                            {currentEditingHeir?.names?.map((name, index) => (
                                <View key={index} style={styles.nameInputRow}>
                                    <ThemedText style={styles.nameIndex}>{index + 1}.</ThemedText>
                                    <TextInput
                                        style={[styles.input, { flex: 1, color: colors.text, borderColor: colors.border }]}
                                        placeholder="Enter name"
                                        placeholderTextColor={colors.icon}
                                        value={name}
                                        onChangeText={(text) => updateName(editingHeirType!, index, text)}
                                    />
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.closeBtn, { backgroundColor: colors.primary }]}
                            onPress={() => setNameModalVisible(false)}
                        >
                            <ThemedText style={{ color: '#FFF', fontWeight: 'bold' }}>Done</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </View>
            </Modal>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    subtitle: {
        opacity: 0.6,
        marginTop: 4,
    },
    card: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 16,
    },
    cardTitle: {
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        fontSize: 16,
    },
    heirGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    heirItemContainer: {
        width: '48%',
        marginBottom: 12,
    },
    heirBtn: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    heirBtnText: {
        fontSize: 14,
        fontWeight: '600',
    },
    heirControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 8,
    },
    countControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    countText: {
        fontSize: 14,
        fontWeight: 'bold',
        minWidth: 16,
        textAlign: 'center',
    },
    nameTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        gap: 4,
    },
    nameTagText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        maxHeight: '80%',
    },
    modalTitle: {
        marginBottom: 20,
        textAlign: 'center',
    },
    nameList: {
        marginBottom: 20,
    },
    nameInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    nameIndex: {
        width: 20,
        fontSize: 14,
        opacity: 0.5,
    },
    closeBtn: {
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    resultCard: {
        marginHorizontal: 20,
        padding: 24,
        borderRadius: 24,
        marginTop: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    exportIcon: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    resultTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    resultLabel: {
        color: 'rgba(255,255,255,0.8)',
    },
    resultValue: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 16,
    },
    noHeirsText: {
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    distRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    distHeir: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    },
    distNames: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 12,
        marginTop: 2,
        fontStyle: 'italic',
    },
    distShare: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
    },
    distAmount: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    quickWillBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        gap: 6,
    },
    quickWillText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
