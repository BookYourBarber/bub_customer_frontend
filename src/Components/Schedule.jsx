import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moment from 'moment'

function Schedule({schedule, selectedts, setSelectedTimeslot}) {


return(
    <Table striped bordered>
      <tbody>
        { schedule.map((day, index) => (
          <tr>
            { index  === 0 ? 
              day.map(d => (
                <td>{moment(d).format('dddd')}</td>
              ))
              :
              day.map((ts) => 
                ( ts !== undefined ? 
                <td onClick={() => setSelectedTimeslot(ts)} style={{cursor: 'pointer'}}>{ts.startDate} - {ts.endDate}</td>
                :
                <td>-</td>
                )
              )
            }
          </tr>
        ))}
      </tbody>
    </Table>
    )
}

export default Schedule;