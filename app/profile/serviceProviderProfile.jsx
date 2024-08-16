import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../lib/firebase";
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import UseUserStore from "../lib/userStore";
import { useRoute } from "@react-navigation/native";
import TopServiceProviders from './TopServiceProviders'; // Import your component

const { width, height } = Dimensions.get('window');

const ProfileComponent = () => {
    const { fetchUserInfo, currentUser } = UseUserStore();
    const route = useRoute();
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [providers, setProviders] = useState([]); // State to hold providers data

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);

    useEffect(() => {
        if (!currentUser) {
            Alert.alert('Not Authenticated', 'You need to log in to access this feature.');
        }
    }, [currentUser]);

    // Fetch service providers from Firebase or any source
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                // Replace with actual data fetching logic
                const mockProviders = [
                    { id: '1', image: require("../../assets/images/provider1.png"), name: 'John Doe', job: 'Plumber', reviewCount: 4 },
                    { id: '2', image: require("../../assets/images/provider2.png"), name: 'Jane Smith', job: 'Electrician', reviewCount: 5 },
                    // Add more mock providers here
                ];
                setProviders(mockProviders);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchProviders();
    }, []);

    const handleSearch = async () => {
        const name = username;
        try {
            const userRef = collection(database, 'users');
            const response = query(userRef, where('username', '==', name));
            const querySnapShot = await getDocs(response);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                Alert.alert('User not found', 'No user found with that username.');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleAdd = async () => {
        if (!user) {
            Alert.alert('No User Selected', 'Please search for a user before adding.');
            return;
        }

        const chatRef = collection(database, 'chats');
        const userChatRef = collection(database, 'userchats');
        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });

            Alert.alert('Success', 'User added and chat created successfully!');
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleMessaging = () => {
        try {
            handleSearch();
            handleAdd();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.profileSection}>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="phone" size={20} color="rgba(69, 131, 19, 1)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={handleMessaging}>
                        <Icon name="message" size={20} color="rgba(69, 131, 19, 1)" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>54+</Text>
                    <Text style={styles.detailText}>Hours</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>30+</Text>
                    <Text style={styles.detailText}>Customers</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>5</Text>
                    <Text style={styles.detailText}>Badges</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>5+</Text>
                    <Text style={styles.detailText}>Star</Text>
                </View>
            </View>

            <TopServiceProviders providers={providers} /> {/* Include the TopServiceProviders component */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: width * 0.05,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: (width * 0.25) / 2,
        borderColor: '#ddd',
        borderWidth: 2,
    },
    starIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 2,
    },
    name: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profession: {
        fontSize: width * 0.04,
        color: 'rgba(70, 70, 70, 1)',
        marginVertical: 5,
    },
    status: {
        fontSize: width * 0.035,
        color: 'rgba(70, 70, 70, 1)',
        marginBottom: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 10,
    },
    iconButton: {
        backgroundColor: 'rgba(229, 255, 237, 1)',
        padding: width * 0.025,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: width * 0.02,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    detail: {
        alignItems: 'center',
    },
    detailNumber: {
        fontFamily: 'Georama',
        fontWeight: '500',
        fontSize: width * 0.06,
    },
    detailText: {
        fontFamily: 'Georama',
        fontWeight: '500',
        fontSize: width * 0.035,
    },
    reviewsSection: {
        marginTop: height * 0.05,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewsText: {
        fontSize: width * 0.045,
        fontWeight: '500',
        color: 'rgba(34, 34, 34, 1)',
    },
    viewAllButton: {
        fontSize: width * 0.045,
        color: 'blue',
    },
    reviewsContainer: {
        marginTop: height * 0.015,
    },
    reviewBox: {
        width: width * 0.45,
        padding: width * 0.04,
        backgroundColor: 'rgba(231, 241, 254, 1)',
        borderRadius: 10,
        marginRight: width * 0.025,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
    },
    reviewImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        marginRight: width * 0.025,
    },
    reviewName: {
        fontSize: width * 0.04,
        fontWeight: '500',
    },
    reviewText: {
        fontSize: width * 0.035,
        color: '#333',
    },
    reviewStars: {
        flexDirection: 'row',
        marginTop: height * 0.01,
    },
    starIconReview: {
        marginRight: width * 0.015,
    },
});

export default ProfileComponent;
