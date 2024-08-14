import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import UseUserStore from '../lib/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "../lib/firebase";

const { width } = Dimensions.get('window');

const UserInfo = () => {
  const { currentUser, isLoading, fetchUserInfo } = UseUserStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
            } else {
                Alert.alert('Authentication Error', 'User is not authenticated. Redirecting to login.');
            }
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);

    if (isLoading) {
        return <View style={styles.loading}><Text>Loading...</Text></View>;
    }

    return (
        <View style={styles.userInfo}>
            <View style={styles.user}>
                <View style={styles.imageContainer}>
                    <Image
                        source={currentUser?.avatar ? { uri: currentUser.avatar } : require('../../assets/images/avatar.png')}
                        style={styles.avatar}
                    />
                </View>
                <Text style={styles.username}>{currentUser?.username}</Text>
            </View>
            <View style={styles.icons}>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/more.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/video.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/images/edit.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        padding: width * 0.05, // Responsive padding
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'green',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: width * 0.12, // Responsive size
        height: width * 0.12, // Ensure square
        borderRadius: (width * 0.12) / 2, // Circle
        marginRight: width * 0.05,
        backgroundColor: 'black',
    },
    username: {
        fontSize: width * 0.05, // Responsive text size
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: width * 0.07, // Responsive size
        height: width * 0.07, // Ensure square
        marginLeft: width * 0.05, // Responsive spacing
    },
    imageContainer: {
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default UserInfo;
