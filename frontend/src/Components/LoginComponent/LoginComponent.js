import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../CSS/sign.css';
import { setCredentials } from '../../TokenReducer/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../TokenReducer/authSlice';

const LoginComponent = ()=>{
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        if (token) {
          console.log('Token armazenado:', token);
          navigate('/user-area');
        } else {
          console.log('Token não encontrado no estado Redux');
        }
      }, [token]);

    const onSubmit = async (e)=>{
        console.log({username, password });
        e.preventDefault();
        try{ //mudar o link do fetch para o meu este é o do professor
            const reply = await fetch('https://o03b0mlzdi.execute-api.eu-north-1.amazonaws.com/ecoPowerDev/auth',
            {
                method: 'POST',
                body: JSON.stringify({
                    "username": username,
                    "password": password
                  }),
                  headers:{
                    'Content-type':'application/json'
                  }
            }
            );
            const data = await reply.json();
            console.log(data);
            if(data.statusCode===200) {
                console.log("eu aqui")
                try {
                    dispatch(setCredentials({token: data.body.AuthenticationResult.IdToken}));
                    navigate('/user-area');
                } catch (e){
                    console.error("error: " + e);
                }
                
            }
            else setMessage("Message bb: "+data.body.name);
        }catch(e){
            setMessage("Message aa: "+JSON.stringify(e));
        }
    }

   

    return (
        <div className="container">
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
        </div>
    );
}

export default LoginComponent;