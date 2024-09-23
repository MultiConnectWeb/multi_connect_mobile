import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import Dashboard from "../(dashboard)/dashboard";
import Header from "../component/header/header";
import ServiceProviderDashboard from "../(dashboard)/dashboard";
import Profile from "../profile/profile";
import Kwaft from "./kwaft";

const ServiceProviderHome = () => {
    return (
        <View style={styles.container}>
            <Header title={''}/>
            <ServiceProviderDashboard/>
        </View>
    );
};

export default ServiceProviderHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    content: {
        padding: 16,
    },
});
