import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useParams} from "react-router-dom";


function Appointment() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:5001/users');
      const data = await response.json();
      const filteredUsers = data.filter(user => user.Role === 'Barber');

      setUsers(filteredUsers);
    }
    fetchUsers();
  }, []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Choose barber
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {users.map((user) => (
          <Link to={`/userinformation/${user.Id}`}>
          <Dropdown.Item>{user.Name}</Dropdown.Item>
        </Link>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Appointment;
