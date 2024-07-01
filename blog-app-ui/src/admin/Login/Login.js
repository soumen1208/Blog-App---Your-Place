import React from 'react'
import '../Login/login.css'

function Login() {
    return (
        <div className='loginContainer'>
            <div className='loginbox'>
                <form>
                    <h1 className='blogname'>Soumen's Blog</h1>
                    <div>
                        <input placeholder='user name'></input>
                        <input placeholder='password'></input>

                    </div>
                    <div>
                        <button className='blue' type='submit' >Sign-up</button>
                        <button className='green' type='submit' value='login'>Sign-in</button >

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login