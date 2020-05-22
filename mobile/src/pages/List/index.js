import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { View, FlatList, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";

import {  logout } from "../../services/auth";

import styles from "./styles";

import api from "../../services/api";

export default function List({ navigation }){

    const [employeers, setEmployeers] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [arrayholder, setArrayholder] = useState('');

    const doLogout =  () => {
        console.log('<< logout')
        logout();
        navigation.push("Auth");
        return;
    }

    const confirmLogout = () => {

        Alert.alert('', `Are you sure you want to logoff?`,
        [{
            text: "Confirm",
            onPress: async () => { 
                await doLogout();
                return;
            },
            // onPress: async () => { console.log('<< logout')},
        },
            {text: "Cancel",style: "cancel"},
            { cancelable: false }
        ]);

    }

    const loadArrayholder = async () => {

        setLoading(true);

        setPage(1);
        setTotal(0);

        try{
            const response = await api.get("/employee", {  params: {page: 'all'} });
            // arrayholder = response.data.result;
            setArrayholder(response.data.result);
        }catch(err){
            console.log(err);
        }

        setLoading(false);

    }

    async function loadEmployeers(flag){


        console.log('loadEmp', employeers.length, total);

            if (loading) { return; }
            
            if (total > 0 && employeers.length == total) { 
                console.log('<< entrou'); 
                return;
            }
        
            setLoading(true);

            try{
                const response = await api.get("/employee", {  params: {page} });

                setEmployeers([...employeers,...response.data.result]);
                setPage(page + 1);
                setTotal(response.headers["x-total-count"]);
                setLoading(false);
            }catch( err ){
                alert(err.response.data.error);
                doLogout();
            }

    }

    // const searchFilter = text => {
        function searchFilter(text){

        setSearch(text);

        const newData = arrayholder.filter( item => {
            const itemData = `${item.first_name.toUpperCase()}`; // ${item.last_name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
          });

          console.log(newData);

        setEmployeers(newData);

    }

    const navigateToDetail = (employee) => {
        // navigation.navigate("Detail", { employee, onGoBack: () => reload() });
        navigation.navigate("Detail", { employee, onGoBack: () => console.log(':(') });
    }

    // // function reload(){
    // function reload(){
    //     console.log('<< reload');

    //     setArrayholder('');
    //     setEmployeers('');
    //     setPage(1);
    //     setTotal(0);
    //     loadArrayholder();

    //     loadEmployeers('x');
    // }

    

    useEffect( () => {

        navigation.addListener('willFocus', () => {
            console.log('listener...');
            // this.setState({ ts: Date.now() })
          })

        console.log('<< useEffect');

        loadArrayholder();
        loadEmployeers();
    }, []);

    // if (loading) {
    //     return (
    //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //         <ActivityIndicator />
    //       </View>
    //     );
    // }

    return (
    <View style={styles.container}>
        {/* <Text style={styles.header} >pagina de listagem!</Text> */}
        
        <View style={styles.header} >

            <TouchableOpacity
                onPress={ () => confirmLogout() } >
                <Feather name="power" size={25} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={ () => navigation.navigate("New") } >
                <Feather name="plus-circle" size={25} color="#fff" />
            </TouchableOpacity>
        </View>

        <SearchBar 
            // style={styles.textInput} 
            placeholder="Search" 
            value={search} 
            lightTheme        
            round      
            onChangeText={text => searchFilter(text)}
        />
        
        <FlatList
            data={employeers}
            style={styles.incidentList}
            keyExtractor={emp => String(emp.id)}
            showsVerticalScrollIndicator={true}
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


  