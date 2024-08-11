import React, {useState} from "react";
import {Dimensions, TextInput, TouchableOpacity, View, Text, StyleSheet, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRouter} from "expo-router";
const {width,height} = Dimensions.get("window");

export default function Withdraw(){
    const route = useRouter()
    const [amountError, setAmountError] = useState('');
    const [accountNameError, setAccountNameError] = useState('');
    const [accountNumberError, setAccountNumberError] = useState('');
    const [amount, setAmount] = useState('');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [description, setDescription] = useState("");

    const handleWithdraw = () =>{
        let valid = true;
        if (!accountNumber) {
            setAccountNumberError('**Account Number is required');
            valid = false;
        } else {
            setAccountNumberError('');
        }

        if (!amount) {
            setAmountError('**Amount is required');
            valid = false;
        } else {
            setAmountError('');
        }
        if (!accountName) {
            setAccountNameError('**Account Name is required');
            valid = false;
        } else {
            setAccountNameError('');
        }
    }
    return(
        <ScrollView  contentContainerStyle={styles.container}>
            <View style={styles.icon}>
                <Icon  name="arrow-down" size={width/6}/>
            </View>
            <View style={styles.inputField}>
                <TextInput
                placeholder=" Account Number"
                placeholderTextColor="black"
                value={accountNumber}
                style={styles.input}
                onChangeText={setAccountNumber}
                onBlur={()=>!accountNumber && accountNumberError}
                ></TextInput>
                {accountNumberError ? <Text style={styles.errorText}>{accountNumberError}</Text> : null}

                <TextInput
                    placeholder="Account Name"
                    placeholderTextColor="black"
                    value={accountName}
                    style={styles.input}
                    onChangeText={setAccountName}
                    onBlur={()=> !accountName && accountName}
                ></TextInput>
                {accountNameError ? <Text style={styles.errorText}>{accountNameError}</Text> : null}
                <TextInput
                    placeholder="Amount"
                    placeholderTextColor="black"
                    value={amount}
                    onChangeText={setAmount}
                    style={styles.input}
                    onBlur={() => !amount && amountError}
                ></TextInput>
                {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

                <TextInput
                    placeholder="Description"
                    placeholderTextColor="black"
                    value={description}
                    style={styles.input}
                    onChangeText={setDescription}
                ></TextInput>
            </View>
            <TouchableOpacity style={styles.withdraw} onPress={handleWithdraw}>
                <Text style={styles.text}>Withdraw</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container : {
        width: width/1.15,
        height: height/1.25,
        display: 'flex',
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        gap: width/20
    },
    icon : {
        width: width/3,
        height: height/6.2,
        backgroundColor:"rgba(45,232,160,0.7)",
        alignItems:"center",
        justifyContent:'center',
        borderRadius:height/1.7
    },
    input:{
        height: height/12,
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    inputField:{
        width:"100%",
        gap: width/40
    },
    withdraw: {
        width:width/1.15,
        height:height/12,
        backgroundColor:"green",
        alignItems:"center",
        justifyContent: "center"
    },
    text: {
        fontSize:width/15,
        fontWeight:"700",
        fontFamily: "Roboto",
        color:"white"
    }
})
