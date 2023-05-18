import { useEffect, useState, useCallback, useRef } from 'react';

import axios from 'axios';
import Happy from '../icons/happy.png';
import Signup from './Signup.js';
import LoginModal from './LoginModal.js';

function Login({onCurrentUserChange, userId, onCurrentNameChange, onSetFriendId, name}){
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const instance = axios.create({
        baseURL: "https://cheese-me.fly.dev/",
      });

    const handleLogout = () => {
        setLogin(false);
        instance.get('/logout')
            .then( (res) => {
                if (res?.data.success) {
                    localStorage.removeItem('token');
                    onCurrentUserChange(null);
                    onCurrentNameChange(null);
                    onSetFriendId('');
                } else  {
                    instance.get('/checkCookie')
                        .then((res) => {
                            if (res?.data === false) {
                                onCurrentUserChange(null);
                                onCurrentNameChange(null);
                                onSetFriendId('');
                                localStorage.removeItem('token');
                            }
                        })
                        .catch( (err) => {
                            console.log('Error: ', err);
                        })
                }
            })
            .catch( (err) => {
                console.log('Error loading User info: ', err);
            })
    }

    const handleLogin = () => {
        setLogin(true);
    }

    return (
        <div className='settingsboxHeaderLogin'>
            {userId ? <div className='loginHeader'>
                <span style={{textAlign: 'justify'}}>Welcome Back</span>
                <span>{name}<img src={Happy} style={{width: '1.7rem'}} alt='happy'/></span>
            </div>
            : <div className='loginHeader'><span>Hello!</span></div>}
            <div className='loginButtons'>
                {userId ? <button className='cancel2' onClick={() => handleLogout()}><span>Logout</span></button> 
                : <><button className='save2' onClick={() => handleLogin()}><span>Login</span></button><button className='cancel2' onClick={() => setSignup(true)}><span>Sign Up</span></button></>}
            </div>
            {signup && <Signup setSignup={setSignup}/>}
            {login && <LoginModal onSetFriendId={onSetFriendId} setLogin={setLogin} onCurrentUserChange={onCurrentUserChange} onCurrentNameChange={onCurrentNameChange} />}
        </div>
    );
}

export default Login;