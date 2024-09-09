import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserHome from "../(tabTwo)/userHome";
import {useRouter} from "expo-router";

const CategoryDetails = ({ route }) => {
    const { category } = route.params;
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const router = useRouter()

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

    const handleBackToHome = () => {
       router.back()
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
                    <Icon name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>
                <View style={{width: "95%",display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.title}>{category} Providers</Text>
                </View>
            </View>

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
    top:{
        display:"flex",
        flex:1,
        flexDirection:'row',
        justifyContent: "space-between"
    },
    container: {
        padding: 20,
        flexGrow: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backText: {
        marginLeft: 10,
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign:'center',
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
