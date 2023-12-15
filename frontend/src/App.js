import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import ConfirmationComponent from './Components/ConfirmationComponent/ConfirmationComponent';
import PrivateRoutes from './Router/PrivateRoute';
import Home from './Components/Home'
import { useSelector } from 'react-redux';
import UserDetails from './Components/UserDetails';

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
          <Router>
            <Routes>
              <Route path='/signup' element={<RegisterComponent />} />
              <Route path='/confirmation' element={<ConfirmationComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path='/' element={<Home />} />
              <Route element={<PrivateRoutes token={token}/>}>
                <Route element={<MyMapComponent/>} path="/map-area"></Route>
                <Route element={<UserDetails/>} path="/user-details"></Route>
              </Route>
            </Routes>
          </Router>
  );  
}

export default App;
