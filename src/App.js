import './App.css';

import AppointmentPage from './Pages/AppointmentPage'
import HomePage from './Pages/HomePage'
import UserInformation from './Pages/UserInformation'
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    // You can show a loading spinner or placeholder while Auth0 is checking the authentication state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle any error that occurred during authentication
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment/:id" element={<AppointmentPage />} />
          <Route path="/userinformation" element={<UserInformation />} />
        </Routes>
      </div>
  );
}

export default App;
