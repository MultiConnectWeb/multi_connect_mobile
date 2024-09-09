import {Dimensions, FlatList, Text, View, StyleSheet, ScrollView} from "react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";
import React from "react";
import Data from "./data";

const {width,height} = Dimensions.get("window");
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
                <Text style={{ color : item.type==="Deposit" ? "rgba(14,188,22,0.7)": "red",fontWeight:"bolder",fontSize:20}}>{item.amount}</Text></View>

    )
}
const TransactionHistory = () => {

    return (
        <FlatList style={{height:height/1.9}} data={Data} renderItem={transactions}/>
    )
}

const styles = StyleSheet.create({
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
})

export default TransactionHistory;