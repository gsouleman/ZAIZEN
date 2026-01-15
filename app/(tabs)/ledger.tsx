
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { LedgerItem, useWealth } from '@/context/WealthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { exportLedgerToPDF } from '@/utils/pdf';

export default function LedgerScreen() {
    const { items, addItem, updateItem, deleteItem, formatCurrency, country, netWorth } = useWealth();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [type, setType] = useState<'asset' | 'debt' | 'credit'>('asset');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [partyName, setPartyName] = useState('');
    const [viewMode, setViewMode] = useState<'entries' | 'statements'>('entries');

    const handleEdit = (item: LedgerItem) => {
        setEditingId(item.id);
        setType(item.type);
        setAmount(item.amount.toString());
        setCategory(item.category);
        setDescription(item.description);
        setPartyName(item.partyName || '');
        setModalVisible(true);
    };

    const handleAddEntry = () => {
        if (!amount || !category) return;
        addItem({
            type,
            amount: parseFloat(amount),
            category,
            description,
            partyName: type !== 'asset' ? partyName : undefined,
        });
        closeModal();
    };

    const handleUpdate = () => {
        if (!amount || !category || !editingId) return;
        updateItem(editingId, {
            type,
            amount: parseFloat(amount),
            category,
            description,
            partyName: type !== 'asset' ? partyName : undefined,
        });
        closeModal();
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingId(null);
        setAmount('');
        setCategory('');
        setDescription('');
        setPartyName('');
    };

    const handleExport = async () => {
        await exportLedgerToPDF(items, country, netWorth);
    };

    const handleExportStatement = async (item: LedgerItem) => {
        const { exportConfirmationStatement } = await import('@/utils/pdf');
        await exportConfirmationStatement([item], country);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'asset': return 'wallet.fill';
            case 'debt': return 'creditcard.fill';
            case 'credit': return 'banknote.fill';
            default: return 'doc.text.fill';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'asset': return colors.primary;
            case 'debt': return colors.error;
            case 'credit': return colors.tint;
            default: return colors.text;
        }
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <ThemedText type="title">Ledger</ThemedText>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={[styles.exportButton, { borderColor: colors.border }]}
                        onPress={handleExport}
                    >
                        <IconSymbol name="doc.text.fill" size={20} color={colors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: colors.primary }]}
                        onPress={() => setModalVisible(true)}
                    >
                        <IconSymbol name="plus.circle.fill" size={20} color="#FFF" />
                        <ThemedText style={styles.addButtonText}>New</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.viewToggleContainer}>
                <TouchableOpacity
                    style={[styles.viewToggle, viewMode === 'entries' && { backgroundColor: colors.primary }]}
                    onPress={() => setViewMode('entries')}
                >
                    <ThemedText style={[styles.viewToggleText, viewMode === 'entries' && { color: '#FFF' }]}>Entries</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.viewToggle, viewMode === 'statements' && { backgroundColor: colors.primary }]}
                    onPress={() => setViewMode('statements')}
                >
                    <ThemedText style={[styles.viewToggleText, viewMode === 'statements' && { color: '#FFF' }]}>Statements</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.list}>
                {viewMode === 'entries' ? (
                    items.length === 0 ? (
                        <View style={styles.emptyState}>
                            <IconSymbol name="doc.text.fill" size={48} color={colors.icon} />
                            <ThemedText style={{ color: colors.icon, marginTop: 16 }}>No entries yet. Start by adding your assets or debts.</ThemedText>
                        </View>
                    ) : (
                        items.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleEdit(item)}
                                style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            >
                                <View style={[styles.iconBox, { backgroundColor: getColor(item.type) + '20' }]}>
                                    <IconSymbol name={getIcon(item.type)} size={20} color={getColor(item.type)} />
                                </View>
                                <View style={styles.itemContent}>
                                    <ThemedText style={styles.itemCategory}>{item.category}</ThemedText>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                        {item.partyName && <ThemedText style={styles.itemParty}>{item.partyName} • </ThemedText>}
                                        <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
                                    </View>
                                </View>
                                <View style={styles.itemRight}>
                                    <ThemedText style={[styles.itemAmount, { color: getColor(item.type) }]}>
                                        {item.type === 'debt' ? '-' : ''}{formatCurrency(item.amount)}
                                    </ThemedText>
                                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                                        {item.type !== 'asset' && (
                                            <TouchableOpacity onPress={() => handleExportStatement(item)}>
                                                <IconSymbol name="paperplane.fill" size={18} color={colors.secondary} />
                                            </TouchableOpacity>
                                        )}
                                        <TouchableOpacity onPress={() => deleteItem(item.id)}>
                                            <IconSymbol name="minus.circle.fill" size={18} color={colors.error} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )
                ) : (
                    // Statements View: Group by partyName AND type
                    Object.entries(
                        items.filter(i => i.type !== 'asset' && i.partyName)
                            .reduce((acc, item) => {
                                const key = `${item.partyName}-${item.type}`;
                                if (!acc[key]) acc[key] = [];
                                acc[key].push(item);
                                return acc;
                            }, {} as Record<string, LedgerItem[]>)
                    ).length === 0 ? (
                        <View style={styles.emptyState}>
                            <IconSymbol name="person.2.fill" size={48} color={colors.icon} />
                            <ThemedText style={{ color: colors.icon, marginTop: 16 }}>No grouped statements yet. Add names to your debts or credits.</ThemedText>
                        </View>
                    ) : (
                        Object.entries(
                            items.filter(i => i.type !== 'asset' && i.partyName)
                                .reduce((acc, item) => {
                                    const key = `${item.partyName}-${item.type}`;
                                    if (!acc[key]) acc[key] = [];
                                    acc[key].push(item);
                                    return acc;
                                }, {} as Record<string, LedgerItem[]>)
                        ).map(([groupKey, groupItems]) => {
                            const total = groupItems.reduce((s, i) => s + i.amount, 0);
                            const type = groupItems[0].type;
                            const name = groupItems[0].partyName!;
                            return (
                                <View
                                    key={groupKey}
                                    style={[styles.statementCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                                >
                                    <View style={styles.statementInfo}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <ThemedText style={styles.statementName}>{name}</ThemedText>
                                            <View style={[styles.typeBadge, { backgroundColor: getColor(type) + '20' }]}>
                                                <ThemedText style={[styles.typeBadgeText, { color: getColor(type) }]}>
                                                    {type.toUpperCase()}
                                                </ThemedText>
                                            </View>
                                        </View>
                                        <ThemedText style={styles.statementCount}>{groupItems.length} items</ThemedText>
                                    </View>
                                    <View style={styles.statementRight}>
                                        <ThemedText style={[styles.statementAmount, { color: getColor(type) }]}>
                                            {formatCurrency(total)}
                                        </ThemedText>
                                        <TouchableOpacity
                                            style={[styles.genStatementBtn, { backgroundColor: colors.primary }]}
                                            onPress={() => {
                                                import('@/utils/pdf').then(m => m.exportConfirmationStatement(groupItems, country));
                                            }}
                                        >
                                            <IconSymbol name="doc.text.fill" size={16} color="#FFF" />
                                            <ThemedText style={styles.genStatementText}>Statement</ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )
                )}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <ThemedView style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <ThemedText type="subtitle" style={styles.modalTitle}>
                            {editingId ? 'Edit Entry' : 'New Entry'}
                        </ThemedText>

                        <View style={styles.typeSelector}>
                            {(['asset', 'debt', 'credit'] as const).map((t) => (
                                <TouchableOpacity
                                    key={t}
                                    style={[
                                        styles.typeBtn,
                                        type === t && { backgroundColor: getColor(t), borderColor: getColor(t) },
                                        { borderColor: colors.border }
                                    ]}
                                    onPress={() => setType(t)}
                                >
                                    <ThemedText style={[styles.typeBtnText, type === t && { color: '#FFF' }]}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {type !== 'asset' && (
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                                placeholder={type === 'debt' ? "Creditor Name" : "Debtor Name"}
                                placeholderTextColor={colors.icon}
                                value={partyName}
                                onChangeText={setPartyName}
                            />
                        )}

                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            placeholder="Amount"
                            placeholderTextColor={colors.icon}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            placeholder="Category (e.g. Cash, Car, Personal Loan)"
                            placeholderTextColor={colors.icon}
                            value={category}
                            onChangeText={setCategory}
                        />
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border, height: 80 }]}
                            placeholder="Description (Optional)"
                            placeholderTextColor={colors.icon}
                            multiline
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
                                <ThemedText>Cancel</ThemedText>
                            </TouchableOpacity>

                            <View style={styles.modalMainActions}>
                                {editingId && (
                                    <>
                                        <TouchableOpacity
                                            style={[styles.smallBtn, { borderColor: colors.error }]}
                                            onPress={() => {
                                                deleteItem(editingId);
                                                closeModal();
                                            }}
                                        >
                                            <ThemedText style={{ color: colors.error, fontSize: 13, fontWeight: '600' }}>Delete</ThemedText>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.smallBtn, { borderColor: colors.primary }]}
                                            onPress={handleAddEntry}
                                        >
                                            <ThemedText style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>Add Entry</ThemedText>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.saveBtn, { backgroundColor: colors.primary }]}
                                            onPress={handleUpdate}
                                        >
                                            <ThemedText style={styles.saveBtnText}>Update</ThemedText>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {!editingId && (
                                    <TouchableOpacity
                                        style={[styles.saveBtn, { backgroundColor: colors.primary }]}
                                        onPress={handleAddEntry}
                                    >
                                        <ThemedText style={styles.saveBtnText}>Add Entry</ThemedText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </ThemedView>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    exportButton: {
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        gap: 8,
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        opacity: 0.6,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    itemContent: {
        flex: 1,
    },
    itemCategory: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemDescription: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 2,
    },
    itemRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    itemAmount: {
        fontSize: 16,
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
        minHeight: 500,
    },
    modalTitle: {
        marginBottom: 20,
        textAlign: 'center',
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    typeBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    typeBtnText: {
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    cancelBtn: {
        padding: 12,
    },
    saveBtn: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    saveBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    modalMainActions: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    smallBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    viewToggleContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 12,
    },
    viewToggle: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    viewToggleText: {
        fontSize: 14,
        fontWeight: '600',
        opacity: 0.7,
    },
    itemParty: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    statementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    statementInfo: {
        flex: 1,
    },
    statementName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statementCount: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 2,
    },
    statementRight: {
        alignItems: 'flex-end',
        gap: 8,
    },
    statementAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    genStatementBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        gap: 6,
    },
    genStatementText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    typeBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    typeBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});
