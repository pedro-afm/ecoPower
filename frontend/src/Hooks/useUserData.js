import { useState, useEffect } from 'react';

const useUserData = (userMail) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserInformation = async () => {
      if(!userMail){
        return;
      }
      
      try {
        const params = new URLSearchParams();
        params.append('parametro', userMail); // Use storedUserMailData aqui
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
  }, [userMail]); // Adicione user e storedUserMailData como dependências

  return userData;
};

export default useUserData;
