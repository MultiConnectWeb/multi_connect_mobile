import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const AppScreen = () => {
    const bounceValue = useRef(new Animated.Value(0)).current;
    const animationDuration = 4000;

    useEffect(() => {
        const bounce = Animated.sequence([
            Animated.timing(bounceValue, {
                toValue: -30,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(bounceValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]);


        const bounceAnimation = Animated.loop(bounce);

        // Start the animation
        bounceAnimation.start();


        const timer = setTimeout(() => {
            bounceAnimation.stop();
        }, animationDuration);

        return () => clearTimeout(timer);
    }, [bounceValue]);

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.image, { transform: [{ translateY: bounceValue }] }]}
                source={require('../assets/images/logo.jpg')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default AppScreen;
