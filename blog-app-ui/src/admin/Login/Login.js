import React, { useState } from 'react'
import '../Login/login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true)
        console.log(userName, password);
        axios.post('http://localhost:3000/auth/admin/login', {
            userName: userName,
            password: password
        })
            .then(res => {
                setLoading(false)
                console.log(res.data);

                localStorage.setItem('email', res.data.email)
                localStorage.setItem('fullName', res.data.fullName)
                localStorage.setItem('token', res.data.token)

                navigate('/admin/dashboard')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='loginContainer'>
            <div className='loginbox'>
                <form onSubmit={submitHandler}>
                    <img alt='soumen-profile' className='profileImg' src={require('../../assets/IMG20220427092154.jpg')} ></img>
                    <h1 className='blogname'>Soumen's Blog</h1>
                    <div>
                        <input onChange={(e) => { setUserName(e.target.value) }} placeholder='user name'></input>
                        <input onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='password'></input>

                    </div>
                    <div className='btn'>
                        <button className='green' type='submit' > {loading && < CircularProgress size={20} color='inherit' style={{ marginRight: '10px' }} />} <span> Sign-in </span></button >
                        <p style={{ marginLeft: "25px" }}>New User? Please <Link>Signup</Link></p>

                    </div>

                </form>
            </div>
        </div >
    )
}

export default Login