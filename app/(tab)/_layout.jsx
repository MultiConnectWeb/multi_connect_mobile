import {Image, View,Text} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import Home from "../../assets/images/home.png"
import user from "../../assets/images/user.png"
import repeat from "../../assets/images/My Kwafts.png"
import message from "../../assets/images/chat.png"



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
                    name="serviceProviderHome"
                    options={{
                        title:"serviceProviderHome",
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
                    name="kwaft"
                    options={{
                        title : "kwaft",
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
                        title : "chat",
                        headerShown:false,
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
                    name="serviceProviderProfile"
                    options ={{
                        title : "profile",
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