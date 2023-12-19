import { useState, useEffect } from "react";

const useUserMail = (() => {
    const [storedUserMailData, setStoredUserMailData] = useState('');
    const user = localStorage.getItem('user');
    
    useEffect(() => {
        if (user) {
            const parsedUser = JSON.parse(user);
            setStoredUserMailData(parsedUser.email); // Defina storedUserMailData aqui
        }
        
    }, [user])
    
    return storedUserMailData;
})

export default useUserMail;