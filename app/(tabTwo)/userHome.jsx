import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import UserDashboard from "../(dashboard)/UserDashboard";
import Header from "../component/header/header";


const UserHome = () =>{
    return(
        <SafeAreaView>
            <View>

                <UserDashboard/>
            </View>
        </SafeAreaView>
    )
}

export default UserHome