import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const SignUpServiceProvider = () => {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        businessName: '',
        contactInfo: '',
    });

    const [selectedField, setSelectedField] = useState('');
    const [isFieldDropdownVisible, setIsFieldDropdownVisible] = useState(false);
    const [selectedSubField, setSelectedSubField] = useState('');
    const [isSubFieldDropdownVisible, setIsSubFieldDropdownVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
        phoneNumber: '',
        businessName: '',
        contactInfo: '',
    });

    const handleFieldChange = (value) => {
        setSelectedField(value);
        setSelectedSubField(''); // Reset sub-field selection
        setIsFieldDropdownVisible(false);
        setIsSubFieldDropdownVisible(true); // Show sub-field dropdown after selecting profession
    };

    const handleSubFieldChange = (value) => {
        setSelectedSubField(value);
        setIsSubFieldDropdownVisible(false);
    };

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    const isValidPassword = (password) => {
        return passwordRegex.test(password);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = (email) => {
        return emailRegex.test(email);
    };

    const handleChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '', // Reset the corresponding error
        });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async () => {
        let formErrors = {};
        const { name, email, password, confirmPassword, phoneNumber, businessName, contactInfo } = formValues;

        if (!name) formErrors.name = 'Name is required';
        if (!email) {
            formErrors.email = 'Email address is required';
        } else if (!isValidEmail(email)) {
            formErrors.email = 'Invalid email address.';
        }
        if (!password) {
            formErrors.password = 'Password is required';
        } else if (!isValidPassword(password)) {
            formErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.';
        }
        if (!confirmPassword) formErrors.confirmPassword = 'Confirm Password is required';
        if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!isChecked) formErrors.terms = 'You must agree to the terms and conditions';
        if (!phoneNumber) formErrors.phoneNumber = 'Phone number is required';
        if (!businessName) formErrors.businessName = 'Business name is required';
        if (!contactInfo) formErrors.contactInfo = 'Contact info is required';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('https://multi-connect-latest-ei6f.onrender.com/api/V1/register_service_provider', formValues);
            console.log('Form submitted:', response.data);
            router.push('login/ServiceProviderLoginPage');
        } catch (error) {
            console.log('Registration failed', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.firstContainer}>
                <Icon name="user" size={width / 5} color="#4B0082" />
            </View>
            <Text style={styles.title}>Sign Up As Service Provider</Text>

            <TextInput
                style={[styles.input, errors.name && styles.errorInput]}
                placeholder="Name"
                placeholderTextColor='#8B8B8B'
                value={formValues.name}
                onChangeText={(text) => handleChange('name', text)}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email Address"
                placeholderTextColor='#8B8B8B'
                value={formValues.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsFieldDropdownVisible(!isFieldDropdownVisible)}>
                <Text style={styles.dropdownButtonText}>
                    {selectedField || 'Choose a Role'}
                </Text>
                <Icon name={isFieldDropdownVisible ? 'arrow-up' : 'arrow-down'} size={20} color="#4B0082" />
            </TouchableOpacity>

            {isFieldDropdownVisible && (
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleFieldChange('HEALTHCARE')}>
                        <Text>HEALTHCARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleFieldChange('EDUCATION')}>
                        <Text>EDUCATION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleFieldChange('TRANSPORTATION')}>
                        <Text>TRANSPORTATION</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedField && (
                <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsSubFieldDropdownVisible(!isSubFieldDropdownVisible)}>
                    <Text style={styles.dropdownButtonText}>
                        {selectedSubField || 'Select Sub-Field'}
                    </Text>
                    <Icon name={isSubFieldDropdownVisible ? 'arrow-up' : 'arrow-down'} size={20} color="#4B0082" />
                </TouchableOpacity>
            )}

            {selectedField && isSubFieldDropdownVisible && (
                <View style={styles.dropdownContainer}>
                    {selectedField === 'HEALTHCARE' && (
                        <>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('DIETITIAN')}>
                                <Text>DIETITIAN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('THERAPIST')}>
                                <Text>THERAPIST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('MEDICAL_DOCTOR')}>
                                <Text>MEDICAL DOCTOR</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {selectedField === 'EDUCATION' && (
                        <>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('TEACHER')}>
                                <Text>TEACHER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('COACH')}>
                                <Text>COACH</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('TUTOR')}>
                                <Text>TUTOR</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {selectedField === 'TRANSPORTATION' && (
                        <>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('LOGISTICS')}>
                                <Text>LOGISTICS</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('HIRE_MAN')}>
                                <Text>HIRE MAN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('PRIVATE_TRAVEL_CAR')}>
                                <Text>PRIVATE TRAVEL CAR</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}

            <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                placeholderTextColor='#8B8B8B'
                value={formValues.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <TextInput
                style={[styles.input, errors.confirmPassword && styles.errorInput]}
                placeholder="Confirm Password"
                placeholderTextColor='#8B8B8B'
                value={formValues.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                secureTextEntry
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <TextInput
                style={[styles.input, errors.phoneNumber && styles.errorInput]}
                placeholder="Phone Number"
                placeholderTextColor='#8B8B8B'
                value={formValues.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
                keyboardType="phone-pad"
            />
            {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

            <TextInput
                style={[styles.input, errors.businessName && styles.errorInput]}
                placeholder="Business Name"
                placeholderTextColor='#8B8B8B'
                value={formValues.businessName}
                onChangeText={(text) => handleChange('businessName', text)}
            />
            {errors.businessName ? <Text style={styles.errorText}>{errors.businessName}</Text> : null}

            <TextInput
                style={[styles.input, errors.contactInfo && styles.errorInput]}
                placeholder="Contact Information"
                placeholderTextColor='#8B8B8B'
                value={formValues.contactInfo}
                onChangeText={(text) => handleChange('contactInfo', text)}
            />
            {errors.contactInfo ? <Text style={styles.errorText}>{errors.contactInfo}</Text> : null}

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isChecked}
                    onValueChange={handleCheckboxChange}
                    style={styles.checkbox}
                    color={isChecked ? '#4B0082' : undefined}
                />
                <Text style={styles.checkboxLabel}>
                    I have read and agree to the{' '}
                    <Text
                        style={styles.termsLink}
                        onPress={() => Linking.openURL('https://example.com/terms')}
                    >
                        Terms and Conditions
                    </Text>
                </Text>
            </View>
            {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Text
                    style={styles.loginLink}
                    onPress={() => router.push('login/loginPage')}
                >
                    Log In
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: height / 15,
        paddingHorizontal: width / 20,
        backgroundColor: '#F8F9FA', // New background color
    },
    firstContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height / 25,
        backgroundColor: "rgba(45,232,160,0.7)",
        width: width / 3,
        height: width / 3,

    },
    title: {
        fontSize: width / 18,
        fontWeight: 'bold',
        marginBottom: height / 40,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        paddingVertical: height / 100,
        paddingHorizontal: width / 30,
        borderRadius: width / 50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFFFFF', // Input background color
        marginBottom: height / 80,
    },
    dropdownButton: {
        width: '100%',
        paddingVertical: height / 100,
        paddingHorizontal: width / 30,
        borderRadius: width / 50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        backgroundColor: '#FFFFFF', // Dropdown button background color
        marginBottom: height / 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownButtonText: {
        fontSize: width / 25,
        color: '#333333', // Dropdown button text color
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF', // Dropdown container background color
        borderRadius: width / 50,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        marginBottom: height / 80,
    },
    dropdownItem: {
        paddingVertical: height / 100,
        paddingHorizontal: width / 30,
        borderBottomColor: '#ccc',

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height / 80,
    },
    checkbox: {
        marginRight: width / 50,
    },
    checkboxLabel: {
        fontSize: width / 30,
        color: '#333333', // Checkbox label color
    },
    termsLink: {
        color: '#4B0082', // Terms link color
        textDecorationLine: 'underline',
    },
    submitButton: {
        width: '100%',
        paddingVertical: height / 40,
        backgroundColor: "rgba(45,232,160,0.7)",
        borderRadius: width / 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height / 80,
    },
    submitButtonText: {
        fontSize: width / 25,
        color: '#FFFFFF', // Submit button text color
        fontWeight: 'bold',
    },
    errorText: {
        color: '#FF0000', // Error text color
        marginBottom: height / 80,
    },
    errorInput: {
        borderColor: '#FF0000', // Error input border color
    },
    loginTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height / 40,
    },
    loginText: {
        fontSize: width / 30,
        color: '#333333', // Login text color
    },
    loginLink: {
        fontSize: width / 30,
        color: '#4B0082', // Login link color
        textDecorationLine: 'underline',
    },
});

export default SignUpServiceProvider;
