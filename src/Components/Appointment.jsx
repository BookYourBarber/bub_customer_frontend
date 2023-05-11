import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useParams} from "react-router-dom";
import moment from 'moment'


function Appointment() {
  const {id} = useParams()
  const [users, setUsers] = useState([])
  const [schedule, setSchedule] = useState([])
  const [timeslot, setTimeslot] = useState([])
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:5001/users');
      const data = await response.json();
      const filteredUsers = data.filter(user => user.Role === 'Barber');

      setUsers(filteredUsers);
    }
    fetchUsers();


  }, []);

  async function fetchTimeSlots(dayId) {
    const response = await fetch(`http://localhost:5004/timeslots/${dayId}`)
    .catch(error => {
      console.log("There is nothing to fetch", error)
    })

    const timeslots = await response.json()
    
    if(!timeslots){
      return
    }
    

    setTimeslot(prevList => [...prevList, timeslots])
    console.log(timeslot)

  }

    async function fetchSchedule(userId) {
      const response = await fetch(`http://localhost:5002/schedule/${userId}`)
      .catch(error =>{
        console.log("This user does not have a schedule", error)
      })
      
      const days = await response.json()
  
      if(!days){
        return;
      }
      // console.log(data)
      setSchedule(days)
      // fetchTimeSlots(data.day_id)
      // console.log(data.day_id)

      
      days.forEach(obj => {
        fetchTimeSlots(obj.day_id)
        // console.log(obj)
      })
    }
    

  return (
    <Row>
       <Col>
     {/* </Col>  {/* <Table striped bordered hover>
       <thead>
      <tr>
        <th>Days</th>
        {schedule.map(item => (
          //iso format
          <>
            {/* {/ <td>{new Date(item.date).toLocaleDateString("en-US", {weekday: "long"})}</td> /} */}
            {/* <td>{item.day_id}<br></br>{moment(item.date).format('dddd')} <br></br> {moment(item.date).format('DD.MM.YYYY')}</td>
            {setTimeslot([])} */}
          {/* </>
        ))}
      </tr>
      </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
    </Table> */} 
    <Table striped bordered hover>
      <tr>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wen</th>
        <th>Thu</th>
        <th>Fri</th>
      </tr>
      <tr>
        <td></td>
        <Link to={"/userinformation/1"}><td>9am-sads10am</td></Link>
        <Link to={"/userinformation/1"}><td>9am-10am</td></Link>
        <Link to={"/userinformation/1"}><td>9am-10am</td></Link>
        <Link to={"/userinformation/1"}><td>9am-10am</td></Link>
      </tr>
      <tr>
      <Link to={"/userinformation/1"}><td>10am-11am</td></Link>
      <Link to={"/userinformation/1"}><td>10am-11am</td></Link>
        <td></td>
        <td></td>
        <Link to={"/userinformation/1"}><td>10am-11am</td></Link>
        <td></td>
      </tr>
      <tr>
      <Link to={"/userinformation/1"}><td>11am-12pm</td></Link>
        <td></td>
        <Link to={"/userinformation/1"}><td>11am-12pm</td></Link>
        <Link to={"/userinformation/1"}><td>11am-12pm</td></Link>
        <td></td>
        <Link to={"/userinformation/1"}><td>11am-12pm</td></Link>
      </tr>
      <tr>
      <Link to={"/userinformation/1"}> <td>12pm-1pm</td></Link>
      <Link to={"/userinformation/1"}> <td>12pm-1pm</td></Link>
        <td></td>
        <td></td>
        <Link to={"/userinformation/1"}> <td>12pm-1pm</td></Link>
        <Link to={"/userinformation/1"}> <td>12pm-1pm</td></Link>
      </tr>
    </Table>
       </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose barber
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {users.map((user) => (
              // <Link to={`/userinformation/${user.Id}`}>
                <Dropdown.Item onClick={ () => {fetchSchedule(user.Id); setTimeslot([])}}>{user.Name}</Dropdown.Item>
              // </Link>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="outline-dark">Choose the timeslot</Button>
      </Col>
    </Row>
  );
}

export default Appointment;
