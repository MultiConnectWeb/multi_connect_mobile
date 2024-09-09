import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Data from "./data";
import { useRouter } from "expo-router";
import TabsLayout from "../(tab)/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image1 = require('../../assets/images/istockphoto-482878550-612x612-removebg-preview.png');
const image = require('../../assets/images/avatar.png');
const data = Data;
const { width, height } = Dimensions.get('window');

const ServiceProviderDashboard = () => {
    const [serviceProvider, setServiceProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Keep loading true until data is loaded
    const router = useRouter();

    const handleNavigation = (index) => {
        if (index === 1) router.push('wallet/wallet');
        if (index === 2) router.push('orders/pendingAppointment');
        if (index === 0) router.push('orders/orders');
        if (index === 3) router.push('wallet/transactionHistory');
        console.log("Navigating to:", index);
    };

    useEffect(() => {
        const getServiceProviderData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('service_provider');
                console.log('Stored service_provider data:', storedData);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setServiceProvider(parsedData);
                } else {
                    console.warn('No service_provider data found');
                }
            } catch (error) {
                console.error("Failed to fetch service provider data:", error);
            } finally {
                setIsLoading(false);  // Ensure loading is stopped after fetching
            }
        };

        getServiceProviderData();
    }, []);

    const MainContent = () => (
        <View style={styles.mainContent}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={() => router.push('profile/profile')}>
                        <Image
                            style={styles.profileImage}
                            source={serviceProvider?.profile?.profileUrl ? { uri: serviceProvider.profile.profileUrl } : image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>
                        Welcome, {serviceProvider ? serviceProvider.firstName : 'Service Provider'}!
                    </Text>
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
                    <Image style={styles.mainImage} source={image1}/>
                </View>
                <ScrollView contentContainerStyle={styles.dataContainer}>
                    {data.map((value, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dataCard, { backgroundColor: value.color }]}
                            onPress={() => handleNavigation(index)}
                        >
                            <Image style={styles.dataImage} source={value.image}/>
                            <Text style={styles.dataText}>{value.text}</Text>
                            <TabsLayout/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TabsLayout/>
            </View>
        </View>
    );

    // Render Loading until serviceProvider is fetched
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {isLoading || serviceProvider === null ? (
                    <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                    <MainContent/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        width: width,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        width: width,
        height: height,
    },
    mainContent: {
        flex: 1,
        width: width,
        alignItems: 'center',
    },
    card: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 16,
        padding: width / 18,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: width / 1.2,
        height: height / 15,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    welcomeText: {
        fontSize: width / 15,
        fontWeight: 'bolder',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(45,232,61,0.7)',
        padding: 10,
        borderRadius: 24,
        width: width / 1.1,
    },
    textContainer: {
        width: width / 1.9,
    },
    mainText: {
        fontSize: width / 20.5,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    mainImage: {
        height: height / 5,
        width: width / 2.5,
        resizeMode: 'contain',
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: width / 18,
        width: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: height / 5,
    },
    dataCard: {
        width: width / 2.7,
        height: '45%',
        flexDirection: 'column',
        gap: width / 5.5,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dataImage: {
        height: 30,
        width: 30,
        alignSelf: "flex-end",
    },
    dataText: {
        fontWeight: 'bold',
        fontSize: width / 25,
    },
});

export default ServiceProviderDashboard;
