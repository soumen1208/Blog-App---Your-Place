import React from 'react'
import '../Navbar/navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='nav'>

            <div className='navLogo'>
                <p className='logoP'><span className='logo'>Daily Spark</span></p>
            </div>

            <div className='navLink'>
                <Link to='/home' className='links'>HOME</Link>
                <Link to='/blog' className='links'>BLOG</Link>
                <Link to='/about' className='links'>ABOUTUS</Link>
                <Link to='/contact' className='links'>CONTACT</Link>
                <Link to='/user-login' className='links'>LOGIN</Link>
            </div>

        </div>
    )
}

export default Navbar