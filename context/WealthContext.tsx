
import { Heir } from '@/utils/inheritance';
import React, { createContext, useContext, useState } from 'react';

export interface LedgerItem {
    id: string;
    type: 'asset' | 'debt' | 'credit';
    category: string;
    amount: number;
    description: string;
    date: string;
    partyName?: string; // Name of creditor/debtor
}

export interface Country {
    name: string;
    code: string;
    currency: string;
    symbol: string;
}

export const COUNTRIES: Country[] = [
    { name: 'Cameroon', code: 'CM', currency: 'XAF', symbol: 'FCFA' },
    { name: 'Nigeria', code: 'NG', currency: 'NGN', symbol: '₦' },
    { name: 'United Kingdom', code: 'GB', currency: 'GBP', symbol: '£' },
    { name: 'United States', code: 'US', currency: 'USD', symbol: '$' },
    { name: 'Saudi Arabia', code: 'SA', currency: 'SAR', symbol: 'SR' },
];

interface WealthContextType {
    items: LedgerItem[];
    addItem: (item: Omit<LedgerItem, 'id' | 'date'>) => void;
    updateItem: (id: string, item: Partial<Omit<LedgerItem, 'id' | 'date'>>) => void;
    deleteItem: (id: string) => void;
    totalAssets: number;
    totalDebts: number;
    totalCredits: number;
    netWorth: number;
    country: Country;
    setCountry: (country: Country) => void;
    formatCurrency: (amount: number) => string;
    // New inheritance persistence fields
    selectedHeirs: Heir[];
    setSelectedHeirs: React.Dispatch<React.SetStateAction<Heir[]>>;
    funeralExpenses: string;
    setFuneralExpenses: (val: string) => void;
    wasiyyah: string;
    setWasiyyah: (val: string) => void;
}

const WealthContext = createContext<WealthContextType | undefined>(undefined);

export function WealthProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<LedgerItem[]>([]);
    const [country, setCountry] = useState<Country>(COUNTRIES[0]); // Default to Cameroon

    // Inheritance state
    const [selectedHeirs, setSelectedHeirs] = useState<Heir[]>([]);
    const [funeralExpenses, setFuneralExpenses] = useState('100000');
    const [wasiyyah, setWasiyyah] = useState('0');

    const formatCurrency = (amount: number) => {
        return `${amount.toLocaleString('en-US')} ${country.currency}`;
    };

    const totalAssets = items
        .filter((i) => i.type === 'asset')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalDebts = items
        .filter((i) => i.type === 'debt')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalCredits = items
        .filter((i) => i.type === 'credit')
        .reduce((sum, i) => sum + i.amount, 0);

    const netWorth = totalAssets + totalCredits - totalDebts;

    const addItem = (item: Omit<LedgerItem, 'id' | 'date'>) => {
        const newItem: LedgerItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
        };
        setItems((prev) => [...prev, newItem]);
    };

    const updateItem = (id: string, updatedFields: Partial<Omit<LedgerItem, 'id' | 'date'>>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
        );
    };

    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    return (
        <WealthContext.Provider
            value={{
                items,
                addItem,
                updateItem,
                deleteItem,
                totalAssets,
                totalDebts,
                totalCredits,
                netWorth,
                country,
                setCountry,
                formatCurrency,
                selectedHeirs,
                setSelectedHeirs,
                funeralExpenses,
                setFuneralExpenses,
                wasiyyah,
                setWasiyyah,
            }}
        >
            {children}
        </WealthContext.Provider>
    );
}

export function useWealth() {
    const context = useContext(WealthContext);
    if (context === undefined) {
        throw new Error('useWealth must be used within a WealthProvider');
    }
    return context;
}
