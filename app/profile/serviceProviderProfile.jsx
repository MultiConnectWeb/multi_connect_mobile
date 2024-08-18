import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { Icon } from 'react-native-elements';

// Import images using the correct syntax
import abiodunImage from "../../assets/images/abiodun.png";
import graceImage from "../../assets/images/Grace.png";
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
import {useRouter} from "expo-router";

const { width, height } = Dimensions.get('window');

const ProfileComponent = () => {
    const { fetchUserInfo, currentUser } = UseUserStore();
    const route = useRouter();
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        if (username) {
            const searchUser = async () => {
                const name = username;
                try {
                    const userRef = collection(database, 'users');
                    const response = query(userRef, where('username', '==', "Victoria"));
                    const querySnapShot = await getDocs(response);

                    if (!querySnapShot.empty) {
                        setUser(querySnapShot.docs[0].data());
                    } else {
                        Alert.alert('User not found', 'No user found with that username.');
                        setUser(null);
                    }
                } catch (err) {
                    console.error(err.message);
                }
            };

            searchUser();
        }
    }, [username]);

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
            route.push('chat/chatList')
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleMessaging = (name) => {
        setUsername(name);
        if(username) handleAdd();
    };

    // useEffect(() => {
    //     if (user) {
    //         handleAdd();
    //     }
    // }, [user]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileSection}>
                <View style={styles.imageContainer}>
                    <Image
                        source={abiodunImage}
                        style={styles.profileImage}
                    />
                    <Icon
                        name="star"
                        size={20}
                        color="white"
                        containerStyle={styles.starIcon}
                    />
                </View>
                <Text style={styles.name}>Abiodun Taiwo</Text>
                <Text style={styles.profession}>Pro Electrician</Text>
                <Text style={styles.status}>Open to work</Text>

                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="phone" size={20} color="rgba(69, 131, 19, 1)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleMessaging("Yisa")}>
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

            <View style={styles.reviewsSection}>
                <View style={styles.reviewsHeader}>
                    <Text style={styles.reviewsText}>Reviews & Ratings</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.reviewsContainer}>
                    <View style={styles.reviewBox}>
                        <View style={styles.reviewHeader}>
                            <Image source={graceImage} style={styles.reviewImage} />
                            <Text style={styles.reviewName}>Shalom Grace</Text>
                        </View>
                        <Text style={styles.reviewText}>
                            He is an outstanding artisan with speed in delivery of his quality service. Kind and hardworking man.
                        </Text>
                        <View style={styles.reviewStars}>
                            {[...Array(5)].map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={18}
                                    color="gold"
                                    containerStyle={styles.starIconReview}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewName}>Shalom Grace</Text>
                        </View>
                        <Text style={styles.reviewText}>
                            He is an outstanding artisan with speed in delivery of his quality service. Kind and hardworking man.
                        </Text>
                        <View style={styles.reviewStars}>
                            {[...Array(5)].map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={18}
                                    color="gold"
                                    containerStyle={styles.starIconReview}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <Text style={styles.reviewText}>Quick and professional.</Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        position: 'absolute',
        top: height * 0.02,
        left: width * 0.05,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: height * 0.1,
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
        marginTop: 5,
    },
    status: {
        fontSize: width * 0.04,
        color: 'green',
        marginTop: 5,
    },
    iconRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    iconButton: {
        marginHorizontal: 15,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    detail: {
        alignItems: 'center',
    },
    detailNumber: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: width * 0.04,
        color: 'rgba(70, 70, 70, 1)',
    },
    reviewsSection: {
        marginTop: 20,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewsText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    viewAllButton: {
        color: 'green',
    },
    reviewsContainer: {
        marginTop: 10,
    },
    reviewBox: {
        width: width * 0.8,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginRight: 15,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
    },
    reviewImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    reviewName: {
        fontWeight: 'bold',
    },
    reviewText: {
        marginTop: 10,
        fontSize: width * 0.04,
        fontWeight: '500',
    },
    reviewStars: {
        flexDirection: 'row',
        marginTop: 10,
    },
    starIconReview: {
        marginRight: 2,
    },
});

export default ProfileComponent;
