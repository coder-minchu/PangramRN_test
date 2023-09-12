import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [cartCount, setCartCount] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const cart = await AsyncStorage.getItem('cart');
                    if (cart) {
                        const cartArray = JSON.parse(cart);
                        setCartItems(cartArray);
                        setCartCount(cartArray.length);
                    }
                } catch (error) {
                    console.error('Error retrieving cart items:', error);
                }
            };

            fetchData();

        }, [])
    );



    const addToCart = async () => {
        try {
            const existingCart = await AsyncStorage.getItem('cart');
            const cartArray = existingCart ? JSON.parse(existingCart) : [];

            const existingProduct = cartArray.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 0) + 1;
            } else {
                product.quantity = 1;
                cartArray.push(product);
            }

            await AsyncStorage.setItem('cart', JSON.stringify(cartArray));

            setCartCount(cartArray.length);
            setIsAddedToCart(true);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };



    const startRating = (num) => {
        // console.log(num)
        const stars = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];
        return stars[num];
    };

    return (
        <View style={{ flex: 1 }}>
            <Header
                title="Product Details"
                back={true}
                cartCount={cartCount}
                onBackPress={() => navigation.goBack()}
                onCartPress={() => navigation.navigate('ShoppingCart')}
            />
            <View style={styles.card}>
                <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
            </View>
            <View style={styles.priceView}>
                <View>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.discount}>Discount: {product.discountPercentage}%</Text>
                </View>
                <Text style={styles.stock}>In Stock: {product.stock} units</Text>
            </View>
            <View style={styles.descriptionView}>
                <Text style={[styles.description, { fontSize: 25, fontWeight: 'bold' }]}>Discription</Text>
                <Text style={styles.description}>{product.description}  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi. Vivamus vitae diam eu quam tincidunt hendrerit.
                    Sed vel magna a justo consectetur eleifend.
                    Phasellus quis libero eget arcu posuere fermentum.
                    Proin accumsan libero ut tristique.</Text>
                <Text style={[styles.description, { fontSize: 25, fontWeight: 'bold' }]}>Brand Name - <Text style={styles.brandName}>{product.brand}</Text> </Text>
                <Text style={[styles.description, { fontSize: 25, fontWeight: 'bold' }]}>Rating - <Text style={styles.rating}>{startRating(Math.round(product.rating))}</Text> </Text>

            </View>

            <View style={styles.buttonView}>
                <CustomButton
                    title={isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
                    onPress={addToCart}
                    disabled={isAddedToCart}
                    extraStyle={{
                        width: 300,
                        backgroundColor: 'green'
                    }}
                />
            </View>

        </View>
    );
};

export default ProductDetailsScreen;
const styles = StyleSheet.create({
    card: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red',
        flex: 0.4
    },
    thumbnail: {
        width: Dimensions.get('window').height / 3,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'cover',
    },
    backImage: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    details: {
        marginLeft: 10,
        flex: 1,
    },
    brandName: {
        fontSize: 18,
        color: 'green'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    brand: {
        fontSize: 16,
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
        padding: 5
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    stock: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    rating: {
        fontSize: 18,
        color: '#FFC300'
    },
    discount: {
        fontSize: 14,
    },
    priceView: {
        flex: 0.1,
        // backgroundColor:'blue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center'
    },
    descriptionView: {
        flex: 0.4,
        // backgroundColor: 'red',
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center'
    },
    buttonView: {
        flex: 0.1,
        // backgroundColor:'blue',
        justifyContent: 'center',
        alignItems: "center"
    },
    HeaderText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
