// import React, {useEffect, useState} from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
// import { auth, database } from '../lib/firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import * as ImagePicker from 'expo-image-picker';
// import upload from '../lib/upload';
// import {useRouter} from "expo-router";
// import UseChatStore from "../lib/chatStore";
// import UseUserStore from "../lib/userStore";
//
// const image = require('../../assets/images/avatar.png')
//
// const Login = () => {
//     const route  = useRouter()
//     const [picture, setPicture] = useState({ file: null, url: '' });
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//
//     // const handlePicture = async () => {
//     //     const result = await ImagePicker.launchImageLibraryAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //         allowsEditing: true,
//     //         aspect: [4, 3],
//     //         quality: 1,
//     //     });
//     //
//     //     if (!result.canceled && result.assets.length > 0) {
//     //         setPicture({
//     //             file: result.assets[0].uri,
//     //             url: result.assets[0].uri
//     //         });
//     //     }
//     // };
//
//     const handleLogin = async () => {
//         setLoading(true);
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             Alert.alert('Success', 'Logged In Successfully');
//             route.push('chat/list')
//         } catch (err) {
//             console.log(err);
//             Alert.alert('Error', err.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // const handleRegister = async () => {
//     //     setLoading(true);
//     //     try {
//     //         const response = await createUserWithEmailAndPassword(auth, email, password);
//     //         const imgUrl = await upload(picture.file);
//     //
//     //         await setDoc(doc(database, 'users', response.user.uid), {
//     //             username: username,
//     //             email: email,
//     //             id: response.user.uid,
//     //             avatar: "",
//     //             blocked: [],
//     //         });
//     //
//     //         await setDoc(doc(database, 'userchats', response.user.uid), {
//     //             chats: [],
//     //         });
//     //         // Alert.alert('Success', 'Account Created Successfully');
//     //     } catch (err) {
//     //         console.log(err);
//     //         // Alert.alert('Error', err.message);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     };
//     const {currentUser, isLoading, fetchUserInfo} = UseUserStore()
//     const {chatId} = UseChatStore()
//     useEffect(()=>{
//         const unSub = onAuthStateChanged(auth,(user)=>{
//             fetchUserInfo(user?.uid)
//         })
//
//         return ()=>{
//             unSub()
//         }
//     },[fetchUserInfo])
//
//     return (
//         <View style={styles.container}>
//             <View style={styles.item}>
//                 <Text style={styles.header}>Welcome Back</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Email'
//                     keyboardType='email-address'
//                     value={email}
//                     onChangeText={setEmail}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Password'
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleLogin}
//                     disabled={loading}
//                 >
//                     {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.separator} />
//             <View style={styles.item}>
//                 <Text style={styles.header}>Create An Account</Text>
//                 <TouchableOpacity onPress={handlePicture}>
//                     <Image source={{ uri: picture.url || './avatar.png' }} style={styles.avatar} />
//                     <Text>Upload an image</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Username'
//                     value={username}
//                     onChangeText={setUsername}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Email'
//                     keyboardType='email-address'
//                     value={email}
//                     onChangeText={setEmail}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Password'
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={handleRegister}
//                     disabled={loading}
//                 >
//                     {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     item: {
//         marginBottom: 16,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     input: {
//         height: 40,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         marginBottom: 12,
//         paddingHorizontal: 8,
//         borderRadius: 4,
//     },
//     button: {
//         backgroundColor: '#007bff',
//         padding: 12,
//         borderRadius: 4,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     separator: {
//         height: 1,
//         backgroundColor: '#ddd',
//         marginVertical: 16,
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 8,
//     },
// });
//
// export default Login;
