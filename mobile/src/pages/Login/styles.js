import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        marginTop: 40,
        backgroundColor: '#F5F5F5',
          
    },
    loginBox: {
        marginTop:80,
        height:350,
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 20,
        // backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    loginInput: {
        height: 40, 
        backgroundColor: "#ffffff",
        borderColor: 'black', 
        borderWidth: 1,
        marginTop: 10,
        borderRadius:3,
        alignSelf: "stretch",
    },
    text: {
        // back: "#ffffff",
        margin: 2,
        fontSize:16,
        marginTop: 10,
    },
    button: {
        marginTop: 50,
        fontSize:16,
        borderRadius:5,
        width: 300,
    },
});