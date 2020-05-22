import React, { useState } from "react";
import { View, Text, TextInput, Alert, Platform } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements"

import moment from "moment";
import RNPickerSelect from 'react-native-picker-select';
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthDay] = useState( new Date() );
    const [idArea, setIdArea] = useState('');
    const [idNationality, setIdNationality] = useState('');

    function confirmNew() {
        Alert.alert(
            `New employee`,
            `Are you sure you want to create this employee?`,
            [
                {text: "Confirm",onPress: () => { newEmployee() },},
                { text: "Cancel", style: "cancel"},
                { cancelable: false }
            ]
        );
    }

    async function newEmployee(){
        try{
            await api.post('/employee', {
                first_name: firstName,
                last_name: lastName,
                birth_date: moment(birthDay).format('YYYY-MM-DD'),
                id_area: idArea,
                id_nationality: idNationality
            } )
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
                    title="Create" 
                    onPress={ () => confirmNew() }
                />

            </View> 

        </View>
        
    )
}