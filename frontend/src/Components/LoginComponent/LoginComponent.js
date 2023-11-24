import React, {useReducer, useState} from "react";
import './LoginComponent.css'

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fetchUserData = async () => {
        const response = await fetch('http://localhost:8080/api/Login', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
        if (!response.ok){
            throw new Error ('Failed fetching data')
        }
        const validity = await response.json();
        if (!validity){
            console.log('Your account or password is incorrect. Try again')
        }
        
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = await fetchUserData()
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Usuário</label>
                <input type="text"
                       id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                      type="text"
                      id="password"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                >
                </input>
            </div>
        </form>
    )
}

export default LoginComponent;