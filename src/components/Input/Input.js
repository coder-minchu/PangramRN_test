import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%', 
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default Input;
