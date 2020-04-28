import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

import styles from "./styles";

export default function Detail(){

    const route = useRoute();
    const employee = route.params.employee;


    return(
        <View style={styles.container} >
            <View style={styles.detail} >
                <Text style={styles.textEmployeer} >{ employee.first_name, employee.last_name }</Text>
                <Text style={styles.textEmployeer} >{ moment(employee.birth_date).format("DD.MM.YYYY") }</Text>
                <Text style={styles.textEmployeer} >{ employee.id_area }</Text>
                <Text style={styles.textEmployeer} >{ employee.id_nationality }</Text>
            </View>
        </View>
        
    )
}