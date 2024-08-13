import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {router} from "expo-router";

const kwafter = () => {
    function handlePressOrders() {
        router.push("orders/orders")
    }

    return (
        <SafeAreaView>
            <View>
                <View style={styles.mainCont}>
                    <Text style={styles.viewKwaft}>View Kwafts</Text>
                    <View style={styles.circleContainer}>
                        <View style={[styles.outerCircle, styles.greenBorder]}>
                            <Text style={[styles.percentageText, styles.greenText]}>78%</Text>
                        </View>
                        <View style={[styles.outerCircle, styles.yellowBorder]}>
                            <Text style={[styles.percentageText, styles.yellowText]}>10%</Text>
                        </View>
                        <View style={[styles.outerCircle, styles.pinkBorder]}>
                            <Text style={[styles.percentageText, styles.pinkText]}>12%</Text>
                        </View>

                        <View style={styles.innerCircle}>
                            <View style={styles.innerCircleContentDetails}>
                                <Text style={styles.bulletPointG}>.</Text>
                                <Text style={styles.text}>Completed</Text>
                            </View>
                            <View style={styles.innerCircleContentDetails}>
                                <Text style={styles.bulletPointP}>.</Text>
                                <Text style={styles.text}>Pending</Text>
                            </View>
                            <View style={styles.innerCircleContentDetails}>
                                <Text style={styles.bulletPointY}>.</Text>
                                <Text style={styles.text}>Canceled</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.kwa}>

                    <Text style={styles.medical}>Medical Doctor</Text>
                    <View style={styles.topANdBottom}>

                    </View>
                    <View style={styles.kwaftDeatils}>
                        <Text style={styles.portfo}>Kwaft Portfolios</Text>
                        <TouchableOpacity onPress={handlePressOrders}>
                            <Text style={styles.viewAllOrders}>View Orders</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.kwaftDeatils}>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>Total Orders</Text>
                        <Text style={{color : "green"}}>100</Text>
                    </View>
                    <View style={styles.kwaftDeatils}>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>Complected Orders</Text>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>78</Text>
                    </View>
                    <View style={styles.kwaftDeatils}>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>Pending Orders</Text>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>12</Text>
                    </View>
                    <View style={styles.kwaftDeatils}>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>Canceled Orders</Text>
                        <Text style={{color : "rgba(70, 70, 70, 1)"}}>10</Text>
                    </View>
                    <View style={styles.topANdBottom}>

                    </View>
                </View>
                <ScrollView>
                    <View style={styles.secondCont}>
                        <View style={styles.circleContainer}>
                            <View style={[styles.outerCircle, styles.greenBorder]}>
                                <Text style={[styles.percentageText, styles.greenText]}>78%</Text>
                            </View>
                            <View style={[styles.outerCircle, styles.yellowBorder]}>
                                <Text style={[styles.percentageText, styles.yellowText]}>10%</Text>
                            </View>
                            <View style={[styles.outerCircle, styles.pinkBorder]}>
                                <Text style={[styles.percentageText, styles.pinkText]}>12%</Text>
                            </View>

                            <View style={styles.innerCircle}>
                                <View style={styles.innerCircleContentDetails}>
                                    <Text style={styles.bulletPointG}>.</Text>
                                    <Text style={styles.text}>Completed</Text>
                                </View>
                                <View style={styles.innerCircleContentDetails}>
                                    <Text style={styles.bulletPointP}>.</Text>
                                    <Text style={styles.text}>Pending</Text>
                                </View>
                                <View style={styles.innerCircleContentDetails}>
                                    <Text style={styles.bulletPointY}>.</Text>
                                    <Text style={styles.text}>Canceled</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewKwaft : {
        fontSize : 18,
        fontFamily :"FontGeorama",
        fontWeight : 400,
        lineHeight : 49
    },
    mainCont : {
        justifyContent : "center",
        alignItems : "center"
    },
    circleContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft : 80,
        marginTop : 20
    },
    outerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        position: 'absolute',
        borderWidth: 20,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topANdBottom : {
        borderWidth : 1,
        borderColor : "rgb(103,103,103)",
        marginTop : 20,
        marginRight  :20
    },
    greenBorder: {
        borderColor: 'green',
        zIndex: 1,
    },
    yellowBorder: {
        borderColor: 'yellow',
        transform: [{ rotate: '36deg' }],
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        zIndex: 2,
    },
    pinkBorder: {
        borderColor: 'pink',
        transform: [{ rotate: '79.2deg' }],
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        zIndex: 3,
    },
    percentageText: {
        position: 'absolute',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    greenText: {
        transform: [{ rotate: '-18deg' }],
        top: '35%',
        left: '35%',
    },
    yellowText: {
        transform: [{ rotate: '-54deg' }],
        top: '20%',
        left: '60%',
    },
    pinkText: {
        transform: [{ rotate: '-90deg' }],
        top: '60%',
        right: '20%',
    },
    innerCircle: {
        backgroundColor: 'white',
        borderRadius: 80,
        height: 160,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    innerCircleContentDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop : -30

    },
    bulletPointG: {
        fontSize: 60,
        color: 'green',
    },
    bulletPointP: {
        fontSize: 60,
        color: 'yellow',
    },
    bulletPointY: {
        fontSize: 60,
        color: 'pink',
    },
    text: {
        marginTop: 26,
    },
    kwa : {
        display : "flex",
        flexDirection : "column",
        marginLeft : 20,
        marginTop : 20,
    },
    medical : {
        fontFamily :"Georama",
        fontWeight : 500,
        fontSize : 26,
        lineHeight : 40,
        color  : "rgba(70, 70, 70, 1)"
    },
    kwaftDeatils : {
        display : "flex",
        flexDirection : "row",
        alignItems  : "center",
        justifyContent  :"space-between",
        marginTop : 20,
        marginRight : 20
    },
    viewAllOrders : {
        color : "blue"
    },
    portfo : {
        font : "Georama",
        fontWeight : 500,
        fontSize :  18,
        lineHeight :21.49,
        color  : "rgba(70, 70, 70, 1)"
    },
    secondCont : {
        justifyContent : "center",
        alignItems : "center",
        marginTop  :10
    }
});

export default kwafter;