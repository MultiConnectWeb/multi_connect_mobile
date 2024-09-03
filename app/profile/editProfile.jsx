import React, {useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const profileUrl = require('../../assets/images/avatar.png');

const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/ddmwfjq5u/image/upload';
const uploadPreset = 'multi_connect';

export default function EditProfile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [serviceProvider, setServiceProvider] = useState(null);

    useEffect(() => {
        const fetchServiceProvider = async () => {
            try {
                const userString = await AsyncStorage.getItem("service_provider");
                console.log(userString)
                if (userString) {
                    setServiceProvider(JSON.parse(userString));
                } else {
                    console.log("No service provider found in AsyncStorage");
                }
            } catch (error) {
                console.error("Error fetching service provider from AsyncStorage", error);
            }
        };

        fetchServiceProvider();
    }, []);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'We need permission to access your photo library.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const { uri, type, fileName } = result.assets[0];
            try {
                const imageUrl = await uploadImage(uri, type, fileName);
                setImageUri(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Upload Failed', 'Failed to upload image');
            }
        }
    };

    const uploadImage = async (uri, type, fileName) => {
        // Defaulting to proper type and fileName if undefined
        const validType = type || 'image/jpeg';  // default to jpeg if type is undefined
        const validName = fileName || 'uploaded_image.jpg';  // default name if undefined

        const formData = new FormData();
        formData.append('file', {
            uri,
            type: validType,
            name: validName,
        });
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await axios.post(cloudinaryUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload response:', response.data);
            return response.data.url;
        } catch (error) {
            console.error('Failed to upload image:', error.message);
            throw new Error('Failed to upload image: ' + error.message);
        }
    };

    const updateProfileImage = async () => {
        if (!imageUri) {
            Alert.alert('No Image Selected', 'Please select an image first');
            return;
        }

        const patchDocument = [
            { "op": "replace", "path": "/profileUrl", "value": imageUri }
        ];

        try {
            const userId = serviceProvider.id;

            const response = await axios.patch(
                `https://multi-connect-latest-ei6f.onrender.com/api/v1/generalUser/edit/${userId}`,
                patchDocument,
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    },
                }
            );
            serviceProvider.profile.profileUrl = imageUri;
            await AsyncStorage.setItem('service_provider', JSON.stringify(serviceProvider));

            Alert.alert('Success', 'Profile image updated');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile image');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={imageUri ? { uri: serviceProvider.profile.profileUrl } : profileUrl}
                style={styles.profile}
            />
            <TouchableOpacity style={styles.changeProfile} onPress={handleImagePick}>
                <Text style={styles.changeProfileText}>Change Profile Picture</Text>
            </TouchableOpacity>
            <View>
                <View style={styles.box}>
                    <Text>First Name</Text>
                    <TextInput
                        placeholder="First Name"
                        value={firstname}
                        onChangeText={setFirstname}
                        style={styles.input}
                    />
                </View>
                <View style={styles.box}>
                    <Text>Last Name</Text>
                    <TextInput
                        placeholder="Last Name"
                        value={lastname}
                        onChangeText={setLastname}
                        style={styles.input}
                    />
                </View>
                <View style={styles.box}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={styles.box}>
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.done} onPress={updateProfileImage}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: height,
    },
    profile: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.15,
        alignSelf: 'center',
        marginBottom: 20,
    },
    changeProfile: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    changeProfileText: {
        fontSize: 16,
        color: '#007bff',
    },
    box: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    done: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    doneText: {
        color: '#fff',
        fontSize: 18,
    },
});
