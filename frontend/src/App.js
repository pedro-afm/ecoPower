import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyMapComponent from './Components/MyMapComponent/MyMapComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import ConfirmationComponent from './Components/ConfirmationComponent/ConfirmationComponent';
import AuthProvider  from './TokenReducer/AuthProvider';
import ProtectedRoute from './Router/guardRouter'; // Importe o componente ProtectedRoute aqui

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <AuthProvider token={token}>
        <Routes>
          <Route path='/signup' element={<RegisterComponent />} />
          <Route path='/confirmation' element={<ConfirmationComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/user-area" element={<MyMapComponent />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
