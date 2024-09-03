import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const TopServiceProviders = ({ providers }) => {
    const handleCardPress = (title) => {
        router.push(`profile/serviceProviderProfile`);
    };

    const Card = ({ image, name, job, reviewCount, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.cardTouchable}>
                <View style={styles.cardContainer}>
                    {image && <Image source={image} style={styles.serviceProviderImage} />}
                    <Text style={styles.cardTitle}>{name}</Text>
                    {job && <Text style={styles.cardJob}>{job}</Text>}
                    {reviewCount && (
                        <View style={styles.reviewContainer}>
                            {Array.from({ length: reviewCount }).map((_, index) => (
                                <Icon key={index} name="star" size={14} color="#FFD700" style={styles.reviewStar} />
                            ))}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Service Providers</Text>
            <ScrollView horizontal>
                {providers.map((provider, index) => (
                    <Card
                        key={index}
                        image={provider.image}
                        name={provider.name}
                        job={provider.job}
                        reviewCount={provider.reviewCount}
                        onPress={() => handleCardPress(provider.name)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardTouchable: {
        marginRight: 10,
    },
    cardContainer: {
        width: 120,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#B2FFD1',
    },
    cardTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardJob: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
    reviewContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    reviewStar: {
        marginRight: 2,
    },
    serviceProviderImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});

export default TopServiceProviders;
