import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = ()=>{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e)=>{
        console.log({username, password });
        e.preventDefault();
        try{ //mudar o link do fetch para o meu este é o do professor
            const reply = await fetch('https://yg6ll70830.execute-api.eu-north-1.amazonaws.com/development/auth',
            {
                method: 'POST',
                body: JSON.stringify({
                    "nickname": username,
                    "password": password
                  }),
                  headers:{
                    'Content-type':'application/json'
                  }
            }
            );
            const data = await reply.json();
            console.log(data);
            if(data.statusCode===200) navigate('/deeper', {state:{token:data.body.AuthenticationResult.IdToken}});
            else setMessage("X:"+data.body.name);
        }catch(e){
            setMessage("Y:"+JSON.stringify(e));
        }
    }

    return (
        <div className="signcontainer">
            <h2>Sign In</h2>
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
                <p className="alert">{message}</p>
                <button className="signBtn">Sign in</button>
                <p>
                    Ainda não tenho conta <Link to='/signup'>SignUp</Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;