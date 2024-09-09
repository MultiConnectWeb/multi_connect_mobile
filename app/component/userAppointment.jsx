import {Image, Text, View} from "react-native";
import bag from "../../assets/images/bag.png";
import Styles from "./style";

const styles = Styles
const renderItems = ({ item }) => (
    <View style={styles.detail}>
        <View style={styles.iconContainer}>
            <Image source={bag} />
        </View>
        <View style={styles.secondContainer}>
            <View>
                <Text style={styles.subject}>{item.subject}</Text>
                <View style={styles.userInfo}>
                    <Image source={item.image} />
                    <Text>{item.name}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <View>
                <Text style={styles.money}>{item.amount}</Text>
                <View style={[styles.statusButton,{backgroundColor:item.color}]}>
                    <Text>{item.status}</Text>
                </View>
            </View>
        </View>
    </View>
);
export default renderItems;