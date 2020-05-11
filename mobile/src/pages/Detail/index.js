import React, { useState } from "react";
import { View, Text, TextInput, Alert, Platform } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements"

import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
// import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles, { pickerSelectStyles} from "./styles";
import api from '../../services/api';


export default function Detail(){

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setBirthDay(date);
      hideDatePicker();
    };

    const navigation = useNavigation();

    // Get info from the previous page
    const route = useRoute();
    const employee = route.params.employee;

    const idEmployee = employee.id;
    const [firstName, setFirstName] = useState(employee.first_name);
    const [lastName, setLastName] = useState(employee.last_name);
    const [birthDay, setBirthDay] = useState(employee.birth_date);
    const [idArea, setIdArea] = useState(employee.id_area);
    const [idNationality, setIdNationality] = useState(employee.id_nationality);

    function confirmDelete(type) {
        Alert.alert(
            `${type} ${firstName} ?`,
            `Are you sure you want to ${type.toLowerCase()} this employee?`,
            [
                {
                    text: "Confirm",
                    onPress: () => { 
                        if (type == "Delete"){
                            deleteEmployee(); 
                        }else{
                            updateEmployee();
                        } 
                    },
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { cancelable: false }
            ]
            );
    }

    async function deleteEmployee(){
        try{
            await api.delete(`/employee/${idEmployee}`);
            navigation.navigate('List');
        }catch(err){
            console.log(err);
            alert(err);
        }
    }

    async function updateEmployee(){
        try{
            await api.put(`/employee/${idEmployee}`, { 
                "last_name" : lastName, 
                "first_name" : firstName, 
                "birth_date" : moment(birthDay).format('YYYY-MM-DD'), 
                "id_area" : idArea, 
                "id_nationality" : idNationality
            });
            navigation.navigate('List');
        }catch(err){
            console.log(err);
            alert(err);
        }
    }



    return(
        <View style={styles.container} >
            <View style={styles.detail} >

            <Text style={styles.textEmployeer} >First name:</Text>
            <TextInput style={styles.textInput} value={firstName} onChange={ e => setFirstName(e.nativeEvent.text)} />

            <Text style={styles.textEmployeer} >Last name:</Text>
            <TextInput style={styles.textInput} value={lastName} onChange={ e => setLastName(e.nativeEvent.text)}/>

            <Text style={styles.textEmployeer} >Birthday:</Text>

            <TextInput onTouchStart={showDatePicker} editable = {false} style={styles.textInput} value={moment(birthDay).format('DD/MM/YYYY')}  />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date(birthDay)}
            />

            <Text style={styles.textEmployeer} >Área:</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                value={idArea}
                onValueChange={ e => setIdArea(e)}
                items={[
                    { label: 'Technology', value: 1 },
                    { label: 'Intern', value: 2 },
                    { label: 'Sales', value: 3 },
                ]}
            />

            <Text style={styles.textEmployeer} >Nationality:</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                value={idNationality}
                onValueChange={ e => setIdNationality(e)}
                items={[
                    { label: 'Brazilian', value: 1 },
                    { label: 'American', value: 2 },
                    { label: 'German', value: 3 },
                ]}
            />

            </View>

            <View style={styles.buttonContainer}>

                <Button 
                    style={styles.button} 
                    title="Update" 
                    onPress={ () => confirmDelete("Update") }
                />

                <Button 
                    style={styles.button} 
                    title="Deletar" 
                    onPress={ () => confirmDelete("Delete") }
                />

            </View> 

        </View>
        
    )
}