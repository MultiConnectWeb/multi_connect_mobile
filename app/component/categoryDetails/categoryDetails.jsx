import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BackButton from "../../button/BackButton";



const CategoryDetails = ({ route }) => {
    const { category } = route.params;
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        axios.get(`https://multi-connect-latest-ei6f.onrender.com/api/v1/servicesProvider/get_by_category/${category}`)
            .then(response => {
                setProviders(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('No provider found');
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*<BackButton navigation={navigation} /> /!* Use the BackButton component *!/*/}

            <Text style={styles.title}>{category} Providers</Text>

            {error ? (
                <View style={styles.errorContainer}>
                    <Icon name="frown-o" size={50} color="red" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                providers.map((provider, index) => (
                    <View key={index} style={styles.providerCard}>
                        <Text style={styles.providerName}>{provider.name}</Text>
                        <Text style={styles.providerJob}>{provider.job}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    providerCard: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    providerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    providerJob: {
        fontSize: 16,
        color: 'gray',
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CategoryDetails;
