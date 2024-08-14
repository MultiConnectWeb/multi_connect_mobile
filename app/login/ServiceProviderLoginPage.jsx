import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceProviderLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const handleLogin = async () => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            setLoading(true);
            try {
                const response = await axios.post('https://multi-connect-latest-ei6f.onrender.com/api/v1/auth', {
                    email,
                    password,
                });

                // Assuming the backend returns a token
                const { token } = response.data;

                // Save the token using AsyncStorage
                await AsyncStorage.setItem('authToken', token);

                console.log('Login successful');
                route.push('(tab)/serviceProviderHome'); // Navigate to service provider dashboard

            } catch (error) {
                console.error('Login error:', error);
                setEmailError('Invalid email or password');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleForgotPassword = () => {
        route.push('forgetPassword/ForgetPassword');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Service Provider Login</Text>
            <Text style={styles.subHeader}>
                Welcome back! Log in to manage your services.
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter email'
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    onBlur={() => !email && emailError}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    placeholder='Enter password'
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                    onBlur={() => !password && passwordError}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.separator} />
                <Text style={styles.orText}>Or</Text>
                <View style={styles.separator} />
            </View>
            <TouchableOpacity style={styles.signUpButton} onPress={() => route.push('registerPage/registerPage')}>
                <Text style={styles.signUpButtonText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        gap: 6,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    forgotPassword: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: 'blue',
    },
    loginButton: {
        width: "95%",
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        alignSelf: "center",
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: 'rgb(229,255,270)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "95%",
    },
    signUpButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 6,
        alignSelf: "center",
    },
});

export default ServiceProviderLogin;
