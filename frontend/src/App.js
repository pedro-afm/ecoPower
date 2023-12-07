import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import { createContext, StrictMode } from 'react';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import ConfirmationComponent from './Components/ConfirmationComponent/ConfirmationComponent';

const router = createBrowserRouter([
  { path: '/', element: <LoginComponent></LoginComponent>},
  { path: '/registry', element: <RegisterComponent></RegisterComponent>},
  { path: '/confirmation', element: <ConfirmationComponent></ConfirmationComponent>},
  { path: '/', element: <MyMapComponent></MyMapComponent>}
])


function App() {
  return (
      <div className='container'>
        <RouterProvider router={router}/>
      </div>
  );
}

export default App;
