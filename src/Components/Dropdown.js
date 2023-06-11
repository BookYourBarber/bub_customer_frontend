import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from './DropdownItem';

function DropdownBarbers({users, selectedUserId, setSelectedUserId, getFinishedSchedule, setTimeSlot, selectedTs}) {
    
    function getTitle(userId) {
        const selectedUser = users.find((user) => user.Id === userId);
        return selectedUser ? selectedUser.Name : 'Dropdown button';
      }

      return (
        // <div class="dropdown">
        //   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        //     Dropdown button
        //   </button>
        //   <ul class="dropdown-menu">
        //     <li><a class="dropdown-item" href="#">Action</a></li>
        //     <li><a class="dropdown-item" href="#">Another action</a></li>
        //     <li><a class="dropdown-item" href="#">Something else here</a></li>
        //   </ul>
        // </div>
        <div className="dropdown" data-testid="dropdown-button">
          <a
            className="btn btn-secondary dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {getTitle(selectedUserId) ? getTitle(selectedUserId) : "Barbers"}
          </a>

          <ul className="dropdown-menu">
            {users.map((user) => (
              <li
                key={user.Id}
                data-testid="dropdown-item"
                onClick={() => {
                  setSelectedUserId(user.Id);
                  getFinishedSchedule(user.Id);
                  setTimeSlot('');
                }}
              >
                <a className="dropdown-item">
                  {user.Name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        // <DropdownButton
        //   id="dropdown-basic-button"
        //   title={getTitle(selectedUserId)}
        //   data-testid="dropdown-button"
        // >
        //   {users.map((user) => (
        //     <Dropdown.Item
        //       data-testid="dropdown-item"
        //       key={user.Id}
        //       onClick={() => {
        //         setSelectedUserId(user.Id);
        //         getFinishedSchedule(user.Id);
        //         setTimeSlot('');
        //       }}
        //     >
        //       {user.Name}
        //     </Dropdown.Item>
        //   ))}
        // </DropdownButton>
      );
    }

export default DropdownBarbers;