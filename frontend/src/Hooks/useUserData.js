import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState([]);
  const [storedUserMailData, setStoredUserMailData] = useState('');
  const user = localStorage.getItem('user');
  useEffect(() => {
    const fetchUserInformation = async () => {
      if (user) {
        const parsedUser = JSON.parse(user);
        setStoredUserMailData(parsedUser.email); // Defina storedUserMailData aqui
      }
      console.log(storedUserMailData)
      try {
        const params = new URLSearchParams();
        params.append('parametro', storedUserMailData); // Use storedUserMailData aqui
        const response = await fetch(`http://localhost:8081/api/getUserInformation?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }
        const userInformation = await response.json();
        setUserData(userInformation);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUserInformation();
  }, [user, storedUserMailData]); // Adicione user e storedUserMailData como dependências

  return userData;
};

export default useUserData;
