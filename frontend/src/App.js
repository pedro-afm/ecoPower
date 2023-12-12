import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import ConfirmationComponent from './Components/ConfirmationComponent/ConfirmationComponent';
import PrivateRoute from './Router/PrivateRoute';
import { Provider, useSelector } from 'react-redux';
import store from './TokenReducer/store';

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path='/signup' element={<RegisterComponent />} />
              <Route path='/confirmation' element={<ConfirmationComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route
                path="/user-area"
                element={<MyMapComponent />}
              />
            </Routes>
          </BrowserRouter>
        </Provider>
  );  
}

export default App;
