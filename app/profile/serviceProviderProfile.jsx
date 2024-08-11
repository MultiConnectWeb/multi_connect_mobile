import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import image from '../../constants/images';

const { width, height } = Dimensions.get('window');

const ProfileComponent = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Text>{'<'} Back</Text>
            </TouchableOpacity>

            <View style={styles.profileSection}>
                <View style={styles.imageContainer}>
                    <Image
                        source={image.abiodun}
                        style={styles.profileImage}
                    />
                    <Icon
                        name="star"
                        size={20}
                        color="white"
                        containerStyle={styles.starIcon}
                    />
                </View>
                <Text style={styles.name}>Abiodun Taiwo</Text>
                <Text style={styles.profession}>Pro Electrician</Text>
                <Text style={styles.status}>Open to work</Text>

                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="phone" size={20} color="rgba(69, 131, 19, 1)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="message" size={20} color="rgba(69, 131, 19, 1)" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>54+</Text>
                    <Text style={styles.detailText}>Hours</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>30+</Text>
                    <Text style={styles.detailText}>Customers</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>5</Text>
                    <Text style={styles.detailText}>Badges</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.detailNumber}>5+</Text>
                    <Text style={styles.detailText}>Star</Text>
                </View>
            </View>

            <View style={styles.reviewsSection}>
                <View style={styles.reviewsHeader}>
                    <Text style={styles.reviewsText}>Reviews & Ratings</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.reviewsContainer}>
                    <View style={styles.reviewBox}>
                        <View style={styles.reviewHeader}>
                            <Image source={image.Grace} style={styles.reviewImage} />
                            <Text style={styles.reviewName}>Shalom Grace</Text>
                        </View>
                        <Text style={styles.reviewText}>
                            He is an outstanding artisan with speed in delivery of his quality service. Kind and hardworking man.
                        </Text>
                        <View style={styles.reviewStars}>
                            {[...Array(5)].map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={18}
                                    color="gold"
                                    containerStyle={styles.starIconReview}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewName}>Shalom Grace</Text>
                        </View>
                        <Text style={styles.reviewText}>
                            He is an outstanding artisan with speed in delivery of his quality service. Kind and hardworking man.
                        </Text>
                        <View style={styles.reviewStars}>
                            {[...Array(5)].map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={18}
                                    color="gold"
                                    containerStyle={styles.starIconReview}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.reviewBox}>
                        <Text style={styles.reviewText}>Quick and professional.</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        position: 'absolute',
        top: height * 0.02,
        left: width * 0.05,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: height * 0.1,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: (width * 0.25) / 2,
        borderColor: '#ddd',
        borderWidth: 2,
    },
    starIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 2,
    },
    name: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profession: {
        fontSize: width * 0.04,
        color: 'rgba(70, 70, 70, 1)',
        marginVertical: 5,
    },
    status: {
        fontSize: width * 0.035,
        color: 'rgba(70, 70, 70, 1)',
        marginBottom: 20,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 10,
    },
    iconButton: {
        backgroundColor: 'rgba(229, 255, 237, 1)',
        padding: width * 0.025,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: width * 0.02,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    detail: {
        alignItems: 'center',
    },
    detailNumber: {
        fontFamily: 'Georama',
        fontWeight: '500',
        fontSize: width * 0.06,
    },
    detailText: {
        fontFamily: 'Georama',
        fontWeight: '500',
        fontSize: width * 0.035,
    },
    reviewsSection: {
        marginTop: height * 0.05,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewsText: {
        fontSize: width * 0.045,
        fontWeight: '500',
        color: 'rgba(34, 34, 34, 1)',
    },
    viewAllButton: {
        fontSize: width * 0.045,
        color: 'blue',
    },
    reviewsContainer: {
        marginTop: height * 0.015,
    },
    reviewBox: {
        width: width * 0.45,
        padding: width * 0.04,
        backgroundColor: 'rgba(231, 241, 254, 1)',
        borderRadius: 10,
        marginRight: width * 0.025,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.015,
    },
    reviewImage: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: (width * 0.1) / 2,
        marginRight: width * 0.025,
    },
    reviewName: {
        fontSize: width * 0.04,
        fontWeight: '500',
    },
    reviewText: {
        fontSize: width * 0.035,
        color: '#333',
    },
    reviewStars: {
        flexDirection: 'row',
        marginTop: height * 0.01,
    },
    starIconReview: {
        marginRight: width * 0.015,
    },
});

export default ProfileComponent;