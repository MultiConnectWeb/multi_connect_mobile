import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="landingPage/landingPage" options={{ headerShown: false }} />

            <Stack.Screen name="dashboard/dashboard" options={{
                headerTitle: 'Dashboard33',
                headerLeft: () => null,
            }} />
            <Stack.Screen
                name="dashboard/UserDashboard"
                options={({ navigation }) => ({
                    headerTitle: 'My Dashboard',
                    headerLeft: () => <View />,
                    headerStyle: {
                        backgroundColor: '#B2FFD1', // Background color for the header
                    },
                    headerTintColor: '#000', // Color for the back button and title
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('login/loginPage')}>
                            <Text style={{ color: '#000', fontSize: 16, marginRight: 10 }}>Logout</Text>
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen name="login/loginPage" options={{ headerShown: false }} />

            <Stack.Screen name="registerPage/registerPage" options={({ navigation }) => ({
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
            })} />
            {/*/!* Add the FilteredServices screen here *!/*/}
            <Stack.Screen name="filteredServices/FilteredServices" options={{
                headerTitle: 'Filtered Services',
                headerLeft: () => null,
                headerStyle: {
                    backgroundColor: '#B2FFD1',
                },
                headerTintColor: '#000',
            }} />
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
    }
});
