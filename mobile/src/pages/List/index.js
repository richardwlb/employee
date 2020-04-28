import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { View, FlatList, Text, TouchableOpacity } from "react-native";

import {  logout } from "../../services/auth";

import styles from "./styles";

import api from "../../services/api";

export default function List({ navigation }){

    const [employeers, setEmployeers] = useState([]);

    const doLogout =  async () => {
        await logout();
        navigation.push("Auth");
    }

    async function loadEmployeers(){

        const response = await api.get("/employee");
        setEmployeers(response.data.result);
        // setEmployeers([1,2,3]);
    }

    const navigateToDetail = (employee) => {
        navigation.navigate("Detail", { employee });
    }

    useEffect(() => {
        loadEmployeers();
    }, []);

    return (
    <View style={styles.container}>
        {/* <Text style={styles.header} >pagina de listagem!</Text> */}
        
        <View style={styles.header} >
            <TouchableOpacity
            // style={styles.detailsButton}
            onPress={ () =>  doLogout() } >
                {/* <Text style={styles.detailsButtonText}>Logoff</Text> */}
                <Feather name="power" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
        

        <FlatList
            data={employeers}
            style={styles.incidentList}
            keyExtractor={emp => String(emp.id)}
            // showsVerticalScrollIndicator={false}
            onEndReached={loadEmployeers}
            onEndReachedThreshold={0.2}
            renderItem={({ item: employeers }) => (

            <View style={styles.employeer} >
                <Text style={styles.textEmployeer} >{ employeers.last_name , employeers.first_name}</Text>
                <Text style={styles.textEmployeer} >{employeers.id_area}</Text>
                <TouchableOpacity
                style={styles.detailsButton}
                onPress={ () =>  navigateToDetail(employeers) } >
                    <Text style={styles.detailsButtonText}>Detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#fff" />
                </TouchableOpacity>
            </View>

            ) } />

    </View>
    );
}


  