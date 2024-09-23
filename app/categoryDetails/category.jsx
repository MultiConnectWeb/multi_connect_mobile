import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BackButton from "../../button/BackButton";



const CategoryDetails = ({ route }) => {
    const { category } = 'Medicals';
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     axios.get(`https://multi-connect-latest-ei6f.onrender.com/api/v1/servicesProvider/get_by_category/${category}`)
    //         .then(response => {
    //             setProviders(response.data);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             setError('No provider found');
    //             setLoading(false);
    //         });
    // }, [category]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (

        <ScrollView>
                <View style={styles.errorContainer}>
                    <Icon name="frown-o" size={80} color="red" />
                    <Text style={styles.errorText}>No Data Found</Text>
                </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 50,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 26,
        textAlign: 'center',
    },
});

export default CategoryDetails;
