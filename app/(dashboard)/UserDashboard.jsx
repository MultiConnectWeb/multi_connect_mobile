import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import image1 from '../../assets/images/dietrician-removebg-preview.png';
import image2 from '../../assets/images/Logistic-removebg-preview.png';
import image3 from '../../assets/images/Teacher-removebg-preview.png';
import image4 from '../../assets/images/plumber-removebg-preview.png';
import image from '../../assets/images/R (1).jpeg';
import { router } from 'expo-router';
import TopServiceProviders from '../component/topServiceProvider/topServiceProvider';
import CategoryDetails from "../component/categoryDetails/categoryDetails";

import TabsLayout from '../(tab)/_layout.jsx';
import AsyncStorage from "@react-native-async-storage/async-storage";


const typewriterSpeed = 50;
const pauseDuration = 1000;

const userDashboard = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [user] = useState({ name: 'BeeJhay' });
    const[currentUser, setCurrentUser] = useState(null);
    const fullText = "Welcome to MultiConnect! We are thrilled to have you join our revolutionary platform that seamlessly connects service providers with users. Our mission is to create meaningful connections and provide top-notch services to meet all your needs!!!";

    useEffect(() => {
        const getServiceProviderData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('service_provider');
                console.log(storedData + " This")
                if (storedData) {
                    setCurrentUser(JSON.parse(storedData));
                    console.log(currentUser);


                }
            } catch (error) {
                console.error("Failed to fetch service Provider data: ", error);
            }


        };

        getServiceProviderData();
    }, []);
    useEffect(() => {
        let index = 0;
        let interval;

        const typewriter = () => {
            interval = setInterval(() => {
                setText(prev => prev + fullText[index]);
                index++;
                if (index >= fullText.length) {
                    clearInterval(interval);
                }
            }, typewriterSpeed);
        };

        typewriter();

        return () => clearInterval(interval);
    }, []);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    // const [isEmptyState, setIsEmptyState] = useState(false);

    const handleCardPress = (category) => {
        router.push(`categoryDetails/categoryDetails`);
    };
    console.log(currentUser)

    const Card = ({ icon, title, job, bgColor, iconBgColor, buttonColor, reviewCount }) => {
        return (
            <TouchableOpacity onPress={() => handleCardPress(title)} style={styles.cardTouchable}>
                <View style={[styles.cardContainer, { backgroundColor: bgColor }]}>
                    <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                        {icon}
                    </View>
                    <Text style={styles.cardTitle}>{title}</Text>
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

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isEmptyState, setIsEmptyState] = useState(false);

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            setIsEmptyState(false);
            return;
        }

        const mockData = [
            { name: 'Plumber', type: 'HandyMan' },
            { name: 'Painter', type: 'HandyMan' },
            { name: 'Teacher', type: 'Education' },
            { name: 'Tutor', type: 'Education' },
            { name: 'Dietitian', type: 'Medicals' },
            { name: 'Riders', type: 'Transportation' },
            { name: 'Physician', type: 'Medicals' },
        ];

        const filteredResults = mockData.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredResults);
        setIsEmptyState(filteredResults.length === 0);
    };

    const cardData = [
        {
            icon: <Icon name="hospital-o" size={32} />,
            title: 'Medicals',
            bgColor: '#E7F1FE',
            iconBgColor: '#B2D6FF',
            buttonColor: '#044793',
        },
        {
            icon: <Icon name="wrench" size={32} />,
            title: 'HandyMan',
            bgColor: '#FEEDD5',
            iconBgColor: '#FDD835',
            buttonColor: '#C69400',
        },
        {
            icon: <Icon name="book" size={32} />,
            title: 'Education',
            bgColor: '#E5FFED',
            iconBgColor: '#B2FFD1',
            buttonColor: '#28A745',
        },
        {
            icon: <Icon name="truck" size={32} />,
            title: 'Transportation',
            bgColor: '#FFEAEA',
            iconBgColor: '#FFB2B2',
            buttonColor: '#E60000',
        },
    ];

    const topServiceProviderData = [
        {
            image: image2,
            name: 'Inv BeeJhay',
            job: 'Rider',
            reviewCount: 5,
        },
        {
            image: image3,
            name: 'Victoria',
            job: 'Tutor',
            reviewCount: 4,
        },
        {
            image: image1,
            name: 'Cultist',
            job: 'Dietitian',
            reviewCount: 3,
        },
        {
            image: image4,
            name: 'Ajibola Philip',
            job: 'Electrician',
            reviewCount: 5,
        },
    ];

    if (selectedCategory) {
        return <CategoryDetails route={{params: {category: selectedCategory}}}/>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Profile Image and Welcome Text */}
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={() => router.push('profile/profile')}>
                        <Image style={styles.profileImage} source={image}/>
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Welcome, Bolaji !</Text>
                </View>

                {/* Search Section */}
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="gray"/>
                    <TextInput
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={styles.searchInput}
                    />
                </View>

                {searchQuery && (
                    <View style={styles.searchResults}>
                        {isEmptyState ? (
                            <View style={styles.emptyState}>
                                <Icon name="frown-o" size={50} color="gray"/>
                                <Text style={styles.emptyStateText}>Nothing found</Text>
                            </View>
                        ) : (
                            searchResults.map((result, index) => (
                                <Text key={index} style={styles.searchResultItem}>
                                    {result.name} ({result.type})
                                </Text>
                            ))
                        )}
                    </View>
                )}

                {/* About MultiConnect Section */}
                <View style={styles.aboutSection}>
                    <View style={[styles.aboutTextContainer, {backgroundColor: '#B2FFD1'}]}>
                        <Text style={styles.aboutText}>{text}</Text>
                    </View>
                </View>

                {/* Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView horizontal>
                        {cardData.map((card, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.cardTouchable}
                                onPress={() => setSelectedCategory(card.title)} // Set the selected category
                            >
                                <View style={[styles.cardContainer, {backgroundColor: card.bgColor}]}>
                                    <View style={[styles.iconContainer, {backgroundColor: card.iconBgColor}]}>
                                        {card.icon}
                                    </View>
                                    <Text style={styles.cardTitle}>{card.title}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>

                <TopServiceProviders providers={topServiceProviderData}/>
            </View>



        </ScrollView>





);
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    mainContent: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B2FFD1',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchResults: {
        marginTop: 10,
    },
    searchResultItem: {
        paddingVertical: 5,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 20,
    },
    emptyStateText: {
        marginTop: 10,
        color: 'gray',
    },
    aboutSection: {
        marginBottom: 20,
    },
    aboutTextContainer: {
        padding: 15,
        borderRadius: 10,
    },
    aboutText: {
        fontSize: 16,
    },
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
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
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

export default userDashboard;
