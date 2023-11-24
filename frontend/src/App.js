import './App.css';
import {RoutherProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import { StrictMode } from 'react';


function App() {
  return (
      <MyMapComponent>
      </MyMapComponent>
  );
}

export default App;
