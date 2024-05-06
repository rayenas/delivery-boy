import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Header from '../Components/Home/Header';
import axios from 'axios';

export default function Home() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://10.2.40.59:4000/api/order/all');
                setOrders(response.data); // Assuming response.data is an array of orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); // Empty dependency array means this effect runs only once on component mount

    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleDelivered = async (orderId) => {
        try {
            const response = await axios.patch(`http://10.2.40.59:4000/api/order/update/${orderId}/deliver`);
            const updatedOrder = response.data;
            console.log("Order delivered successfully:", updatedOrder);
            
            // Update local state or perform any necessary actions after successful update
            // For example, you could re-fetch orders to reflect the updated status
            // or update the state directly to mark the order as delivered
            const updatedOrders = orders.map(order => {
                if (order._id === updatedOrder._id) {
                    return { ...order, deliveryStatus: 'Delivered' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error("Error delivering order:", error);
        }
    };

    const undeliveredOrders = orders.filter(order => order.deliveryStatus === "Pending");

    return (
        <ScrollView contentContainerStyle={{ padding: 20, marginTop: 25 }}>
            <Header />

            {undeliveredOrders.map((order, index) => (
                <View key={index} style={styles.orderContainer}>

                    <Text style={styles.orderInfo}>User: {order.userId.name}</Text>
                    <Text style={styles.orderInfo}>Email: {order.userId.email}</Text>
                    <Text style={styles.orderInfo}>Address: {order.address}</Text>
                    <Text style={styles.orderInfo}>Phone: {order.phone}</Text>
                    <Text style={styles.orderInfo}>Total Price: ${order.priceTotal}</Text>
                    <Text style={styles.subHeading}>Items Ordered:</Text>
                    {order.items.map((item, i) => (
                        <View key={i} style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.cheeseId.name}</Text>
                            <Text style={styles.itemInfo}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemInfo}>Price: ${item.cheeseId.price}</Text>
                            <Text style={styles.itemInfo}>Category: {item.cheeseId.category}</Text>
                            <Text style={styles.itemInfo}>Store: {item.cheeseId.store}</Text>
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleCall(order.phone)}
                        >
                            <Text style={styles.buttonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
    style={[styles.button, styles.deliveredButton]}
    onPress={() => handleDelivered(order._id)}
>
    <Text style={styles.buttonText}>Delivered</Text>
</TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        
    },
    orderContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        
    },
    orderInfo: {
        marginBottom: 5
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5
    },
    itemContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    itemInfo: {
        marginBottom: 3
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
  },
  button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%'
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold'
  },
  deliveredButton: {
      backgroundColor: '#28a745'
  }
});
