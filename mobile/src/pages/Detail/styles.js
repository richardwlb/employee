import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        //   backgroundColor: '#fff',
        marginTop: 10,
        backgroundColor: 'rgb(232, 235, 236)',
    },
    detail: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        color: "#666",
        padding: 20,
        backgroundColor: "#0072b1",
    },
    textInput: {
        height: 33, 
        padding: 3,
        backgroundColor: "#ffffff",
        borderColor: 'white', 
        borderWidth: 1,
        margin: 10,
        borderRadius:5,
        alignSelf: "stretch",
    },

    textEmployeer: {
        color: "#fff",
        margin: 2,
        fontSize:16,
    },
    button: {
        marginTop: 10,
        fontSize:16,
        borderRadius:5,
        width: 145,
        margin: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
    }

});

export const pickerSelectStyles = StyleSheet.create({
     
    inputIOS: {
        backgroundColor: 'white',
        height: 33, 
        padding: 3,
        margin: 5,
        borderRadius: 5,
    },
    inputAndroid: {
        color: 'white',
    }
});
