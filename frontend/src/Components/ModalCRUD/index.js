import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

toast.configure({
    autoClose: 8000,
    draggable: true,
    hideProgressBar: true,
    position: "top-center"
  });

export default function ModalCRUD(props){

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState();
    const [idArea, setIdArea] = useState('');
    const [IdNationality, setIdNationality] = useState('');

    const handleInsert = async (e) => {
    // async function handleInsert(e){
        e.preventDefault();

        await api.post('/employee', {
            last_name: firstName,
            first_name: lastName,
            birth_date: birthDate,
            id_area: idArea,
            id_nationality: IdNationality
        } ).then( (response) => {
            // console.log('==>>>', response.data.insertId);
            toast.success('Success ', response.data.insertId);
            window.location.reload(false);
            props.toggle();
            history.push('/Main');           
        }).catch( (error) => {
            console.log('Error: ', error.response.data.error);

            toast.error('Error');
            
            history.push('/Main'); 
            props.toggle();
        })
 
    }

    return(
        
        <div className="modal">
            <Modal
                isOpen={ props.isOpen }
                // onAfterOpen={afterOpenModal}
                // onRequestClose={ handleClose }
                // style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal" >
                    <h1>Employee Register</h1>
                    <form onSubmit={ handleInsert }>
                        <label htmlFor="firstName">First Name:
                        <input 
                            name="firstName" 
                            placeholder="First Name"
                            value={firstName}
                            size="80"
                            onChange={ e => setFirstName(e.target.value) }
                            type="text"
                        />
                        </label>

                        <label htmlFor="lastName">Last Name:
                        <input 
                            name="lastName" 
                            placeholder="Last Name"
                            value={lastName}
                            size="80"
                            onChange={ e => setLastName(e.target.value) }
                            type="text"
                        />
                        </label>

                        <label htmlFor="birthDate">Birth Date:
                        <input 
                            name="birthDate" 
                            placeholder="Birth Date"
                            value={birthDate}
                            size="10"
                            onChange={ e => setBirthDate(e.target.value) }
                            type="Date"
                        />
                        </label>

                        <label htmlFor="idArea">Area:
                        <input 
                            name="idArea" 
                            placeholder="Area"
                            value={idArea}
                            size="30"
                            onChange={ e => setIdArea(e.target.value) }
                            type="text"
                        />
                        </label>

                        <label htmlFor="IdNationality">Nationality:
                        <input 
                            name="IdNationality" 
                            placeholder="Nationality"
                            value={IdNationality}
                            onChange={ e => setIdNationality(e.target.value) }
                            type="text"
                        />
                        </label>

                        <button onClick={props.toggle}>close</button>
                        <button type="submit">Save</button>
                    </form>
                </Modal>  
        </div>
        
    )
}

