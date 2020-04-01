import React, { useState } from 'react';
import './index.css';

export default function Login(){

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="login">
            <form action="">
                
                <label htmlFor="login"> Login:
                <input name="login" type="text"/>
                </label>

                <label htmlFor="password">Password:
                <input name="password" type="password"/>
                </label>

                <button>Login</button>

            </form>
        </div>
        
    )
}