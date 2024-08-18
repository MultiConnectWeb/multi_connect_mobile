import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2F4F4F" />
        <Text style={styles.backText}>Back</Text>
    </TouchableOpacity>
);

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
});

export default BackButton;
