import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import BookKWaterScreen from "../bookAppointment/BookAppointment";
import PlainPage from "../bookAppointment/BookAppointment";
import AppointmentBooking from "../bookAppointment/BookAppointment";
import ChatList from "../chat/chatList";
import {Redirect} from "expo-router";

const Chat = () =>{
    return (
        <ChatList/>
    )
}

export default Chat