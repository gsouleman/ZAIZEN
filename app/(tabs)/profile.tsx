import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { COUNTRIES, Country, useWealth } from '@/context/WealthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const { country, setCountry } = useWealth();
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelectCountry = (c: Country) => {
        setCountry(c);
        setModalVisible(false);
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <ThemedText type="title">Profile</ThemedText>
            </View>

            <View style={styles.profileSection}>
                <View style={[styles.avatarContainer, { borderColor: colors.secondary }]}>
                    <IconSymbol name="house.fill" size={60} color={colors.secondary} />
                </View>
                <ThemedText type="subtitle" style={styles.userName}>Abdullah Farouk</ThemedText>
                <ThemedText style={styles.userEmail}>abdullah.f@example.com</ThemedText>
            </View>

            <View style={styles.settingsSection}>
                <TouchableOpacity
                    style={[styles.settingItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                    onPress={() => setModalVisible(true)}
                >
                    <View style={styles.settingLeft}>
                        <IconSymbol name="paperplane.fill" size={22} color={colors.secondary} />
                        <View>
                            <ThemedText style={styles.settingLabel}>Region & Currency</ThemedText>
                            <ThemedText style={styles.settingSublabel}>{country.name} ({country.currency})</ThemedText>
                        </View>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colors.icon} />
                </TouchableOpacity>

                <SettingItem
                    icon="doc.text.fill"
                    label="Export Will (PDF)"
                    colors={colors}
                />
                <SettingItem
                    icon="person.2.fill"
                    label="Manage Beneficiaries"
                    colors={colors}
                />
                <SettingItem
                    icon="account.balance.fill"
                    label="Zakat Preferences"
                    colors={colors}
                    last
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <ThemedView style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <ThemedText type="title" style={styles.modalTitle}>Select Region</ThemedText>
                        <ScrollView>
                            {COUNTRIES.map((c) => (
                                <TouchableOpacity
                                    key={c.code}
                                    style={[
                                        styles.countryOption,
                                        { borderBottomColor: colors.border },
                                        country.code === c.code && { backgroundColor: colors.primary + '10' }
                                    ]}
                                    onPress={() => handleSelectCountry(c)}
                                >
                                    <View>
                                        <ThemedText style={styles.countryName}>{c.name}</ThemedText>
                                        <ThemedText style={styles.currencyName}>{c.currency} - {c.symbol}</ThemedText>
                                    </View>
                                    {country.code === c.code && (
                                        <IconSymbol name="chevron.right" size={20} color={colors.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={[styles.closeBtn, { backgroundColor: colors.primary }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <ThemedText style={{ color: '#FFF', fontWeight: 'bold' }}>Close</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </View>
            </Modal>

            <View style={styles.footer}>
                <ThemedText style={styles.versionText}>ZAIZEN v1.0.0</ThemedText>
                <ThemedText style={styles.footerText}>Secure & Shari'ah Compliant</ThemedText>
            </View>
        </ThemedView>
    );
}

function SettingItem({ icon, label, colors, last }: any) {
    return (
        <TouchableOpacity style={[styles.settingItem, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
            <View style={styles.settingLeft}>
                <IconSymbol name={icon} size={22} color={colors.secondary} />
                <ThemedText style={styles.settingLabel}>{label}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(180, 83, 9, 0.05)', // Amber base
    },
    userName: {
        fontWeight: 'bold',
    },
    userEmail: {
        opacity: 0.6,
        fontSize: 14,
        marginTop: 4,
    },
    settingsSection: {
        paddingHorizontal: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingSublabel: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 2,
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
    countryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
    },
    countryName: {
        fontSize: 16,
        fontWeight: '600',
    },
    currencyName: {
        fontSize: 12,
        opacity: 0.6,
        marginTop: 2,
    },
    closeBtn: {
        marginTop: 20,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    },
    versionText: {
        opacity: 0.4,
        fontSize: 12,
    },
    footerText: {
        color: '#B45309',
        fontWeight: '600',
        fontSize: 12,
        marginTop: 4,
    },
});
