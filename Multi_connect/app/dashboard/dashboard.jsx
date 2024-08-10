// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
//
// const Dashboard = ({element1,element2}) => {
//
// const Header = ({ image, user }) => (
//   <View style={styles.header}>
//     <TouchableOpacity style={styles.button}>
//       <Text style={styles.buttonText}>☰</Text>
//     </TouchableOpacity>
//     <Text style={styles.title}>MyApp</Text>
//     <TouchableOpacity style={styles.button}>
//       <Text style={styles.buttonText}>✕</Text>
//     </TouchableOpacity>
//   </View>
// );
//
// const MainContent = ({ image1, user }) => (
//   <View style={styles.mainContent}>
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <Image style={styles.profileImage} source={{ uri: image1 }} />
//         <Text style={styles.welcomeText}>Welcome, {user ? user.name : 'Service Provider'}!</Text>
//       </View>
//       <View style={styles.infoContainer}>
//         <View style={styles.textContainer}>
//           <Text style={styles.mainText}>
//             <Text style={styles.subText}>EARN</Text>
//             {'\n'}
//             EXTRA CASH WITH MULTI CONNECT HUB
//           </Text>
//           <Text style={styles.description}>
//             Connect With People That Need Your Service And Get Paid After Completion Of The Work
//           </Text>
//         </View>
//         <Image style={styles.mainImage} source={{ uri: image1 }} />
//       </View>
//       <View style={styles.dataContainer}>
//         {Data.map((value, index) => (
//           <View key={index} style={[styles.dataCard, { backgroundColor: value.color }]}>
//             <Image style={styles.dataImage} source={{ uri: value.image }} />
//             <Text style={styles.dataText}>{value.text}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   </View>
// );
//
// const Dashboard = () => {
//   const image1 = 'https://example.com/image.jpg'; // Replace with your image URL
//   const user = { name: 'John Doe' }; // Replace with your user data
//
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <Header image={image1} user={user} />
//         <MainContent image1={image1} user={user} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#1E40AF',
//     padding: 16,
//     width: '100%',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 10,
//   },
//   button: {
//     padding: 8,
//   },
//   buttonText: {
//     fontSize: 24,
//     color: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   mainContent: {
//     flex: 1,
//     marginTop: 80,
//     width: '90%',
//     alignItems: 'center',
//   },
//   card: {
//     width: '100%',
//     maxWidth: 600,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     borderRadius: 16,
//     padding: 16,
//     alignItems: 'center',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 50,
//     height: 100,
//     borderRadius: 50,
//     marginRight: 16,
//   },
//   welcomeText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#60A5FA',
//     padding: 16,
//     borderRadius: 24,
//     width: '100%',
//   },
//   textContainer: {
//     width: '60%',
//   },
//   mainText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     fontFamily: 'Titan One',
//   },
//   subText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     fontFamily: 'sans-serif',
//   },
//   description: {
//     marginTop: 8,
//     fontWeight: 'bold',
//     fontFamily: 'Abril Fatface',
//   },
//   mainImage: {
//     height: 160,
//     resizeMode: 'contain',
//   },
//   dataContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 36,
//     width: '90%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     marginBottom: 50,
//   },
//   dataCard: {
//     display: 'flex',
//     width: '44%',
//     flexDirection: 'column',
//     gap: 40,
//     padding: 20,
//     borderRadius: 20,
//   },
//   dataImage: {
//     height: 100,
//     width: 50,
//     marginLeft: 'auto',
//   },
//   dataText: {
//     fontFamily: 'sans-serif',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
// });
//
// }
//
// export default Dashboard
//
// const styles = StyleSheet.create({})