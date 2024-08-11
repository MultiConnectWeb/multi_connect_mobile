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
import {useRouter} from "expo-router";


const { width, height } = Dimensions.get('window');

const SignUpServiceProvider = () => {
    const route = useRouter()
    const [selectedField, setSelectedField] = useState('');
    const [isFieldDropdownVisible, setIsFieldDropdownVisible] = useState(false);
    const [selectedSubField, setSelectedSubField] = useState('');
    const [isSubFieldDropdownVisible, setIsSubFieldDropdownVisible] = useState(false);

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: '',
    });

    const [isChecked, setIsChecked] = useState(false);

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
        const { name, email, password, confirmPassword } = formValues;

        if (!name) formErrors.name = 'Name is required';
        if (!email) formErrors.email = 'Email Address is required';
        if (!password) formErrors.password = 'Password is required';
        if (!confirmPassword) formErrors.confirmPassword = 'Confirm Password is required';
        if (password !== confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
        if (!isChecked) formErrors.terms = 'You must agree to the terms and conditions';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Form Submitted:', formValues);
        route.push('dashboard/dashboard')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.firstContainer}>
                <Icon name="user" size={width/5} color="black"/>
            </View>
            <Text style={styles.title}>Sign Up As Service Provider</Text>
            <TextInput
                style={[styles.input, errors.name && styles.errorInput]}
                placeholder="Name"
                value={formValues.name}
                onChangeText={(text) => {
                    handleChange('name', text);
                    setErrors((prev) => ({ ...prev, name: '' }));
                }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email Address"
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
                value={formValues.password}
                onChangeText={(text) => {
                    handleChange('password', text);
                    setErrors((prev) => ({ ...prev, password: '' }));
                }}
                secureTextEntry
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

            <TouchableOpacity style={styles.signUp} onPress={()=> handleSubmit()}>
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
