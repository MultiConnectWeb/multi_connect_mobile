import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const SignUpServiceProvider = () => {
    const route = useRouter();
    const [selectedField, setSelectedField] = useState('');
    const [isFieldDropdownVisible, setIsFieldDropdownVisible] = useState(false);
    const [selectedSubField, setSelectedSubField] = useState('');
    const [isSubFieldDropdownVisible, setIsSubFieldDropdownVisible] = useState(false);
    let response = null;

    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        category:'',
        subDomain:''
    });

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleFieldChange = (value) => {
        setSelectedField(value);
        handleChange('category',value)
        setSelectedSubField('');
        setIsFieldDropdownVisible(false);
        setIsSubFieldDropdownVisible(true);
    };



    const handleChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubFieldChange = (value) => {
        setSelectedSubField(value);
        handleChange('subDomain',value)
        setIsSubFieldDropdownVisible(false);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRegister = async () => {
        // setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, formValues.email.trim(), formValues.password);

            await setDoc(doc(database, 'users', response.user.uid), {
                username: formValues.firstname.trim(),
                email: formValues.email.trim(),
                id: response.user.uid,
                avatar: "",
                blocked: [],
            });

            await setDoc(doc(database, 'userchats', response.user.uid), {
                chats: [],
            });
        } catch (err) {
            console.log(err);
        } finally {
            // setLoading(false);
        }
    };
    const signUp = async () => {

        try {
             response = await axios.post('https://multi-connect-latest-ei6f.onrender.com/api/V1/register_service_provider', {
                firstName: formValues.firstname.trim(),
                lastName: formValues.lastname.trim(),
                email: formValues.email.trim(),
                password: formValues.password,
                category: formValues.category,
                 subDomain: formValues.subDomain,
            });

            console.log('Registration response:', response.data);
            console.log('Registration response:', response.data.data);

            await AsyncStorage.setItem('service_provider', JSON.stringify(response.data.data.generalUserResponse))
            route.push('login/loginPage');
        } catch (err) {
            console.error('Registration error: ', err.response ? err.response.data : err.message);
            // Optionally display error to user
        } finally {

        }
           }

    const handleSubmit = () => {
        let formErrors = {};
        const { firstname, lastname, email, password, confirmPassword } = formValues;

        const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!firstname) formErrors.firstname = 'First Name is required';
        if (!lastname) formErrors.lastname = 'Last Name is required';
        if (!email) {
            formErrors.email = 'Email Address is required';
        } else if (!emailPattern.test(email)) {
            formErrors.email = 'Please enter a valid email address';
        }
        if (!password) {
            formErrors.password = 'Password is required';
        } else if (!passwordPattern.test(password)) {
            formErrors.password = 'Password must be at least 8 characters long, contain letters, numbers, and special characters';
        }
        if (!confirmPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
        }
        if (!isChecked) formErrors.terms = 'You must agree to the terms and conditions';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        signUp();
        handleRegister();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.firstContainer}>
                <Icon name="user" size={width / 5} color="black" />
            </View>
            <Text style={styles.title}>Sign Up As Service Provider</Text>
            <TextInput
                style={[styles.input, errors.firstname && styles.errorInput]}
                placeholder="First Name"
                placeholderTextColor='black'
                value={formValues.firstname}
                onChangeText={(text) => {
                    handleChange('firstname', text);
                    setErrors((prev) => ({ ...prev, firstname: '' }));
                }}
            />
            <TextInput
                style={[styles.input, errors.lastname && styles.errorInput]}
                placeholder="Last Name"
                placeholderTextColor='black'
                value={formValues.lastname}
                onChangeText={(text) => {
                    handleChange('lastname', text);
                    setErrors((prev) => ({ ...prev, lastname: '' }));
                }}
            />
            {errors.firstname || errors.lastname ? <Text style={styles.errorText}>{errors.firstname || errors.lastname}</Text> : null}

            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email Address"
                placeholderTextColor='black'
                value={formValues.email}
                onChangeText={(text) => {
                    handleChange('email', text);
                    setErrors((prev) => ({ ...prev, email: '' }));
                }}
                keyboardType="email-address"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsFieldDropdownVisible(!isFieldDropdownVisible)}>
                <Text style={styles.dropdownButtonText}>
                    {selectedField || 'Choose a Role'}
                </Text>
                <Icon name={isFieldDropdownVisible ? 'arrow-up' : 'arrow-down'} size={20} color="#000" />
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
                    <Icon name={isSubFieldDropdownVisible ? 'arrow-up' : 'arrow-down'} size={20} color="#000" />
                </TouchableOpacity>
            )}
            {selectedField && isSubFieldDropdownVisible && (
                <View style={styles.dropdownContainer}>
                    {selectedField === 'HEALTHCARE' && (
                        <>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() =>handleSubFieldChange('DIETITIAN')}>
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
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('DRIVER')}>
                                <Text>DRIVER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSubFieldChange('COURIER')}>
                                <Text>COURIER</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            )}

            <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                placeholderTextColor='black'
                value={formValues.password}
                onChangeText={(text) => {
                    handleChange('password', text);
                    setErrors((prev) => ({ ...prev, password: '' }));
                }}
                secureTextEntry
            />
            <TextInput
                style={[styles.input, errors.confirmPassword && styles.errorInput]}
                placeholder="Confirm Password"
                placeholderTextColor='black'
                value={formValues.confirmPassword}
                onChangeText={(text) => {
                    handleChange('confirmPassword', text);
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                secureTextEntry
            />
            {errors.password || errors.confirmPassword ? <Text style={styles.errorText}>{errors.password || errors.confirmPassword}</Text> : null}

            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={handleCheckboxChange}
                />
                <Text style={styles.checkboxLabel}>
                    I agree to the{' '}
                    <Text
                        style={styles.checkboxLink}
                        onPress={() => Linking.openURL('https://example.com/terms-and-conditions')}
                    >
                        Terms and Conditions
                    </Text>
                </Text>
            </View>
            {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

            <Button title="Register" onPress={handleSubmit} />
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
    input:{
        height: height * 0.06,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
    dropdownButton: {
        height: height * 0.06,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownButtonText: {
        fontSize: width * 0.045,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 8,
        backgroundColor: '#fff',
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    signUp:{
        width:width/1.1,
        height: height * 0.06,
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 5,
        backgroundColor:"green",
    },
    text:{
        color: "white",
        fontSize: width * 0.06,
        fontWeight: "600",
    }

});

export default SignUpServiceProvider;
