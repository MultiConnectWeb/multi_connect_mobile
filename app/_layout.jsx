import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpUser from "./userSignUp/UserSignUp";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="landingPage/landingPage" options={{ headerShown: false }} />
            <Stack.Screen name="(tab)" options={{headerShown:false}}/>

            <Stack.Screen
                name="wallet/wallet"
                options={({ navigation }) => ({
                    headerTitle: 'Wallet',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="white"
                            fontSize="large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                })}
            />

            <Stack.Screen
                name="(dashboard)/dashboard"
                options={{
                    headerTitle: 'Dashboard',
                    headerLeft: () => <></>,
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                }}
            />

            <Stack.Screen name="login/loginPage" options={{ headerShown: false }} />



            <Stack.Screen name="orders/orders" options={{ headerShown: false }} />

            <Stack.Screen
                name="(dashboard)/UserDashboard"
                options={({ navigation }) => ({
                    headerTitle: 'My Dashboard',
                    headerLeft: () => <View />,
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                    headerTintColor: '#000',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('login/loginPage')}>
                            <Text style={{ color: '#000', fontSize: 16, marginRight: 10 }}>Logout</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name="wallet/withdraw"
                options={({ navigation }) => ({
                    headerTitle: 'Withdraw',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="white"
                            fontSize="x-large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                        headerTitleFontSize: 'x-large',
                        headerTitleFontWeight: 'bold',
                        headerTitleFontFamily: 'Dancing Script',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="profile/profile"
                options={({ navigation }) => ({
                    headerTitle: 'Profile',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="x-large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                        headerTitleFontSize: 'x-large',
                        headerTitleFontWeight: 'bold',
                        headerTitleFontFamily: 'Dancing Script',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="profile/editProfile"
                options={({ navigation }) => ({
                    headerTitle: 'Edit Profile',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="x-large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                        headerTitleFontSize: 'x-large',
                        headerTitleFontWeight: 'bold',
                        headerTitleFontFamily: 'Dancing Script',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="userSignUp/UserSignUp"
                options={({ navigation }) => ({
                    headerTitle: 'Sign Up',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="xx-large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                        headerTitleFontSize: 'x-large',
                        headerTitleFontWeight: 'bold',
                        headerTitleFontFamily: 'Dancing Script',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="serviceProviderSignUp/signUp"
                options={({ navigation }) => ({
                    headerTitle: 'Sign Up',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="xx-large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                        headerTitleFontSize: 'x-large',
                        headerTitleFontWeight: 'bold',
                        headerTitleFontFamily: 'Dancing Script',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="registerPage/registerPage"
                options={({ navigation }) => ({
                    headerTitle: 'Register',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="forgetPassword/ForgetPassword"
                options={({ navigation }) => ({
                    headerTitle: 'Forget Password',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="authentication/Authentication"
                options={({ navigation }) => ({
                    headerTitle: 'Authentication',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="#000"
                            fontSize="large"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                    headerTintColor: '#fff',
                })}
            />

            <Stack.Screen
                name="filteredServices/FilteredServices"
                options={({ navigation }) => ({
                    headerTitle: 'Sub Domains',
                    headerLeft: () => (
                        <Button
                            onPress={() => navigation.goBack()}
                            title="Back"
                            color="Black"
                        />
                    ),
                    headerStyle: {
                        backgroundColor: 'green',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                })}
            />

        </Stack>
    );
};

export default RootLayout;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
});
