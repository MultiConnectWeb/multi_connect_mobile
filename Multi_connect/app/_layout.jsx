import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const RootLayout = () => {
    return(
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
            <Stack.Screen name="landingPage/landingPage" options={{headerShown:false}}/>
            <Stack.Screen name="dashboard/dashboard" options={{
                headerTitle:'Dashboard33',
                headerLeft:()=> null
            }}/>
            <Stack.Screen name="login/loginPage" options={{headerShown:false}}/>
            <Stack.Screen
                name="registerPage/registerPage"
                options={({ navigation }) => ({
                    headerTitle: 'Register', // Set the title of the header
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
                    headerTintColor: '#fff', // Change the color of the back button and title
                })}
            />
        </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    }
})