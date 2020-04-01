import React, { Component } from 'react';
import api from '../../services/api';
import moment from 'moment';

export default class Main extends Component {
    state = {
        emplist: []
    }

    componentDidMount(){
        this.loadEmployees();
    }

    loadEmployees = async () => {
        const response = await api.get('/employee'); 
        this.setState({ emplist : response.data});
    }

    render(){

        const emp = this.state.emplist;

        return (
            <div className="emp-list">
                { emp.map( emp => ( 
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