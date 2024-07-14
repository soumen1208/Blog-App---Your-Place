import React from 'react'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='nav'>

            <div className='navLogo'>
                <p className='logoP'><span className='logo'>S</span>oumen's Blog</p>
            </div>

            <div className='navLink'>
                <Link to='/home' className='links'>Home</Link>
                <Link to='/blog' className='links'>Blog</Link>
                <Link to='/about' className='links'>AboutUs</Link>
                <Link to='/contact' className='links'>Contact</Link>
                <Link to='/user-login' className='links'>LogIn</Link>
            </div>


        </div>
    )
}

export default Navbar