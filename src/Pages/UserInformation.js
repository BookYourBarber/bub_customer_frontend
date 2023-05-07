import '../App.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserInformation from '../Components/UserInformation'
// import AppointmentPage from './Components/Appointment'

function App() {
  return (
    <div className="App">
      <Header/>
      <UserInformation/>
      <Footer/>
    </div>
  );
}

export default App;