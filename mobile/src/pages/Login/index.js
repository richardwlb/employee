import React, { useState } from "react";
import { Button } from "react-native-elements"
import { View, Text, TextInput, Image } from "react-native";

import { doLogin } from "../../services/auth";

import logoImg from "../../assets/logo.png";

import styles from "./styles";
import api from '../../services/api';

export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function submitLogin(){

        if (email.length === 0 || password.length === 0) {
            setError('Preencha usuário e senha para continuar!');
        }else{
            setError('');
            try{
                const response = await api.post('/login', { "login": email, password });

                const token = response.data.token;

                await doLogin(token);
                navigation.navigate("App");
                
            }catch(err){
                console.log(err);
                setError('Houve um problema com o login, verifique suas credenciais!');
            }
            
        }

    }

    return(
        <View style={styles.container}>
            <View style={styles.loginBox} >  
                <Image source={logoImg} />
                {/* <Text style={styles.text} >Login:</Text> */}
                <TextInput 
                    placeholder="User Name" 
                    style={styles.loginInput} 
                    value={email}
                    onChange={ (e) => setEmail(e.nativeEvent.text)}
                />
                <TextInput 
                    placeholder="Password" 
                    secureTextEntry={true} 
                    style={styles.loginInput} 
                    value={password}
                    onChange={ (e) => setPassword(e.nativeEvent.text)}
                />
                { error.length !== 0 && <Text style={{marginTop:20}} >{error}</Text>}
                <Button 
                    style={styles.button} 
                    title="Login" 
                    onPress={ () => submitLogin() }
                />
            </View>
        </View>

    );


}