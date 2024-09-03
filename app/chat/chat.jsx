import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import {auth, database} from '../lib/firebase';
import UseUserStore from '../lib/userStore';
import upload from '../lib/upload';
import UseChatStore from '../lib/chatStore';
import * as ImagePicker from 'expo-image-picker';
import {onAuthStateChanged} from "firebase/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from "expo-router"; // or any other icon set


const { width } = Dimensions.get('window');

const Chat = () => {
    const route = useRouter()
    const [chat, setChat] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({ uri: "" });

    const { currentUser ,fetchUserInfo} = UseUserStore();
    const { chatId, user, isCurrentUserblocked, isRecieverBlocked } = UseChatStore();
    const endRef = useRef(null);

    useEffect(() => {
        // Subscribe to authentication state changes
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserInfo(user.uid);
            } else {
                Alert.alert('Authentication Error', 'User is not authenticated. Redirecting to login.');
            }
        });
    });

    useEffect(() => {
        if(!chatId) console.log("No Chat id")
        const unSub = onSnapshot(doc(database, "chats", chatId), (res) => {
            const chatData = res.data();
            // console.log(chatData)
            if (chatData) {
                setChat(chatData);
            } else {
                console.log('No chat data found');
            }
        }, (error) => {
            console.error('Error fetching chat data:', error);
        });

        return () => {
            unSub();
        };
    }, [chatId]);
    const handleEmoji = (e) => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleImg = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (result?.assets?.length > 0) {
            const imgUrl = await upload(result.assets[0].uri);
            setImg({ uri: imgUrl });
            await handleSend(imgUrl);
        }
    };

    const handleSend = async (imgUrl = null) => {
        if (text.trim() === "" && !imgUrl) return;

        try {
            await updateDoc(doc(database, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text: text.trim() || null,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl }),
                }),
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatsRef = doc(database, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats?.findIndex((c) => c.chatId === chatId);

                    if (chatIndex !== -1) {
                        userChatsData.chats[chatIndex].lastMessage = text.trim() || 'Image sent';
                        userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                        userChatsData.chats[chatIndex].updatedAt = Date.now();

                        await updateDoc(userChatsRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });
        } catch (err) {
            console.log(err);
        } finally {
            setImg({ uri: "" });
            setText("");
        }
    };

    return (
        <View style={styles.chat}>
            <View style={styles.top}>
                <View style={styles.user}>
                    <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
                    <View style={styles.texts}>
                        <Text style={styles.username}>{user?.username}</Text>
                        <Text style={styles.status}>Description </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.bookAppointment} onPress={()=>route.push('bookAppointment/BookAppointment')}>
                    <Text style={styles.appointment}> Appointment </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={chat?.messages || []}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.message,
                            item.senderId === currentUser?.id ? styles.ownMessage : styles.otherMessage
                        ]}
                    >
                        <View style={styles.messageContent}>
                            {item.img && <Image source={{ uri: item.img }} style={styles.messageImage} />}
                            {item.text && <Text style={styles.messageText}>{item.text}</Text>}
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.createdAt.toString()}
                contentContainerStyle={styles.messagesContainer}
                ref={endRef}
                onContentSizeChange={() => endRef.current?.scrollToEnd({ animated: true })}
            />

            {img?.uri ? (
                <View style={styles.messagesContainer}>
                    <Image source={{ uri: img.uri }} style={styles.messageImage} />
                </View>
            ) : null}
            <View style={styles.bottom}>
                <View style={styles.iconsBottom}>
                    <TouchableOpacity onPress={handleImg}>
                        <Image source={require('../../assets/images/img.png')} style={styles.icon} />
                    </TouchableOpacity>

                </View>
                <TextInput
                    style={styles.input}
                    placeholder={isCurrentUserblocked || isRecieverBlocked ? "You cannot send a message" : "Type a message..."}
                    value={text}
                    onChangeText={setText}
                    editable={!isCurrentUserblocked && !isRecieverBlocked}
                />
                <View style={styles.emojiContainer}>
                    <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
                        <Image source={require('../../assets/images/emoji.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => handleSend()}
                    disabled={isCurrentUserblocked || isRecieverBlocked}
                >
                    <Icon name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        backgroundColor: 'white',
    },
    top: {
        padding: width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: (width * 0.12) / 2,
        marginRight: width * 0.05,
    },
    texts: {
        flexDirection: 'column',
    },
    username: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    status: {
        fontSize: width * 0.04,
        color: 'black',
    },
    bookAppointment: {
        width: width/4,
        borderRadius:10,
        backgroundColor: 'green',
    },
    appointment: {
        color:'white',
        fontSize: 15,
        padding: 10,
        fontWeight: 'bolder',
        textAlign:'center'

    },
    messagesContainer: {
        flexGrow: 1,
    },
    message: {
        marginBottom: width * 0.02,
    },
    ownMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#e0ffe0',
        padding: width * 0.02,
        borderRadius: width * 0.02,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        padding: width * 0.02,
        borderRadius: width * 0.02,
    },
    messageContent: {
        flexDirection: 'column',
    },
    messageImage: {
        width: width * 0.6,
        height: width * 0.6 * 0.75,
        borderRadius: width * 0.02,
    },
    messageText: {
        fontSize: width * 0.04,
        marginVertical: width * 0.01,
    },
    messageTime: {
        fontSize: width * 0.03,
        color: '#888',
    },
    bottom: {
        padding: width * 0.05,
        borderTopWidth: 1,
        borderTopColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "green",
    },
    iconsBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: width * 0.02,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: width * 0.03,
        paddingVertical: width * 0.02,
        marginHorizontal: width * 0.03,
        fontSize: width * 0.04,
    },
    emojiContainer: {
        position: 'relative',
    },
    sendButton: {
        backgroundColor: 'green',
        padding: width * 0.03,
        borderRadius: width * 0.02,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: width * 0.04,
    },
    icon:{

    }

});

export default Chat;