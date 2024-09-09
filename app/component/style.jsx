import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    orders : {
        display : "flex",
        flexDirection : "column",
        gap: 30,
        marginTop : 30
    },
    detail : {
        width: "98%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between"
    },
    iconContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : "rgba(237, 237, 237, 1)",
        height : 52,
        width : 52,
        borderRadius : 52,
        marginRight: 0,
    },
    subject  :{
        fontFamily : "Georama",
        fontWeight : 500,
        fontSize : 18,
        lineHeight : 21.49
    },
    userInfo : {
        display : "flex",
        flexDirection : "row",
        gap : 2
    },
    date  : {
        color : "rgba(132, 132, 132, 1)"
    },
    money : {
        color : "rgba(68, 118, 4, 1)"
    },
    statusButton : {
        justifyContent : "center",
        alignItems : "center",
        height : 24,
        width : 67,
        borderRadius : 24 ,
    },
    secondContainer:{
        display: "flex",
        flexDirection : "row",
        justifyContent: 'space-between',
        width: "85%",
    },
    ordersHeader : {
        width: "100%",
        justifyContent : "center",
        alignItems : "center"
    },
    orderstext : {
        fontFamily :  "Georama",
        fontWeight :  400,
        fontSize :  18,
        lineHeight:  21.49
    }
})

export default Styles;