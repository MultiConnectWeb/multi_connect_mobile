import React  from "react";
import {Dimensions, FlatList, Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import transaction from "./data";
import {useRouter} from "expo-router";
const image = require('../../assets/images/account_balance_wallet_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png')
const {width,height} = Dimensions.get("window");
const Data = transaction

const transactions = ({item}) =>{
    return(
        <View style={styles.transactionContainer}>
            <View style={styles.imageTextContainer}>
                <Icon1 name = {item.type === "Deposit" ? "money" : "credit-card"} size = {width/11} />
                <View style={{gap:width/30}} >
                    <Text style={styles.type}>{item.type}</Text>
                    <Text>{item.date}</Text>
                </View>
            </View>
            <Text style={{ color : item.type==="Deposit" ? "rgba(14,188,22,0.7)": "red",fontWeight:"bolder",fontSize:20}}>{item.amount}</Text>
        </View>
    )
}
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
                <FlatList style={styles.flat} data={Data} renderItem={transactions}/>
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
    transactionContainer:{
        marginTop:width/30,
        width:width/1.1,
        display:"flex",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        alignSelf:"center",
        borderBottomColor:"black",
        borderBottomWidth: width/120,
        padding:width/30,
    },
    type:{
        fontSize:width/17,
        fontWeight: "600"
    },
    imageTextContainer:{
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        gap:width/26,
    },
    mainContainer:{
        marginBottom:width/3,
    },
    flat:{
        height:height/2
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