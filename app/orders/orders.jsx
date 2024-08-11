import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import  images from "../../constants/images"

const Orders = () =>{

    return(
        <SafeAreaView style={styles.ordersHeader}>
            <Text style={styles.orderstext}>Orders</Text>
            <View style={styles.orders}>
                <View style={styles.detail}>
                    <View style={styles.iconContainer}>
                        <Image source={images.bag} />
                    </View>
                    <View>
                        <Text style={styles.subject}>Health Issues</Text>
                        <View style={styles.userInfo}>
                            <Image source={images.usman} />
                            <Text>Usman Jide</Text>
                        </View>
                        <Text style={styles.date}>
                            Monday, 5th January - 11:50pm
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.money}>₦10,500</Text>
                        <View style={styles.datilsButton}>
                            <Text>
                                Active
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detail}>
                    <View style={styles.iconContainer}>
                        <Image source={images.bag} />
                    </View>
                    <View>
                        <Text style={styles.subject}>Treatment</Text>
                        <View style={styles.userInfo}>
                            <Image source={images.usman} />
                            <Text>Usman Jide</Text>
                        </View>
                        <Text style={styles.date}>
                            Monday, 5th January - 11:50pm
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.money}>₦10,500</Text>
                        <View style={styles.datilsButtonCanceled}>
                            <Text>
                                Canceled
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detail}>
                    <View style={styles.iconContainer}>
                        <Image source={images.bag} />
                    </View>
                    <View>
                        <Text style={styles.subject}>Medication</Text>
                        <View style={styles.userInfo}>
                            <Image source={images.usman} />
                            <Text>Usman Jide</Text>
                        </View>
                        <Text style={styles.date}>
                            Monday, 5th January - 11:50pm
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.money}>₦10,500</Text>
                        <View style={styles.datilsButtonDone}>
                            <Text>
                                Done
                            </Text>
                        </View>
                    </View>
                </View><View style={styles.detail}>
                <View style={styles.iconContainer}>
                    <Image source={images.bag} />
                </View>
                <View>
                    <Text style={styles.subject}>Medication</Text>
                    <View style={styles.userInfo}>
                        <Image source={images.usman} />
                        <Text>Usman Jide</Text>
                    </View>
                    <Text style={styles.date}>
                        Monday, 5th January - 11:50pm
                    </Text>
                </View>
                <View>
                    <Text style={styles.money}>₦10,500</Text>
                    <View style={styles.datilsButtonPending}>
                        <Text>
                            Pending
                        </Text>
                    </View>
                </View>
            </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    orders : {
        display : "flex",
        flexDirection : "column",
        gap: 30,
        marginTop : 30
    },
    detail : {
        display : "flex",
        flexDirection : "row",
        gap : 10,
        justifyContent : "center"
    },
    iconContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : "rgba(237, 237, 237, 1)",
        height : 52,
        width : 52,
        borderRadius : 52
    },
    subject  :{
        fontFamily : "Georama",
        fontWeight : 500,
        fontSize : 18,
        lineHeight : 21.49
    },
    userInfo : {
        display : "flex",
        flexDirection : "row",
        gap : 2
    },
    date  : {
        color : "rgba(132, 132, 132, 1)"
    },
    money : {
        color : "rgba(68, 118, 4, 1)"
    },
    datilsButton : {
        backgroundColor : "rgba(178, 214, 255, 1)",
        justifyContent : "center",
        alignItems : "center",
        height : 24,
        width : 67,
        borderRadius : 24 ,
    },
    datilsButtonDone : {
        backgroundColor : "green",
        justifyContent : "center",
        alignItems : "center",
        height : 24,
        width : 67,
        borderRadius : 24 ,
    },
    datilsButtonCanceled : {
        backgroundColor : "rgba(255, 178, 178, 1)",
        justifyContent : "center",
        alignItems : "center",
        height : 24,
        width : 67,
        borderRadius : 24 ,
    },
    datilsButtonPending : {
        backgroundColor : "rgba(255, 242, 178, 1)",
        justifyContent : "center",
        alignItems : "center",
        height : 24,
        width : 67,
        borderRadius : 24 ,
    },
    ordersHeader : {
        justifyContent : "center",
        alignItems : "center"
    },
    orderstext : {
        fontFamily :  "Georama",
        fontWeight :  400,
        fontSize :  18,
        lineHeight:  21.49
    }
})
export default Orders