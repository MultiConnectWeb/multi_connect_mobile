import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { categoryData } from './data'; // Importing the data

const FilteredServices = () => {
    const route = useRoute();
    const { category } = route.params;

    const getCategoryData = (category) => {
        return categoryData[category] || [];
    };

    const filteredData = getCategoryData(category);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{category}</Text>
            <View style={styles.servicesContainer}>
                {filteredData.map((item, index) => (
                    <View key={index} style={styles.serviceItem}>
                        <Icon name="user" size={24} color="#333" />
                        <Text style={styles.serviceText}>{item}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F0F0F0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    servicesContainer: {
        marginBottom: 20,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#B2FFD1', // Background color consistent with your design
        borderRadius: 8,
    },
    serviceText: {
        marginLeft: 10,
        fontSize: 18,
    },
});

export default FilteredServices;
