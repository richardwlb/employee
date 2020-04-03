import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { doLogin, logout } from '../../services/auth';
import api from '../../services/api';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 8000,
    draggable: true,
    hideProgressBar: true,
    position: "top-center"
  });

export default function Login(){

    const history = useHistory();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    // handleLogin = async (e) => {
    async function handleLogin(e){
        e.preventDefault();
        
            await api.post('/login', { login, password }).then((response) => {
            // Success
            const token = response.data.token;
            doLogin(token);
            history.push("/Main");

        })
        .catch((error) => {
            // console.log(error.response.data.error);

            logout();
            toast.error(error.response.data.error);
        });   
        
    }

    return(
        <div className="login">
            <form onSubmit={handleLogin}>
                
                <label htmlFor="login"> Login:
                <input 
                    name="login" 
                    placeholder="Your ID"
                    value={login}
                    onChange={ e => setLogin(e.target.value)}
                    type="text"
                />
                </label>

                <label htmlFor="password">Password:
                <input 
                    name="password" 
                    placeholder="Your password"
                    value={password}
                    onChange={ e => setPassword(e.target.value) }
                    type="password"
                />
                </label>

                <button type="submit">Login</button>

            </form>
           
        </div>

    )
}