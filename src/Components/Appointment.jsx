import { Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import DropdownBarbers from './Dropdown';
import Schedule from './Schedule';


function Appointment() {
  const [users, setUsers] = useState([])
  const [schedule, setSchedule] = useState([])
  const [selectedTs, setTimeSlot] = useState([0])
  const [selectedUserId, setSelectedUserId] = useState(0);


  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:5001/users');
      const data = await response.json();
      const filteredUsers = data.filter(user => user.Role === 'Barber');

      setUsers(filteredUsers);
    }
    fetchUsers();


  }, []);

  function transformArray(arr) {
    const transformedArray = [];
    const numRows = arr.length;
    let maxNumCols = 0;
  
    // Find the maximum number of columns in the input array
    for (let row = 0; row < numRows; row++) {
      const numCols = arr[row].length;
      if (numCols > maxNumCols) {
        maxNumCols = numCols;
      }
    }
  
    // Iterate over each column and populate the transformed array
    for (let col = 0; col < maxNumCols; col++) {
      const column = [];
      for (let row = 0; row < numRows; row++) {
        const element = arr[row][col];
        if (element !== undefined) {
          column.push(element);
        }
        else {
          column.push(undefined)
        }
      }
      transformedArray.push(column);
    }
  
    return transformedArray;
  }

  async function fetchTimeSlots(dayId) {
    const response = await fetch(`http://localhost:5004/timeslots/${dayId}`)
    .catch(error => {
      console.log("There is nothing to fetch", error)
    })

    const timeslots = await response.json()
    
    if(!timeslots){
      return
    }
    
    return timeslots
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
    
    for (const day of days) {
      day.timeslots = await fetchTimeSlots(day.id);
    }

    return days
  }

  function getFinishedSchedule(userId) {
    fetchSchedule(userId).then((schedule) => {
      const correctSchedule = transformArray(schedule.map(d => d.timeslots))

      correctSchedule.unshift(schedule.map(d => d.date))
      console.log(correctSchedule)
      setSchedule(correctSchedule)
    })

  }

  function setSelectedTimeslot(value) {
    setTimeSlot(value)
    console.log(value)
  }

  // function getTitle(userId) {
  //   const selectedUser = users.find((user) => user.Id === userId);
  //   return selectedUser ? selectedUser.Name : 'Dropdown button';
  // }
  return (
    <Row>
      <Col>
      <Schedule
        schedule={schedule}
        selectedTs={selectedTs}
        setSelectedTimeslot={setSelectedTimeslot}
      />
      </Col>
      <Col>
        <Table>
          <tbody>
            <tr>
              <td><p>Your timeslot: <b>{selectedTs.startDate} - {selectedTs.endDate}</b></p></td>
            </tr>
            {/* <tr>
              <td>{selectedTs.id}</td>
            </tr> */}
            {/* <tr>
              <td></td>
            </tr> */}
          </tbody>
        </Table>
        <DropdownBarbers
          users={users}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          getFinishedSchedule={getFinishedSchedule}
          setTimeSlot={setTimeSlot}
          selectedTs={selectedTs}
        />

        <Link to={`/userinformation?barberId=${selectedUserId}&timeslotId=${selectedTs.id}`}>
          <Button variant="outline-dark">Choose the timeslot</Button>
        </Link>
      </Col>
    </Row>
  );
}

export default Appointment;
