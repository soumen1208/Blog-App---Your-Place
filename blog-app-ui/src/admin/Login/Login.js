import React, { useState } from 'react'
import '../Login/login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(userName, password);
        axios.post('http://localhost:3000/auth/admin/login', {
            userName: userName,
            password: password
        })
            .then(res => {
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
                        <button className='blue' type='submit' >Sign-up</button>
                        <button className='green' type='submit' >Sign-in</button >

                    </div>

                </form>
            </div>
        </div >
    )
}

export default Login