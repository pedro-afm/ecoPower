import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterComponent = ()=>{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e)=>{
        e.preventDefault();
        console.log({username, password, email, name, address});
        try{ //mudar o link do fetch para o meu este é o do professor
            const reply = await fetch('https://o03b0mlzdi.execute-api.eu-north-1.amazonaws.com/ecoPowerDev',
            {
                method: 'POST',
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "name": name,
                    "address": address,
                    "password": password
                  }),
                  headers:{
                    'Content-type':'application/json'
                  }
            }
            );
            const data = await reply.json();
            console.log(data);
            if(data.statusCode===200) navigate('/confirm', {state:{username}});
            else setMessage("X:"+data.body.name);
        }catch(e){
            setMessage("Y:"+JSON.stringify(e));
        }
    }

    return (
        <div className="signcontainer">
            <h2>Sign Up</h2>
            <form className="signform" onSubmit={onSubmit}>
                <input
                    placeholder="Username"
                    type="text"
                    id="username"
                    value={username}
                    required
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    minLength={6}
                    value={password}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    placeholder="Email"
                    type="email"
                    id="email"
                    value={email}
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e)=>setName(e.target.value)}
                />
                <input
                    placeholder="Address"
                    type="text"
                    id="address"
                    value={address}
                    required
                    onChange={(e)=>setAddress(e.target.value)}
                />
                <p className="alert">{message}</p>
                <button className="signBtn">Sign up</button>
                <p>
                    Já tenho conta <Link to='/'>SignIn</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterComponent;