// RootLayout.js
import React from 'react';
import { Stack } from 'expo-router';
import BackButton from "./button/BackButton";
import {View} from "react-native";


const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="landingPage/landingPage" options={{ headerShown: false }} />
            <Stack.Screen name="(tab)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabTwo)" options={{ headerShown: false }} />
            <Stack.Screen name="chat/chat" options={({ navigation }) => ({
                headerTitle: 'Chat',
                headerLeft: () => <BackButton navigation={navigation} />,
                headerStyle: {
                    backgroundColor: 'green',
                },
            })} />
            <Stack.Screen name="chat/chatList" options={({ navigation }) => ({
                headerTitle: 'Mychat List',
                headerLeft: () => <BackButton navigation={navigation} />,
                headerStyle: {
                    backgroundColor: 'green',
                },
            })} />
            <Stack.Screen name="bookAppointment/BookAppointment" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="wallet/wallet" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="(dashboard)/dashboard" options={{
                headerLeft: () => <View />,
                headerTitle: 'Dashboard',
                headerStyle: {
                    backgroundColor: 'white'
                },
            }} />
            <Stack.Screen name="login/loginPage" options={{ headerShown: false }} />
            <Stack.Screen name="orders/orders" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="(dashboard)/UserDashboard" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="wallet/withdraw" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="profile/profile" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="profile/editProfile" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="userSignUp/UserSignUp" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="serviceProviderSignUp/signUp" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="registerPage/registerPage" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="forgetPassword/ForgetPassword" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="authentication/Authentication" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="profile/serviceProviderProfile" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="filteredServices/FilteredServices" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
            <Stack.Screen name="categoryDetails/CategoryDetails" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
        </Stack>
    );
};

export default RootLayout;
