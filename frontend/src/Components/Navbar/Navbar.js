import ecoPower from '../../Images/ecoPower_semfundo.png';
import './Navbar.css';
import ButtonLogOut from '../Button/ButtonLogout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar (){
    const token = useSelector((state) => state.auth.token);
	
    return (
       <nav style={{ margin: '0', border: '0', display: 'flex', alignItems: 'center', borderBottom: '1px solid #c0c0c0'}}>
            <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', width: '100%' }}>
                <li><Link to='/'><img src={ecoPower} alt="ecoPower" style={{ width: '180px', marginLeft:'100px'}}></img></Link></li>
                <li>
					{token ? '' : <Link to='/about'>About</Link>}
				</li>
                <li>
					{token ? '' : <Link to='/contact'>Contact</Link>}
				</li>
                <li style={{ marginLeft: 'auto', textAlign: 'right' , marginRight:'100px'}}>
                    {token ? <ButtonLogOut /> : <Link to='/login'>Login</Link>}
                </li>
            </ul>
       </nav>
    )
}
