import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../TokenReducer/authSlice';
import { useNavigate} from 'react-router-dom';

const ButtonLogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/login');
    };

    return (
        <button onClick={handleLogOut}>Logout</button>
    );
};

export default ButtonLogOut;