import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const profileUrl = require('../../assets/images/woman.jpeg');

export default function EditProfile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={profileUrl}
                alt="Profile Picture"
                style={styles.profile}
            />
            <TouchableOpacity style={styles.changeProfile}>
                <Text style={styles.changeProfileText}>Change profile</Text>
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
            <TouchableOpacity style={styles.done}>
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
        justifyContent:'center',
        height:height,
    },

    iconButton: {
        padding: 10,
    },
    profile: {
        width: width *0.3,
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