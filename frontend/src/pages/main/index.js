import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit, FiUserPlus } from 'react-icons/fi';
import moment from 'moment';

import api from '../../services/api';
import Header from '../../Components/Header';
import ModalCRUD from '../../Components/ModalCRUD';

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
        emplist: [],
        showModal: false,
        idEmployeer: 0,
    }

    componentDidMount(){
        this.loadEmployees();
    }

    toggleModal = (refresh = false) => {  
        this.setState({ showModal: !this.state.showModal });
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

    async handleEdit(id){
        await this.setState({ idEmployeer: id });
        this.toggleModal();
    }

    async handleNew(){
        await this.setState({ idEmployeer: null });
        this.toggleModal();
    }

    async handleDelete(id){

        if (window.confirm('Are you sure you want to delete this employeer?')) {
            try{
                await api.delete(`/employee/${id}`);
                this.loadEmployees();
            }catch(err) {
                console.error( 'error:', err);
                return toast.error('Unable to delete');
            } 
        } 

    }

    render(){

        const { emplist } = this.state;
        

        return (
            
            <div className="emp-list">
                <Header />
                    <button 
                        onClick={ () => this.handleNew() } >
                        <FiUserPlus size={18} color="#ffffff" />
                    </button>
                    <ModalCRUD 
                        isOpen={this.state.showModal} 
                        toggle={this.toggleModal} 
                        idEmployeer={this.state.idEmployeer} 
                    />
                { emplist.map( emp => ( 
                <article key={emp.id}>
                    <div id="div-img">
                        <img alt="" src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650_960_720.png" ></img>
                    </div>
                    <div id="emp-info">
                        ({emp.id}) <strong>{emp.last_name}, {emp.first_name}</strong>
                        <p>{moment(emp.birth_date).format('DD.MM.YYYY')}</p>
                        <p>{emp.id_area}</p>
                        <p>{emp.id_nationality}</p>
                    </div>
                    <button>
                    {/* !!! VERY IMPORTANT. Need to usa Arrow function here. Because if it is not used
                        when the HTML is loaded the function will be executed immedialty,
                        deleting every ITEM!!! */}
                        <FiTrash2 size={20} color="#ffffff" onClick={ () => this.handleDelete(emp.id)} />
                    </button>

                    <button>
                        <FiEdit size={20} color="#ffffff" onClick={ () => this.handleEdit(emp.id)} />
                    </button>
                </article>
                )) }
                
            </div>
        );
    }

}