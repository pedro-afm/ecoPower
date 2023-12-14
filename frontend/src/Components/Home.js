import React from 'react';
import Navbar from './Navbar/Navbar';
import planoDeFundo from '../Images/planoDeFundo.png';
import './Home.css'; // Estilo CSS personalizado para o componente Home

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={{display:'flex'}} className="image-container">
                <img style={{width:'100%', height:'70%'}} src={planoDeFundo} alt="Plano de Fundo" />
                <div className="overlay"></div>
            </div>
        </div>
    );
};

export default Home;
