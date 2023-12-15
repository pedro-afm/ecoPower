import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import planoDeFundo from '../Images/planoDeFundo.png';
import './Home.css'; // Estilo CSS personalizado para o componente Home

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', position: 'relative' }} className="image-container">
                <img style={{ width: '100%', height: '70%' }} src={planoDeFundo} alt="Plano de Fundo" />
                <div className="overlay"></div>
                <div style={{ position: 'absolute', top: '13%', left: '50%', transform: 'translate(-80%, -50%)', color: '#bbb', padding: '10px' }}>
                    <h1 style={{color:'white', fontSize: '60px'}}>The future is coming</h1>
                    <p>Descrição ou conteúdo adicional</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
