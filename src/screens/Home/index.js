import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, ActivityIndicator, BackHandler, Alert, TouchableOpacity } from 'react-native';
import Card from '../../components/Card/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cartCount, setCartCount] = useState(null);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            setProducts([])

        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const cart = await AsyncStorage.getItem('cart');
                    if (cart) {
                        const cartArray = JSON.parse(cart);
                        setCartCount(cartArray.length);
                    }
                } catch (error) {
                    console.error('Error retrieving cart items:', error);
                }
            };

            fetchData();

        }, [])
    );

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchProducts();
        setRefreshing(false);
    };

    const navigateToProductDetails = (product) => {
        navigation.navigate('ProductDetails', { product: product });
    };

    return (
        <View style={styles.container}>
            <Header
                title="Home"
                back={false}
                cartCount={cartCount}
                onCartPress={() => navigation.navigate('ShoppingCart')}
            />
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={styles.contentContainer}>
                    <Button title="Refresh" onPress={handleRefresh} />
                    {
                        products?.length === 0 &&
                        <View style={styles.noProductsContainer}>
                            <Text>No Products found</Text>
                        </View>
                    }
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Card item={item} onPress={navigateToProductDetails} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    />
                </View>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 0.94,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 0.94,
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
