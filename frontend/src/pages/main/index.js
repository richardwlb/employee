import React, { Component } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 8000,
    draggable: false,
    hideProgressBar: true,
    position: "top-center"
    //etc you get the idea
  });


export default class Main extends Component {
    state = {
        emplist: []
    }

    componentDidMount(){
        this.loadEmployees();
    }


    loadEmployees = async () => {

        try{
            const response = await api.get('/employee');
            this.setState({ emplist : response.data.result });
        }catch(err) {
            console.error( 'error:', err);
            return toast.error('Unable to get data. Please login');
        } 

    }

    render(){

        const { emplist } = this.state;

        return (
            
            <div className="emp-list">
                { emplist.map( emp => ( 
                <article key={emp.id}><div id="div-img"><img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650_960_720.png" ></img></div>
                    <div id="emp-info"><strong>{emp.last_name}, {emp.first_name}</strong>
                    <p>{moment(emp.birth_date).format('DD.MM.YYYY')}</p>
                    <p>{emp.id_area}</p>
                    <p>{emp.id_nationality}</p>
                    </div>
                </article>
                )) }
            </div>
        );
    }

}