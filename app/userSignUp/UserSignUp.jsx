import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
    Linking
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get('window');

const SignUpUser = () => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        terms: '',
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = () => {
        let formErrors = {};
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formValues;

        if (!firstName) formErrors.firstName = 'First Name is required';
        if (!lastName) formErrors.lastName = 'Last Name is required';
        if (!email) formErrors.email = 'Email Address is required';
        if (!phoneNumber) formErrors.phoneNumber = 'Phone Number is required';
        if (!password) formErrors.password = 'Password is required';
        if (!confirmPassword) formErrors.confirmPassword = 'Confirm Password is required';
        if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!isChecked) formErrors.terms = 'You must agree to the terms and conditions';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Form Submitted:', formValues);
        router.push('login/loginPage')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.firstContainer}>
                <Icon name="user" size={width / 5} color="black" />
            </View>
            <Text style={styles.title}>Sign Up As A Client</Text>
            <TextInput
                style={[styles.input, errors.firstName && styles.errorInput]}
                placeholder="First Name"
                value={formValues.firstName}
                onChangeText={(text) => {
                    handleChange('firstName', text);
                    setErrors((prev) => ({ ...prev, firstName: '' }));
                }}
                placeholderTextColor="#aaa" // Lighter text color for placeholders
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

            <TextInput
                style={[styles.input, errors.lastName && styles.errorInput]}
                placeholder="Last Name"
                value={formValues.lastName}
                onChangeText={(text) => {
                    handleChange('lastName', text);
                    setErrors((prev) => ({ ...prev, lastName: '' }));
                }}
                placeholderTextColor="#aaa"
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email Address"
                value={formValues.email}
                onChangeText={(text) => {
                    handleChange('email', text);
                    setErrors((prev) => ({ ...prev, email: '' }));
                }}
                keyboardType="email-address"
                placeholderTextColor="#aaa"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
                style={[styles.input, errors.phoneNumber && styles.errorInput]}
                placeholder="Phone Number"
                value={formValues.phoneNumber}
                onChangeText={(text) => {
                    handleChange('phoneNumber', text);
                    setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                }}
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
            />
            {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

            <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                value={formValues.password}
                onChangeText={(text) => {
                    handleChange('password', text);
                    setErrors((prev) => ({ ...prev, password: '' }));
                }}
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
                style={[styles.input, errors.confirmPassword && styles.errorInput]}
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChangeText={(text) => {
                    handleChange('confirmPassword', text);
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                secureTextEntry
                placeholderTextColor="#aaa"
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <View style={styles.checkboxContainer}>
                <Checkbox value={isChecked} onValueChange={handleCheckboxChange} />
                <Text style={styles.checkboxLabel}>
                    By clicking Sign Up, you agree to our{' '}
                    <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms-and-conditions')}>
                        Terms & Conditions
                    </Text>
                </Text>
            </View>
            {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

            <TouchableOpacity style={styles.signUp} onPress={handleSubmit}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignSelf:'center',
        justifyContent:"center"
    },

    firstContainer:{
        width: width/3,
        height:width/3,
        alignSelf:"center",
        alignItems:"center",
        justifyContent: "center",
        backgroundColor:"rgba(45,232,160,0.7)",
        borderRadius: width/5,
        marginBottom:15,
    },

    iconContainer: {
        alignItems: 'flex-start',
        marginBottom: 16,
    },

    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
    },

    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: height * 0.06,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 8,
        backgroundColor: '#f0f0f0', // Darker background for inputs
        color: '#333', // Darker text color for inputs
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        fontSize: width * 0.04,
        marginLeft: 8,
    },
    link: {
        color: 'blue',
    },
    signUp: {
        width: width * 0.9,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'green',
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: '600',
    }
});

export default SignUpUser;