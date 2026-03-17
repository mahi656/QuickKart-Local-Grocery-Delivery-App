import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ onBack, onLogout }) {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
    const [userData, setUserData] = React.useState({ name: 'User', email: 'user@example.com' });
    const [orderCount, setOrderCount] = React.useState(0);
    const [addressCount, setAddressCount] = React.useState(0);

    React.useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('userEmail');
            const ordersJson = await AsyncStorage.getItem('userOrders');
            const addressesJson = await AsyncStorage.getItem('userAddresses');

            if (name || email) {
                setUserData({
                    name: name || 'User',
                    email: email || 'user@example.com'
                });
            }

            if (ordersJson) {
                const orders = JSON.parse(ordersJson);
                setOrderCount(orders.length);
            }

            if (addressesJson) {
                const addresses = JSON.parse(addressesJson);
                setAddressCount(addresses.length);
            }
        } catch (error) {
            console.log('Error loading user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            if (onLogout) {
                onLogout();
            }
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    const theme = {
        background: isDarkMode ? '#121212' : '#f8f9fa',
        card: isDarkMode ? '#1E1E1E' : '#fff',
        text: isDarkMode ? '#fff' : '#1A1A1A',
        textSecondary: isDarkMode ? '#b0b0b0' : '#888',
        border: isDarkMode ? '#333' : '#eee',
        iconBg: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        avatarBorder: isDarkMode ? '#1E1E1E' : '#fff',
    };

    const MenuOption = ({ icon, title, subtitle, onPress, showArrow = true, color = "#1A1A1A" }) => (
        <TouchableOpacity style={styles(theme).menuOption} onPress={onPress}>
            <View style={[styles(theme).iconContainer, { backgroundColor: isDarkMode ? `${color}25` : `${color}15` }]}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <View style={styles(theme).menuTextContainer}>
                <Text style={styles(theme).menuTitle}>{title}</Text>
                {subtitle && <Text style={styles(theme).menuSubtitle}>{subtitle}</Text>}
            </View>
            {showArrow && <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles(theme).container}>
            {/* Header */}
            <View style={styles(theme).header}>
                <TouchableOpacity onPress={onBack} style={styles(theme).backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={styles(theme).headerTitle}>Profile</Text>
                <TouchableOpacity style={styles(theme).editButton}>
                    <Text style={styles(theme).editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles(theme).scrollContent}>
                {/* User Info Card */}
                <View style={styles(theme).profileCard}>
                    <View style={styles(theme).avatarContainer}>
                        <View style={styles(theme).avatarIconContainer}>
                            <Ionicons name="person" size={50} color="#4CAF50" />
                        </View>
                        <View style={styles(theme).cameraButton}>
                            <Ionicons name="camera" size={14} color="#fff" />
                        </View>
                    </View>
                    <Text style={styles(theme).userName}>{userData.name}</Text>
                    <Text style={styles(theme).userEmail}>{userData.email}</Text>
                    <View style={styles(theme).statsRow}>
                        <View style={styles(theme).statItem}>
                            <Text style={styles(theme).statNumber}>{orderCount}</Text>
                            <Text style={styles(theme).statLabel}>Orders</Text>
                        </View>
                        <View style={styles(theme).statDivider} />
                        <View style={styles(theme).statItem}>
                            <Text style={styles(theme).statNumber}>{addressCount}</Text>
                            <Text style={styles(theme).statLabel}>Addresses</Text>
                        </View>
                    </View>
                </View>

                
                <Text style={styles(theme).sectionHeader}>Account</Text>
                <View style={styles(theme).sectionContainer}>
                    <MenuOption
                        icon="person-outline"
                        title="Personal Information"
                        subtitle="Name, Email, Phone"
                        color="#4CAF50"
                    />
                    <MenuOption
                        icon="location-outline"
                        title="Saved Addresses"
                        subtitle="Home, Office"
                        color="#2196F3"
                    />
                    <MenuOption
                        icon="card-outline"
                        title="Payment Methods"
                        subtitle="Visa **42"
                        color="#9C27B0"
                    />
                </View>

                {/* General Settings */}
                <Text style={styles(theme).sectionHeader}>General</Text>
                <View style={styles(theme).sectionContainer}>
                    <View style={styles(theme).menuOption}>
                        <View style={[styles(theme).iconContainer, { backgroundColor: isDarkMode ? "#FF980025" : "#FF980015" }]}>
                            <Ionicons name="notifications-outline" size={22} color="#FF9800" />
                        </View>
                        <View style={styles(theme).menuTextContainer}>
                            <Text style={styles(theme).menuTitle}>Notifications</Text>
                        </View>
                        <Switch
                            value={isNotificationsEnabled}
                            onValueChange={setIsNotificationsEnabled}
                            trackColor={{ false: theme.border, true: "#4CAF50" }}
                            thumbColor={"#fff"}
                        />
                    </View>
                    <View style={styles(theme).menuOption}>
                        <View style={[styles(theme).iconContainer, { backgroundColor: isDarkMode ? "#607D8B25" : "#607D8B15" }]}>
                            <Ionicons name={isDarkMode ? "moon" : "moon-outline"} size={22} color="#607D8B" />
                        </View>
                        <View style={styles(theme).menuTextContainer}>
                            <Text style={styles(theme).menuTitle}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={setIsDarkMode}
                            trackColor={{ false: theme.border, true: "#4CAF50" }}
                            thumbColor={"#fff"}
                        />
                    </View>
                    <MenuOption
                        icon="language-outline"
                        title="Language"
                        subtitle="English (US)"
                        color="#009688"
                    />
                    <MenuOption
                        icon="help-circle-outline"
                        title="Help Center"
                        color="#607D8B"
                    />
                </View>

                <TouchableOpacity style={styles(theme).logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                    <Text style={styles(theme).logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles(theme).versionText}>Version 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: theme.card,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.text,
    },
    editButton: {
        padding: 8,
    },
    editButtonText: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "600",
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileCard: {
        backgroundColor: theme.card,
        margin: 20,
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 5,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatarIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E8F5E9",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: theme.avatarBorder,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#4CAF50",
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: theme.avatarBorder,
    },
    userName: {
        fontSize: 22,
        fontWeight: "800",
        color: theme.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: theme.textSecondary,
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around",
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: theme.textSecondary,
        fontWeight: "500",
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: theme.border,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "700",
        color: theme.text,
        marginLeft: 20,
        marginBottom: 12,
        marginTop: 8,
    },
    sectionContainer: {
        backgroundColor: theme.card,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 8,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.text,
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 12,
        color: theme.textSecondary,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginTop: 10,
        padding: 16,
        backgroundColor: theme.background === '#121212' ? 'rgba(255, 107, 107, 0.1)' : "#FFF0F0",
        borderRadius: 16,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FF6B6B",
        marginLeft: 8,
    },
    versionText: {
        textAlign: "center",
        color: theme.textSecondary,
        fontSize: 12,
        marginTop: 24,
    },
});
