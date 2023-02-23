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

function Login({onCurrentUserChange, userId, onCurrentNameChange, onSetFriendId}){
    const [username, setUsername] = useState()
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    useEffect(() => {
        if (userId) {
            axios.get('/api/users/info/' + userId)
            .then( (res) => {
                setUsername(res?.data.name);
            })
            .catch( (err) => {
                console.log('Error loading User info: ', err);
            })
        }
    }, [userId])

    const handleLogout = () => {
        setLogin(false);
        axios.get('/logout')
            .then( (res) => {
                if (res?.data.success) {
                    onCurrentUserChange(null);
                    onCurrentNameChange(null);
                    onSetFriendId('')
                    setUsername(null);
                }
            })
            .catch( (err) => {
                console.log('Error loading User info: ', err);
            })
    }

    const handleLogin = () => {
        setLogin(true);
    }

    const handleSignup = () => {

    }

    return (
        <div className='settingsboxHeaderLogin'>
            {userId ? <div className='loginHeader'>
                <span style={{textAlign: 'justify'}}>Welcome Back</span>
                <span>{username}<img src={Happy} style={{width: '1.7rem'}} alt='happy'/></span>
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