import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import BookKWaterScreen from "../bookAppointment/BookAppointment";
import PlainPage from "../bookAppointment/BookAppointment";
import AppointmentBooking from "../bookAppointment/BookAppointment";

const Chat = () =>{
    return (
        <SafeAreaView>
            <View>
                <BookKWaterScreen/>
            </View>
        </SafeAreaView>
    )
}

export default Chat