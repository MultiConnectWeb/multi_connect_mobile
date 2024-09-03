import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const Profile = () => {
    const router = useRouter();
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

    if (!serviceProvider) {
        return <Text>Loading...</Text>; // Or any loading indicator
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={ serviceProvider.profile ? {uri:serviceProvider.profile.profileUrl} : require('../../assets/images/avatar.png') }
                style={styles.profile}
            />
            <Text style={styles.username}>{serviceProvider.firstName ? serviceProvider.firstName : "service Provider" } {serviceProvider.lastName}</Text>
            <View style={styles.settings}>
                <TouchableOpacity style={styles.innerSettings} onPress={() => router.push('profile/editProfile')}>
                    <Icon1 name="edit" size={30} color="green" />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Profile Setting</Text>
                        <Text style={{ width: width / 2 }}>Edit And Make Changes To Your Profile</Text>
                    </View>
                    <Icon name="chevron-forward" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.innerSettings}>
                    <Icon1 name="power-off" size={30} color="gray" />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Deactivate Account</Text>
                        <Text style={{ width: width / 2 }}>Temporarily Deactivate Your Account</Text>
                    </View>
                    <Icon name="chevron-forward" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {/* Updated Logout Button with Routing */}
            <TouchableOpacity style={styles.logout} onPress={() => router.push('login/loginPage')}>
                <Text style={styles.logoutText}>Logout</Text>
                <Icon name="log-out-outline" size={30} color="blue" />
            </TouchableOpacity>

            {/* Existing Delete Account Button */}
            <TouchableOpacity style={styles.delete}>
                <Text style={styles.deleteText}>Delete Account</Text>
                <Icon name="trash" size={30} color="red" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        alignSelf: 'center',
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settings: {
        width: width / 1.1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    innerSettings: {
        width: width / 1.1,
        height: height / 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1.5,
        borderRadius: width / 38,
        padding: width / 26,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        gap: width / 45,
    },
    title: {
        fontWeight: 'bold',
        fontSize: width / 30,
    },
    logout: {
        width: width / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ADD8E6',
        borderRadius: 5,
        marginBottom: 10,
        gap: width / 5,
    },
    logoutText: {
        fontWeight: 'bold',
        color: 'blue',
        marginLeft: 10,
    },
    delete: {
        width: width / 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 5,
        gap: width / 20,
    },
    deleteText: {
        fontWeight: 'bold',
        color: 'red',
    },
});

export default Profile;
