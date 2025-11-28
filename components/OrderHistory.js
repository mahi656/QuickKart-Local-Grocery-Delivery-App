import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock order data - easily integrable with cart/checkout system
const MOCK_ORDERS = [
    {
        id: 'ORD001',
        date: '2024-01-15',
        status: 'Delivered',
        total: '$48.50',
        items: [
            { name: 'Fresh Apples', price: '$12.00', quantity: 1, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400' },
            { name: 'Organic Milk', price: '$6.50', quantity: 2, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
            { name: 'Brown Bread', price: '$4.50', quantity: 1, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
        ],
        deliveryTime: '8 mins',
    },
    {
        id: 'ORD002',
        date: '2024-01-12',
        status: 'Delivered',
        total: '$32.00',
        items: [
            { name: 'Bananas', price: '$6.00', quantity: 2, image: 'https://placehold.co/150/FFD93D/FFFFFF?text=Banana' },
            { name: 'Carrots', price: '$6.00', quantity: 1, image: 'https://placehold.co/150/E17055/FFFFFF?text=Carrot' },
        ],
        deliveryTime: '12 mins',
    },
];

export default function OrderHistory({ onRepeatOrder, onBack }) {
    const [orders] = useState(MOCK_ORDERS);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return '#4CAF50';
            case 'Cancelled': return '#f44336';
            default: return '#666';
        }
    };

    const handleRepeatOrder = (order) => {
        Alert.alert(
            'Repeat Order',
            `Add ${order.items.length} items to cart?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Add to Cart',
                    onPress: () => {
                        if (onRepeatOrder) {
                            onRepeatOrder(order.items);
                        }
                        Alert.alert('Success', 'Items added to cart!');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Icon name="arrow-back" size={24} color="#1a1a1a" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order History</Text>
                </View>
                <Text style={styles.headerSubtitle}>Your past orders</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {orders.map((order) => (
                    <View key={order.id} style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <View>
                                <Text style={styles.orderId}>Order #{order.id}</Text>
                                <Text style={styles.orderDate}>{order.date}</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
                                    {order.status}
                                </Text>
                                <Text style={styles.total}>{order.total}</Text>
                            </View>
                        </View>

                        <View style={styles.itemsContainer}>
                            {order.items.map((item, index) => (
                                <View key={index} style={styles.itemRow}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>
                                            {item.price} × {item.quantity}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.orderFooter}>
                            <Text style={styles.deliveryTime}>
                                Delivered in {order.deliveryTime}
                            </Text>
                            {order.status === 'Delivered' && (
                                <TouchableOpacity
                                    style={styles.repeatButton}
                                    onPress={() => handleRepeatOrder(order)}
                                >
                                    <Icon name="refresh" size={16} color="#4CAF50" />
                                    <Text style={styles.repeatText}>Repeat Order</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderId: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    orderDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    status: {
        fontSize: 14,
        fontWeight: '600',
    },
    total: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginTop: 2,
    },
    itemsContainer: {
        marginBottom: 12,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    itemPrice: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    deliveryTime: {
        fontSize: 12,
        color: '#666',
    },
    repeatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f8f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    repeatText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
        marginLeft: 4,
    },
});