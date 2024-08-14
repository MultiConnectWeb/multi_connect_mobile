import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
const profileUrl = require('../../assets/images/woman.jpeg');

const Profile = () => {
    const router = useRouter(); // Use router instead of route
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={profileUrl}
                alt={"Profile Picture"}
                style={styles.profile}
            />
            <Text style={styles.username}>John Doe</Text>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        alignSelf: 'center'
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    settings: {
        width: width / 1.1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20
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
        fontSize: width / 30
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
        color: 'red'
    }
});

export default Profile;
