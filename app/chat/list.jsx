import ChatList from './chatList'
import UserInfo from './userInfo'
import {View,StyleSheet} from "react-native";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../lib/firebase";
import UseUserStore from "../lib/userStore";


const List = () => {
    const {fetchUserInfo} = UseUserStore()

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,(user)=>{
            fetchUserInfo(user?.uid)
        })

        return ()=>{
            unSub()
        }
    },[fetchUserInfo])
    return (
        <View style={styles.container}>
            <UserInfo/>
            <ChatList/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        display: 'flex',
        flexDirection: "column",
    }
})

export default List