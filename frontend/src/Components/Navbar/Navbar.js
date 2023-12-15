import ecoPower from '../../Images/ecoPower_semfundo.png';
import './Navbar.css';
import ButtonLogOut from '../Button/ButtonLogout';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const token = useSelector((state) => state.auth.token);
    const linkClass = token ? 'loggedInLink' : 'loggedOutLink';
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <nav style={{ margin: '0', border: '0', padding: '0', display: 'flex', alignItems: 'center', borderBottom: '1px solid #c0c0c0' }}>
            <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', width: '100%', margin: '0', border: '0', padding: '0' }}>
                <li><Link to='/'><img src={ecoPower} alt="ecoPower" style={{ width: '180px', marginLeft: '150px' }}></img></Link></li>
                <li style={{marginLeft: '40px', marginRight: '40px'}}>
                    {token ? '' : <Link to='/about' className={linkClass} >About</Link>}
                </li>
                <li>
                    {token ? '' : <Link to='/contact' className={linkClass}>Contact</Link>}
                </li>
                <li style={{marginLeft: 'auto'}}>
                    {token && pathName === '/'  ?  <Link to='/map-area' className={linkClass}>My area</Link> : ''}
                </li>
                <li style={{marginLeft: 'auto', textAlign:'right'}}>
                    {token && pathName === '/map-area' ? <Link to='user-details' className={linkClass}>User details</Link> : ''}
                </li>
                <li style={{ marginLeft: '30px', textAlign: 'right', marginRight: '50px'}}>
                    {token ? <ButtonLogOut /> : <Link to='/login' className={linkClass}>SignIn</Link >}
                </li>
                <li style={{ textAlign: 'right', marginRight: '150px' }}>
                    {token ? '' : <Link to='/signup' className={linkClass}>SignUp</Link>}
                </li>
            </ul>
        </nav>
    )
}
