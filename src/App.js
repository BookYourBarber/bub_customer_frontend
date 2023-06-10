import './App.css';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Asdf from './Components/Asdf'
import AppointmentPage from './Pages/AppointmentPage'
import HomePage from './Pages/HomePage'
import UserInformation from './Pages/UserInformation'
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Components/Login';
import Logout from './Components/Logout';

function App() {
  const { isAuthenticated, user, isLoading, error } = useAuth0();

  if (isLoading) {
    // You can show a loading spinner or placeholder while Auth0 is checking the authentication state
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle any error that occurred during authentication
    return <div>Error: {error.message}</div>;
  }

  // const onRedirectCallback = (appState) => {
  //   // You can add your custom logic here if needed
  //   console.log("onRedirectCallback called with appState:", appState);
  // };

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment/:id" element={<AppointmentPage />} />
          <Route path="/userinformation" element={<UserInformation />} />
        </Routes>
        {/* {console.log(isAuthenticated)}
        {isAuthenticated ? (
          <>
            <Logout /> 
            <p>Hello {user.given_name}</p>
          </>
        ):
          <Login/>
        } */}
      </div>
  );
}

export default App;
