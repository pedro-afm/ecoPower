import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Navbar from './Navbar/Navbar';
import Chart from 'chart.js/auto';
import { Container, Row, Col } from 'react-bootstrap'
import useUserData from '../Hooks/useUserData';

const UserDetails = () => {
  const [data, setData] = useState(null); // Initialize data as null
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState('');
  const userInformation = useUserData();
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use 'category' para X-axis scale
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Charging Price (EUR)',
        },
      },
    },
  };


  useEffect(() => {

    const chargingData = [
      { date: '2023-01-01', price: 20 },
      { date: '2023-01-02', price: 15 },
      { date: '2023-01-03', price: 18 },
      { date: '2023-01-04', price: 25 },
      { date: '2023-01-05', price: 30 },
    ];

    const chartData = {
      labels: chargingData.map((entry) => entry.date),
      datasets: [
        {
          label: 'Charging Price (EUR)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: [ // Cores diferentes para o contorno de cada barra
            'rgba(255, 0, 0, 1)', // Vermelho
            'rgba(0, 255, 0, 1)', // Verde
            'rgba(0, 0, 255, 1)', // Azul
            'rgba(255, 255, 0, 1)', // Amarelo
            'rgba(255, 0, 255, 1)', // Magenta
          ],
          borderWidth: 1,
          data: chargingData.map((entry) => entry.price),
        },
      ],
    };

    setData(chartData);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDataFromLocalStorage(parsedData.name);
    }
    console.log(userInformation)
  }, [])

  if (!data) {
    // Render a loading message or return null while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar /> {/* Make sure Navbar is imported and working correctly */}
      <h1 style={{ marginTop: '20px' }}>Hello {dataFromLocalStorage}</h1>
      <Container>
        <Bar data={data} options={chartOptions} style={{ marginTop: '-250px' }} />
      </Container>
    </div>
  );
};

export default UserDetails;
