import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }
        const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
        await AsyncStorage.setItem('verificationCode', generatedCode);
        console.log(`Code sent to ${email}: ${generatedCode}`);
        router.push('authentication/Authentication');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your email to receive a verification code:</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCompleteType="email"
                keyboardType="email-address"
                textContentType="emailAddress"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button title="Send Code" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ForgetPassword;
