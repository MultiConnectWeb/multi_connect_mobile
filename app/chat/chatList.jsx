import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { database, auth } from '../lib/firebase';
import UseUserStore from '../lib/userStore';
import UseChatStore from '../lib/chatStore';
import AddUser from "./addUser";
import {useRouter} from "expo-router";

const { width, height } = Dimensions.get('window');

const ChatList = ({ navigation }) => {
    const route = useRouter()
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');
    const [addMode, setAddMode] = useState(false);
    const { currentUser, isLoading, fetchUserInfo } = UseUserStore();
    const { changeChat, user } = UseChatStore();
    const [isSeen, setIsSeen] = useState(false)

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,(user)=>{
            fetchUserInfo(user?.uid)
        })

        return ()=>{
            unSub()
        }
    },[fetchUserInfo])
    useEffect(() => {
        if (!currentUser?.id){
            console.log("no current user");
            return
        };
        // console.log(user)
        const unSub = onSnapshot(
            doc(database, 'userchats', currentUser.id),
            async (res) => {
                const items = res.data()?.chats || [];

                const promises = items.map(async (item) => {
                    const userDocRef = doc(database, 'users', item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data();

                    return { ...item, user };
                });
                const chatData = await Promise.all(promises);

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        );

        return () => unSub();
    }, [currentUser?.id]);

    if (isLoading) {
        return <View style={styles.loading}><Text>Loading...</Text></View>;
    }
    const handleSelect = async (chat)=>{
        setIsSeen(true)
        const userChats = chats.map(item=>{
            const {user, ...rest} = item;
            return rest;
        })

        const chatIndex = userChats.findIndex(item=> item.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;

        const userChatRef = doc(database,"userchats",currentUser.id)
        try{
            await updateDoc(userChatRef,{
                chats: userChats,
            });
            // console.log(chat.chatId,chat.user)
            // console.log("chat.chatId,chat.user")
            changeChat(chat.chatId,chat.user);
            route.push('chat/chat')
        }catch (err){
            console.error(err)
        }

    };

    const filteredChats = chats.filter((c) =>
        c.user.username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View  style={styles.searchBar}>
                    <Image source={require('../../assets/images/search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor='black'
                        onChangeText={(text) => setInput(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setAddMode(prevMode => !prevMode)}
                >
                    <Image
                        source={addMode ? require('../../assets/images/minus.png') : require('../../assets/images/plus.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredChats}
                keyExtractor={(item) => item.chatId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            { backgroundColor: item.isSeen ? '#d4ecd8' : '#74e68b' }
                        ]}
                        onPress={() => handleSelect(item)}
                    >
                        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
                        <View style={styles.texts}>
                            <Text style={styles.username}>{item.user.username}</Text>
                            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {addMode && <AddUser/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        marginTop:width/38,
        width: width/1.1,
        height: height/18,
        backgroundColor: '#25b642',
        alignSelf:"center",
        justifyContent: "space-between",
        flexDirection:"row",
        borderRadius: 15,
        marginBottom:height/25,

    },
    icon:{
        marginRight:width/40,
        alignSelf: 'center',
        marginTop:width/90,
    },
    searchBar: {
        flexDirection: 'row',
        width:width/1.3,
        padding:width/90,
        alignItems: 'center',
        backgroundColor: '#74e68b',
        borderRadius: 15,
        paddingHorizontal: 10,
        elevation: 2,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
        alignSelf:'center',
        color:"black",

    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color:'black',
    },
    item: {
        height:height/10,
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        backgroundColor: '#d4ecd8'


    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        backgroundColor:"black",
    },
    texts: {
        flex: 1,
        color:"black"
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: 'black',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ChatList;
