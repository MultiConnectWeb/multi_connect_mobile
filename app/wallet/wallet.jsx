import React  from "react";
import {Dimensions, FlatList, Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import transaction from "./data";
import {useRouter} from "expo-router";
import TransactionHistory from "./transactionHistory";
const image = require('../../assets/images/account_balance_wallet_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png')
const {width,height} = Dimensions.get("window");
const Data = transaction

export default function Wallet(){
    const route = useRouter()
    return(
        <>
            <View style={styles.mainContainer}>
                <View style={styles.firstContainer}>
                    <View style={styles.walletIcon} >
                        <Icon name="account-balance-wallet" size={width/4} color="#000" />
                    </View>
                    <Text style={styles.balance}>₦10,500</Text>
                    <Text style={styles.totalBalance}>Total Balance</Text>
                    <TouchableOpacity style={styles.withdraw} onPress={()=>route.push('wallet/withdraw') }>
                        <Text style={styles.withdrawText}>
                            Withdraw
                        </Text>
                    </TouchableOpacity>
                </View>
                <TransactionHistory/>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    firstContainer:{
        display:"flex",
        alignSelf:"center",
        justifyContent: "center",
        alignItems: "center",
        gap:width/45,
        marginBottom:width/40
    },
    walletIcon:{
        marginTop:width/10,
        backgroundColor:"rgba(45,232,160,0.7)",
        width:width/3,
        borderRadius:width/2,
        alignItems:'center',
        padding: 20

    },
    balance:{
        fontSize: width/15,
        fontWeight: "bold",
    },
    totalBalance:{
        fontSize: width/25,
        fontWeight: 12,
    },
    mainContainer:{
        marginBottom:width/3,
    },
    withdraw:{
        backgroundColor:"green",
        width:width/4,
        borderRadius:width/40
    },
    withdrawText:{
        padding:width/40,
        fontSize:width/20,
        alignSelf: "center",
        color:"white"
    }


})