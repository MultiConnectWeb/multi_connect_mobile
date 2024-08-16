import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import MyChat from "../chat/MyChat";


const Chat = () =>{
    return (
        <SafeAreaView>
            <View>
                <MyChat/>
            </View>
        </SafeAreaView>
    )
}

export default Chat