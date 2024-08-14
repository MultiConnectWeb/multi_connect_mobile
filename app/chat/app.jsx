import List from "./list";
import Chat from "./chat";
import Login from "./login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import UseUserStore from "../lib/userStore";
import UseChatStore from "../lib/chatStore";
import {View} from "react-native";
import {useRouter} from "expo-router";
// import './index.css';

const App = () => {
    const route = useRouter()
    const {currentUser, isLoading, fetchUserInfo} = UseUserStore()
    const {chatId} = UseChatStore()
    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,(user)=>{
            fetchUserInfo(user?.uid)
        })

        return ()=>{
            unSub()
        }
    },[fetchUserInfo])

    if(isLoading) return <View >Loading... </View>
    // console.log( "chatId is " + chatId)
    // console.log(currentUser)
    return (
        <View >
            { currentUser ? (
                <>
                    { chatId && route.push('chat/chat')}
                </>
            ) :( route.push('chat/login'))
            }
        </View>

    )
}

export default App