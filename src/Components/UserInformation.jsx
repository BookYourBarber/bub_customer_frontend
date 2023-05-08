import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';


function ExampleForm() {
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
  async function fetchUserById (){
    const response = await fetch(`http://localhost:5001/users/${id}`);
    const data = await response.json();

    setBarberName(data.Name)
    // setBarberAddress(data.Address)
    setBarberPhoneNr(data.PhoneNr)
    console.log(data)
  }
  fetchUserById()

  return (
    <Row>
      <Col>
        <label>
          Id: {id}
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
        <Link to="/"><button type="submit">Submit</button></Link>
      </form> 
      </Col>
    </Row>
  );
}

export default ExampleForm;
