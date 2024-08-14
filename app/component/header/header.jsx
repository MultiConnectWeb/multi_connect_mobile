// src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ title, onRightPress, rightComponent }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {rightComponent && (
                <TouchableOpacity onPress={onRightPress} style={styles.rightComponent}>
                    {rightComponent}
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'green',
        height: 60,
        paddingHorizontal: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    rightComponent: {
        marginRight: 10,
    },
});

export default Header;
