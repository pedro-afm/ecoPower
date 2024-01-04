import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../CSS/sign.css';
import { setCredentials } from '../../TokenReducer/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser } from '../../TokenReducer/authSlice';
import useUserData from '../../Hooks/useUserData';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const userChargingInformation = useUserData(username); // Chame o hook aqui com os dados necessários

  useEffect(() => {
    if (token) {
      console.log('Token armazenado:', token);
      navigate('/map-area');
    } else {
      console.log('Token não encontrado no estado Redux');
    }
  }, [token, navigate]);

  const onSubmit = async (e, userChargingInformation) => { // Passe userChargingInformation como argumento
    console.log({ username, password });
    e.preventDefault();
    try {
      const reply = await fetch('https://o03b0mlzdi.execute-api.eu-north-1.amazonaws.com/ecoPowerDev/auth', {
        method: 'POST',
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });
      const data = await reply.json();
      console.log(data);
      if (data.statusCode === 200) {
        console.log("eu aqui")
        try {
          const decodedToken = JSON.parse(atob((data.body.AuthenticationResult.IdToken).split('.')[1]));

          const user = {
            address: decodeURIComponent(decodedToken.address.formatted),
            username: decodedToken['cognito:username'],
            email: decodedToken.email,
            name: decodedToken.name,
          }

          dispatch(setCredentials(
            {
              token: data.body.AuthenticationResult.IdToken,
              user: user,
              userChargingInformation: userChargingInformation
            }
          ));
        } catch (e) {
          console.error("error: " + e);
        }

      }
      else setMessage("Message bb: " + data.body.name);
    } catch (e) {
      setMessage("Message aa: " + JSON.stringify(e));
    }
  }

  return (
    <div className="container">
      <div className="signcontainer">
        <h2>Sign In</h2>
        <form className="signform" onSubmit={(e) => onSubmit(e, userChargingInformation)}>
          <input
            placeholder="Username"
            className="formInput"
            type="text"
            id="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className="formInput"
            type="password"
            id="password"
            minLength={6}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
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
