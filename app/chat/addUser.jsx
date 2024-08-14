// import React, { useState, useEffect } from 'react';
// import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions} from 'react-native';
// import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, arrayUnion } from 'firebase/firestore';
// import {auth, database} from '../lib/firebase';
// import UseUserStore from '../lib/userStore';
// import {onAuthStateChanged} from "firebase/auth";
// import {router, useRouter} from "expo-router";
//
// const {width, height} = Dimensions.get('window')
// const AddUser = () => {
//   const [user, setUser] = useState(null);
//   const [searchInput, setSearchInput] = useState('');
//   const { currentUser, fetchUserInfo } = UseUserStore();
//
//   const route = useRouter()
//
//   // useEffect(() => {
//   //   const unSub = onAuthStateChanged(auth, (user) => {
//   //     fetchUserInfo(user?.uid);
//   //   });
//   //
//   //   return () => {
//   //     unSub();
//   //   };
//   // }, [fetchUserInfo]);
//   //
//   // useEffect(() => {
//   //   if (!currentUser) {
//   //     Alert.alert('Not Authenticated', 'You need to log in to access this feature.');
//   //   }
//   // }, [currentUser]);
//   //
//   // const handleSearch = async () => {
//   //   const username = searchInput;
//   //   try {
//   //     const userRef = collection(database, 'users');
//   //     const response = query(userRef, where('username', '==', username));
//   //     const querySnapShot = await getDocs(response);
//   //
//   //     if (!querySnapShot.empty) {
//   //       setUser(querySnapShot.docs[0].data());
//   //     } else {
//   //       Alert.alert('User not found', 'No user found with that username.');
//   //     }
//   //   } catch (err) {
//   //     console.error(err.message);
//   //   }
//   // };
//   //
//   // const handleAdd = async () => {
//   //   if (!user) {
//   //     Alert.alert('No User Selected', 'Please search for a user before adding.');
//   //     return;
//   //   }
//   //
//   //   const chatRef = collection(database, 'chats');
//   //   const userChatRef = collection(database, 'userchats');
//   //   try {
//   //     const newChatRef = doc(chatRef);
//   //     await setDoc(newChatRef, {
//   //       createdAt: serverTimestamp(),
//   //       messages: [],
//   //     });
//   //
//   //     await updateDoc(doc(userChatRef, currentUser.id), {
//   //       chats: arrayUnion({
//   //         chatId: newChatRef.id,
//   //         lastMessage: '',
//   //         receiverId: user.id,
//   //         updatedAt: Date.now(),
//   //       }),
//   //     });
//   //     await updateDoc(doc(userChatRef, user.id), {
//   //       chats: arrayUnion({
//   //         chatId: newChatRef.id,
//   //         lastMessage: '',
//   //         receiverId: currentUser.id,
//   //         updatedAt: Date.now(),
//   //       }),
//   //     });
//   //
//   //     Alert.alert('Success', 'User added and chat created successfully!');
//   //   } catch (err) {
//   //     console.error(err.message);
//   //   }
//   // };
//
//   return (
//       <View style={styles.container}>
//         <View style={styles.searchContainer}>
//           <TextInput
//               style={styles.input}
//               placeholder="Username"
//               value={searchInput}
//               onChangeText={(text) => setSearchInput(text)}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleSearch}>
//             <Text style={styles.buttonText}>Search</Text>
//           </TouchableOpacity>
//         </View>
//         {user && (
//             <View style={styles.user}>
//               <Image source={{ uri: user.avatar || './avatar.png' }} style={styles.avatar} />
//               <View style={styles.userDetails}>
//                 <Text style={styles.username}>{user.username}</Text>
//               </View>
//               <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
//                 <Text style={styles.addButtonText}>Add User</Text>
//               </TouchableOpacity>
//             </View>
//         )}
//       </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     display:"flex",
//     flex: 1,
//     width: width/1.5,
//     backgroundColor: 'rgba(207,204,204,0.27)',
//     padding:width/10,
//     alignSelf:"center",
//     borderRadius:15,
//     marginTop:width/8,
//   },
//   searchContainer: {
//     width: "100%",
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:'flex-start',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     height: height/26,
//     width: width/2,
//     borderColor: 'black',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     width:width/8,
//     height: height/26,
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     alignSelf:'center',
//   },
//   user: {
//     flexDirection: 'row',
//     width: width/4,
//     height: height/4,
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userDetails: {
//     flex: 1,
//   },
//   username: {
//     fontSize: 300,
//     fontWeight: 'bold',
//     color:"black",
//   },
//   addButton: {
//     backgroundColor: '#28A745',
//     padding: 10,
//     borderRadius: 5,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
//
// export default AddUser;
