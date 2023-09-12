import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, ActivityIndicator, BackHandler, Alert } from 'react-native';
import Card from '../../components/Card/Card';

const Home = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cartCount, setCartC0unt] = useState(null);
    // console.log('products.. ', products)

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
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.06, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flex: 0.2 }} />
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.HeaderText}>Home</Text>
                </View>
                <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.HeaderText, { borderColor: 'grey', borderWidth: 1, padding: 5, fontSize: 20 }]}>Cart {cartCount}</Text>
                </View>
            </View>
            {isLoading ? (
                <View style={{ flex: 0.94, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={{ flex: 0.94 }}>
                    <Button title="Refresh" onPress={handleRefresh} />
                    {
                        products?.length === 0 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    HeaderText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
