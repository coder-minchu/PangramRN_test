import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
          const cartArray = JSON.parse(cart);
          setCartItems(cartArray);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  const incrementQuantity = (item) => {
    console.log('item.. ', item);
    console.log('cartItems.. ', cartItems);
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const saveCartToStorage = async (cart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const removeItem = (item) => {
    // Remove the selected item from the cart
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    saveCartToStorage(updatedCart);
  };
  return (
    <View style={styles.container}>
    {cartItems.length === 0 ? (
      <Text>Your cart is empty</Text>
    ) : (
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
            </View>
            <View style={styles.quantityControl}>
              <Button title="-" onPress={() => decrementQuantity(item)} />
              <Text style={styles.quantityText}>{item.quantity ? item.quantity : 1}</Text>
              <Button title="+" onPress={() => incrementQuantity(item)} />
            </View>
            <Button title="Remove" onPress={() => removeItem(item)} color="red" />
          </View>
        )}
      />
    )}
    <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
  </View>
    );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});
