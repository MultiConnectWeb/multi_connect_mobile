import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import Dashboard from "../(dashboard)/dashboard";
import Header from "../component/header/header";

const ServiceProviderHome = () => {
    return (
        <View style={styles.container}>
            <Header title="" />
            <Dashboard />
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
