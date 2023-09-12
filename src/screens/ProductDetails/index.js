import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import CustomButton from '../../components/Button/CustomButton';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCart = () => {
        // Implement your cart logic here, e.g., store the product in state or AsyncStorage
        setIsAddedToCart(true);
    };

    const startRating = (num) => {
        if (num == 3) {
            return '★★★'
        } else if (num == 4) {
            return '★★★★'
        } else if (num == 5) {
            return '★★★★★'
        }
    }
    return (
        <View style={{ flex: 1 }}>
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
        alignItems: 'center'
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
    }
});
