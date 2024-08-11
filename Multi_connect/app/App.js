import React from 'react';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed
import RootLayout from './_layout'; // Adjust the path as needed
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <RootLayout />
            </SafeAreaProvider>
        </AuthProvider>
    );
}
