import {FlatList, Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import  bag from "../../assets/images/bag.png"
import usman from "../../assets/images/usman.png"
import Orders from "./appointment";
import renderItems from "../component/userAppointment";
import Styles from "../component/style";
const styles = Styles
const Appointment = () =>{
    const pendingAppointment = Orders.filter(order => order.status === "Pending");
    return (
        <SafeAreaView style={styles.ordersHeader}>
            <FlatList
                data={pendingAppointment}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.orders}
            />
        </SafeAreaView>
    )
}


export default Appointment