import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Data from "./data";
import {useRouter} from "expo-router";
import TabsLayout from "../(tab)/_layout";

const image1 = require('../../assets/images/istockphoto-482878550-612x612-removebg-preview.png');
const image = require('../../assets/images/R (1).jpeg');
const user = { name: 'John Doe' };
const data = Data;
const { width, height } = Dimensions.get('window');

const serviceProviderDashboard = () => {
    const router = useRouter();
    const handleNavigation = (index) =>{
         if(index===1) router.push('wallet/wallet')
        console.log("Navigating to:", index);

    };
    const MainContent = () => (
        <View style={styles.mainContent}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={()=>router.push('profile/profile')}>
                        <Image style={styles.profileImage} source={image} />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Welcome, {user ? user.name : 'Service Provider'}!</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainText}>
                            <Text style={styles.subText}>EARN</Text>
                            {'\n'}
                            EXTRA CASH WITH MULTI CONNECT HUB
                        </Text>
                        <Text style={styles.description}>
                            Connect With People That Need Your Service And Get Paid After Completion Of The Work
                        </Text>
                    </View>
                    <Image style={styles.mainImage} source={image1} />
                </View>
                <ScrollView contentContainerStyle={styles.dataContainer}>
                    {data.map((value, index) => (
                        <TouchableOpacity key={index} style={[styles.dataCard, {backgroundColor: value.color}]} onPress={()=>handleNavigation(index)}>
                            <Image style={styles.dataImage} source={value.image}/>
                            <Text style={styles.dataText}>{value.text}</Text>
                            <TabsLayout />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
               <TabsLayout/>

            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <MainContent/>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        width: width
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        width:width,
        height:height
    },
    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: width/6,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    mainContent: {
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    card: {
        flex:1,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 16,
        padding: width/18,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width:width/1.2,
        height:height/15
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    welcomeText: {
        fontSize: width/15,
        fontWeight: 'bolder',

    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(45,232,61,0.7)',
        padding: 10,
        borderRadius: 24,
        width: width/1.1,
    },
    textContainer: {
        width: width/1.9,
    },
    mainText: {
        fontSize: width/20.5,
        fontWeight: 'bold',
        fontFamily: 'Titan One',
    },
    subText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    description: {
        marginTop: 8,
        fontWeight: 'bold',
        fontFamily: 'Abril Fatface',
    },
    mainImage: {
        height: height/5,
        width:width/2.5,
        resizeMode: 'contain',
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: width/18,
        width:"90%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: height/5,
    },
    dataCard: {
        width: width/2.7,
        height: '45%',
        flexDirection: 'column',
        gap: width/5.5,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dataImage: {
        height: 30,
        width: 30,
        alignSelf:"flex-end"
    },
    dataText: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: width/25,
    },
});

export default serviceProviderDashboard;