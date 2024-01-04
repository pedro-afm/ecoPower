import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Navbar from './Navbar/Navbar';
import Chart from 'chart.js/auto';
import { Container, Row, Col } from 'react-bootstrap'
import useUserData from '../Hooks/useUserData';
import { format } from 'date-fns';

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
          text: 'Charging Price (EUR) / Energy Consumption (kWh)',
        },
      },
    },
  };

  useEffect(() => {
    const userData = localStorage.getItem("userDetails")
    const parsedData = JSON.parse(userData);
    const chargingData = parsedData[0].chargers;
    console.log(chargingData)
    const dates = chargingData.map((entry) => entry.date);
    const energies = chargingData.map((entry) => entry.energy);
    const prices = chargingData.map((entry) => entry.price);

    // Criar o conjunto de dados para o gráfico
    const chartData = {
      labels: dates.map((date) => format(new Date(date), 'MM-dd-yyyy')),
      datasets: [
        {
          label: 'Price',
          data: prices,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
          borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
          borderWidth: 1, // Largura da borda das barras
        },
        {
          label: 'Energy Consumption',
          data: energies,
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo das barras
          borderColor: 'rgba(255, 99, 132, 1)', // Cor da borda das barras
          borderWidth: 1, // Largura da borda das barras
        },
      ],
    };

    // Configurações do gráfico
    const chartOptions = {
      scales: {
        x: {
          type: 'time', // Configura o eixo X como um eixo de tempo
          time: {
            unit: 'month', // Define a unidade de tempo (pode ser ajustada de acordo com a granularidade dos seus dados)
            tooltipFormat: 'll', // Formato da dica de ferramenta ao passar o mouse sobre as barras
          },
          title: {
            display: true,
            text: 'Data',
          },
        },
        y: {
          beginAtZero: true, // Comece o eixo Y a partir de zero
          title: {
            display: true,
            text: 'Preço / Quantidade de Energia',
          },
        },
      },
    };
    setData(chartData);
  }, [])

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
        <Bar data={data} options={chartOptions}/>
      </Container>
    </div>
  );
};

export default UserDetails;
