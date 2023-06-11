import React from 'react';
import { Table } from 'react-bootstrap';
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