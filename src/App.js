import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
// import Asdf from './Components/Asdf'
import AppointmentPage from './Pages/AppointmentPage'
import HomePage from './Pages/HomePage'
import UserInformation from './Pages/UserInformation'
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/appointment/:id' element={<AppointmentPage/>}></Route>
        <Route path="/userinformation/:id" element={<UserInformation/>} />      </Routes>
      {/* <HomePage/>
      <AppointmentPage/> */}
    </div>
  );
}

export default App;
