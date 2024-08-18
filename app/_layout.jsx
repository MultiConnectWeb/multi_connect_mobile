import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const RootLayout = () => {
    const BackButton = ({ navigation }) => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2F4F4F" />
            <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
    );

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="landingPage/landingPage" options={{ headerShown: false }} />
            <Stack.Screen name="(tab)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabTwo)" options={{ headerShown: false }} />
            <Stack.Screen name="chat/chat"  options={({ navigation }) => ({
                headerTitle: 'Chat',
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
            <Stack.Screen name="chat/chatList"  options={({ navigation }) => ({
                headerTitle: 'Chat List',
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
            <Stack.Screen name="categoryDetails/categoryDetails" options={({ navigation }) => ({
                headerLeft: () => <BackButton navigation={navigation} />,
                headerTitle: '',
                headerStyle: {},
            })} />
        </Stack>
    );
};

export default RootLayout;

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    backText: {
        color: '#2F4F4F',
        fontSize: 16,
        marginLeft: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
});
