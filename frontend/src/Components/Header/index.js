import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { logout } from '../../services/auth';

import './index.css'


// export default class Header extends Component {
export default function Header(){

    const history = useHistory();

    function handleLogout(){

        if (window.confirm('Are you sure you wish to logoff?')) {
            logout();
            history.push('/');
        }     
    }

        return (
            <div className="header-container">
                <div className="header-class">
                    <h3>Employees</h3>
                </div>
                <div className="header-functions">
                    <button 
                        onClick={handleLogout}>
                        <FiPower size={18} color="#ffffff" />
                    </button>
                </div>                         
            </div>
        );
        

}