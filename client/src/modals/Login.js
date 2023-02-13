import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddFriend from './AddFriend.js';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import axios from 'axios';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Wink from '../icons/wink.png';
import Happy from '../icons/happy.png';
import Signup from './Signup.js';
import LoginModal from './LoginModal.js';

function Login(){
    const [username, setUsername] = useState()
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [userId, setUserId] = useState(); 

    useEffect(() => {
        if (userId) {
            
        }
    }, [userId])

    const handleLogout = () => {
        setLogin(false);
    }

    const handleLogin = () => {
        setLogin(true);
    }

    const handleSignup = () => {

    }

    return (
        <div className='settingsboxHeaderLogin'>
            {user ? <div className='loginHeader'>
                <span style={{textAlign: 'justify'}}>Welcome Back</span>
                <span>{username}<img src={Happy} style={{width: '1.7rem'}} alt='happy'/></span>
            </div>
            : <div className='loginHeader'><span>Hello!</span></div>}
            <div className='loginButtons'>
                {user ? <button className='cancel2' onClick={() => handleLogout()}><span>Logout</span></button> 
                : <><button className='save2' onClick={() => handleLogin()}><span>Login</span></button><button className='cancel2' onClick={() => setSignup(true)}><span>Sign Up</span></button></>}
            </div>
            {signup && <Signup setSignup={setSignup}/>}
            {login && <LoginModal setLogin={setLogin} setUserId={setUserId}/>}
        </div>
    );
}

export default Login;