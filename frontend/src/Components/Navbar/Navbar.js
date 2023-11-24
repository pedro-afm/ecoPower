import ecoPower from '../../Images/ecoPower.png';
import Button from '../Button/Button';
import './Navbar.css'

export default function Navbar (){
    return (
        <div className='PrimaryNav '>
			<nav className='navbar navbar-expand-md background-color'>
				<div className='container-fluid me-5'>
					<div className='navbar-brand d-flex align-items-center logo'>
						<a href='/'>
							<img src={ecoPower} alt='ecoPower logo' style={{height:'100px', marginLeft:'40px'}}/>
						</a>
					</div>
					<button
						className='navbar-toggler'
						data-bs-toggle='collapse'
						data-bs-target='#navcol-2'
					>
						<span className='visually-hidden'>
							Toggle navigation
						</span>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div id='navcol-2' className='collapse navbar-collapse'>
						<ul className='navbar-nav ms-auto'>
							<li className='nav-item'>
								<a className='nav-link Typograph' href='/'>
									Home
								</a>
							</li>
							<li className='nav-item'>
								<a
									className='nav-link Typograph'
									href='/login'
								>
									Login
								</a>
							</li>
							<li className='nav-item'>
								<a
									className='nav-link Typograph'
									href='/about-us'
								>
									About Us
								</a>
							</li>
                            <li>
                                <Button name="Login"></Button>
                            </li>
						</ul>
					</div>
				</div>
			</nav>
		</div>

    )
}