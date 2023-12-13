import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import ConfirmationComponent from './Components/ConfirmationComponent/ConfirmationComponent';
import PrivateRoutes from './Router/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
          <Router>
            <Routes>
              <Route path='/signup' element={<RegisterComponent />} />
              <Route path='/confirmation' element={<ConfirmationComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route element={<PrivateRoutes token={token}/>}>
                <Route element={<MyMapComponent/>} path="/user-area"></Route>
              </Route>
            </Routes>
          </Router>
  );  
}

export default App;
