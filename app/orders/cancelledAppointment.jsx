import {FlatList, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import  bag from "../../assets/images/bag.png"
import usman from "../../assets/images/usman.png"
import Orders from "./appointment";
import renderItems from "../component/userAppointment";
import Styles from "../component/style";
const  styles = Styles
const Appointment = () =>{
    const canceledAppointment = Orders.filter(order => order.status === "Canceled");
    return (
        <SafeAreaView style={styles.ordersHeader}>
            <FlatList
                data={canceledAppointment}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.orders}
            />
        </SafeAreaView>
    )
}


export default Appointment