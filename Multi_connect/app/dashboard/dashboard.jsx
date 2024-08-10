import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Data from "./data";

const image1 = require('../../assets/images/Frame 3.png');
const image = require('../../assets/images/R (1).jpeg');
const user = { name: 'John Doe' };
const data = Data;

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Dashboard = () => {
    const MainContent = () => (
        <View style={styles.mainContent}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Image style={styles.profileImage} source={image} />
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
                <View style={styles.dataContainer}>
                    {data.map((value, index) => (
                        <View key={index} style={[styles.dataCard, { backgroundColor: value.color }]}>
                            <Image style={styles.dataImage} source={value.image} />
                            <Text style={styles.dataText}>{value.text}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <MainContent />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        width:width
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        width:width
    },
    button: {
        padding: 8,
    },
    buttonText: {
        fontSize: 24,
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
        width: '100%',
        maxWidth: 600,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        width:width/1.2
    },
    profileImage: {
        width: width * 0.18,
        height: height * 0.08,
        borderRadius: width * 0.09,
        marginRight: 16,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#60A5FA',
        padding: 16,
        borderRadius: 24,
        width: '100%',
    },
    textContainer: {
        width: '60%',
    },
    mainText: {
        fontSize: 32,
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
        height: 160,
        resizeMode: 'contain',
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 36,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    dataCard: {
        width: '44%',
        flexDirection: 'column',
        gap: 20,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    dataImage: {
        height: 100,
        width: 50,
    },
    dataText: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Dashboard;
