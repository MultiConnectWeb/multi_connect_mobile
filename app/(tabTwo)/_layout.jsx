import {Image, View,Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import Home from "../../assets/images/home.png"
import user from "../../assets/images/user.png"
import repeat from "../../assets/images/My Kwafts.png"
import message from "../../assets/images/chat.png"
import wallet from "../../assets/images/wallet.png"



const  TabIcon = ({icon, color, name, focused}) =>{

    const getIcon = () =>{
        if (icon) {
            return (
                <Image
                    source={icon}
                    resizeMode={"contain"}
                    style={{ width: 28, height: 28, tintColor: color }}
                />
            );
        }

        const iconName = name === "Post" ? "plus" : "bell";
        return <FontAwesome name={iconName} size={28} color={color}/>
    };
    return (
        <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 5 }}>
            {getIcon()}
            <Text
                style={{
                    color,
                    fontSize: 12,
                    fontWeight: focused ? "bold" : "normal",
                    marginTop: 4,
                }}
            >
                {name}
            </Text>
        </View>
    );
}

const TabsLayout = () =>{
    return(
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel : false,
                    tabBarActiveTintColor : "rgba(32, 130, 32, 1)",
                    tabBarStyle:{
                        backgroundColor : "#fff",
                        borderTopWidth : 1,
                        borderTopColor : "rgba(183, 183, 183, 1)",
                        height : 90,
                    }
                }}
            >
                <Tabs.Screen
                    name="userHome"
                    options={{
                        title:"userHome",
                        headerShown : false,
                        tabBarIcon :
                            ({color, focused}) =>(
                                <TabIcon
                                    icon={Home}
                                    color={color}
                                    name={"Home"}
                                    focused={focused}
                                />
                            )
                    }}
                />
                <Tabs.Screen
                    name="userkwaft"
                    options={{
                        title : "userkwaft",
                        headerShown:false,
                        tabBarIcon : ({color , focused}) =>
                            <TabIcon
                                icon={repeat}
                                color={color}
                                name={"My Kwafts"}
                                focused={focused}
                            />
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title : "Messages",
                        headerShown:true,
                        tabBarIcon : ({color , focused}) =>
                            <TabIcon
                                icon={message}
                                color={color}
                                name={"Chat"}
                                focused={focused}
                            />
                    }}
                />
                <Tabs.Screen
                    name="userWallet"
                    options={{
                        title : "userWallet",
                        headerShown:false,
                        tabBarIcon : ({color , focused}) =>
                            <TabIcon
                                icon={wallet}
                                color={color}
                                name={"Wallet"}
                                focused={focused}
                            />
                    }}
                />
                <Tabs.Screen
                    name="userProfile"
                    options ={{
                        title : "userProfile",
                        headerShown : false,
                        tabBarIcon : ({color, focused }) =>
                            <TabIcon
                                icon={user}
                                color={color}
                                name={"Profile"}
                                focused={focused}
                            />
                    }}
                />
            </Tabs>
        </>
    )
}
export default TabsLayout