import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  return (
    <View>
      <Text>Your Shopping Cart:</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text>{item.title}</Text>
            {/* Display other product details here */}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ShoppingCart;
