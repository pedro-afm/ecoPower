import {useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import '../CSS/sign.css'


const ConfirmationComponent = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch ('https://o03b0mlzdi.execute-api.eu-north-1.amazonaws.com/ecoPowerDev/confirmation', 
            {
                method: 'POST',
                body: JSON.stringify({
                    "username": location.state.username,
                    "code": code
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()
            if(data.statusCode === 200) navigate('/login')
            else setMessage("Message: " +data.body.name)
        } catch (e) {
            setMessage("Message: "+ JSON.stringify(e))
        }
    }

    return (
        <div className="container">
            <div className="confirmation">
                <h2>Confirmation</h2>
                <form className="confirmationform" onSubmit={onSubmit}>
                    <input
                        placeholder="Code"
                        type="number"
                        className="formInput"
                        id="code"
                        value={code}
                        required
                        onChange={(e)=>setCode(e.target.value)}
                    />
                    <p className='alert'>{message}</p>
                    <button className="codeBtn">Confirm</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmationComponent