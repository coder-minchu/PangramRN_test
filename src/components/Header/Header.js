import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Header = ({ title, cartCount, onBackPress, onCartPress, back }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
    {back && 
        <Image source={require('../../assets/image/back.png')} style={styles.backImage} />
    }
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onCartPress} style={styles.cartContainer}>
        <Text style={styles.cartText}>Cart {cartCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 0.2,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:5
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  cartContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
  },
  cartText: {
    fontSize: 20,
    color:"#000"
  },
});

export default Header;
