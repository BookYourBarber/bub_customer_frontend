import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function UserInformation() {
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const barberId = searchParams.get('barberId');
  const timeslotId = searchParams.get('timeslotId');

  console.log(barberId)
  console.log(timeslotId)

  const { id } = useParams()

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [barberName, setBarberName] = useState(''); 
  // const [barberAddress, setBarberAddress] = useState(''); 
  const [barberPhoneNr, setBarberPhoneNr] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}`);
    console.log(`Surname: ${surname}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
  };
  async function fetchUserById (id){
    const response = await fetch(`http://localhost:5001/users/${id}`);
    const data = await response.json();

    setBarberName(data.Name)
    // setBarberAddress(data.Address)
    setBarberPhoneNr(data.PhoneNr)
    console.log(data)
  }
  fetchUserById(barberId)

  function postAppointment() {
    const apiUrl = 'http://localhost:5003/appointments';
  
    const requestData = {
      timeslot_id: timeslotId,
      customer_id: barberId,
    };
  
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log(response.data);
        // Handle response data
      })
      .catch((error) => {
        console.log(error.message);
        // Handle error
      });
  }



  return (
    <Row>
      <Col>
        <label>
          Id: {barberId}
        </label>
        <br />
        <label>
          Name: {barberName}
        </label>
        <br />
        <label>
          Nr: {barberPhoneNr}
        </label>
      </Col>
      <Col>
        <form onSubmit={handleSubmit}>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Surname:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <button type="submit" onClick={postAppointment}>Submit</button>
      </form> 
      </Col>
    </Row>
  );
}

export default UserInformation;
