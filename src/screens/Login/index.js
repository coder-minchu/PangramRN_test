import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
import Input from '../../components/Input/Input';
import CustomButton from '../../components/Button/CustomButton';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('yash@gmail.com');
    const [password, setPassword] = useState('123456');

    const handleLogin = () => {
        // Hardcoded username and password for demonstration purposes
        const hardcodedUsername = 'yash@gmail.com';
        const hardcodedPassword = '123456';

        if (username === hardcodedUsername && password === hardcodedPassword) {
            Alert.alert('Login successful', '', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Home');
                    },
                },
            ]);
        } else {
            Alert.alert('Login failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Input
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <CustomButton title="Login" onPress={handleLogin} />    
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
});
