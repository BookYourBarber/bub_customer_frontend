import React from 'react';

function DropdownBarbers({users, selectedUserId, setSelectedUserId, getFinishedSchedule, setTimeSlot, selectedTs}) {
    
    function getTitle(userId) {
        const selectedUser = users.find((user) => user.Id === userId);
        return selectedUser ? selectedUser.Name : 'Dropdown button';
      }

      return (
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
      );
    }

export default DropdownBarbers;