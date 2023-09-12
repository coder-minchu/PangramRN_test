import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Card = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(item)}>
            <View style={styles.cardImage}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                />
            </View>
            <View style={styles.cardDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Text style={styles.stock}>In Stock: {item.stock} units</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: '#fff',
    },
    thumbnail: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    cardDetails: {
        flex: 1,
        padding: 10,
        // backgroundColor: 'red'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginTop: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    stock: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    cardImage: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
});

export default Card;
