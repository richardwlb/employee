import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
        marginTop: 0,
        backgroundColor: 'rgb(232, 235, 236)',
    },
    header: {
        color: "#000000",
        marginBottom:10,
        fontSize:22,
        backgroundColor: "#0072b1",
        padding: 10,
        alignContent: "flex-end",
        // justifyContent: "flex-start",
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent: "center",
    },

    employeer: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        color: "#666",
        padding: 20,
        backgroundColor: "#0072b1",
    },

    textEmployeer: {
        color: "#fff",
        margin: 2,
        fontSize:16,
    },

    detailsButtonText: {
        marginTop: 10,
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    },
      textInput: {
        height: 33, 
        padding: 3,
        width: 200,
        backgroundColor: "#ffffff",
        borderColor: 'white', 
        borderWidth: 1,
        margin: 10,
        borderRadius:5,
        alignSelf: "stretch",
    },
  });