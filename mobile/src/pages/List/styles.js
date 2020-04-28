import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
        marginTop: 40,
        backgroundColor: 'rgb(232, 235, 236)',
    },
    header: {
        color: "#000000",
        marginBottom:10,
        fontSize:22,
        backgroundColor: "#527D96",
        padding: 10,
        alignContent: "flex-end",
        justifyContent: "flex-end"
    },

    employeer: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        color: "#666",
        padding: 20,
        backgroundColor: "#527D96",
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
      }
  });