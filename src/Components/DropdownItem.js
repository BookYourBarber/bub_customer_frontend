import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';


function DropdownItem({setSelectedUserId, getFinishedSchedule, setTimeSlot, user}) {
    
    
    return( <Dropdown.Item
      data-testid="dropdown-item"
      key={user.Id}
      onClick={() => {
        setSelectedUserId(user.Id);
        getFinishedSchedule(user.Id);
        setTimeSlot('');
      }}
    >
    {/* <div id={`barber-${user.Id}`}> */}
      {user.Name}
    {/* </div> */}
    </Dropdown.Item>
)}

export default DropdownItem;