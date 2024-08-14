import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Authentication = () => {
    const [code, setCode] = useState(Array(4).fill(''));
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    setCanResend(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text.slice(0, 1);
        setCode(newCode);
    };

    const handleSubmit = async () => {
        const enteredCode = code.join('');
        const storedCode = await AsyncStorage.getItem('verificationCode');

        if (enteredCode === storedCode) {
            // Navigate to the appropriate (dashboard) based on userType
            const userType = await AsyncStorage.getItem('userType');
            if (userType === 'user') {
                router.push('dashboard/UserDashboard');
            } else if (userType === 'serviceProvider') {
                router.push('dashboard/ServiceProviderDashboard');
            } else {
                router.push('login/loginPage');
            }
        } else {
            setError('The code you entered is incorrect. Please try again.');
        }
    };

    const handleResendCode = async () => {
        const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
        await AsyncStorage.setItem('verificationCode', generatedCode);
        // console.log(`New code: ${generatedCode}`);
        setTimer(30);
        setCanResend(false);
    };

    return (
        <View style={styles.container}>
            <Text>Enter the code sent to your email:</Text>
            <View style={styles.codeContainer}>
                {code.map((c, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={c}
                        onChangeText={(text) => handleChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
            <Button title="Verify" onPress={handleSubmit} />
            <View style={styles.resendContainer}>
                {canResend ? (
                    <Button title="Resend Code" onPress={handleResendCode} />
                ) : (
                    <Text>Resend Code in {timer}s</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20,
    },
    input: {
        width: 40,
        height: 40,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
    resendContainer: {
        marginTop: 20,
    },
});

export default Authentication;
