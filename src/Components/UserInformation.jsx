import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ExampleForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Name: ${name}`);
    console.log(`Surname: ${surname}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default ExampleForm;
