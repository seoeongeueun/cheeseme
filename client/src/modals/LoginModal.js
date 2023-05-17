import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { FetchAPIPostLogin } from '../utils/api.js';
import axios from 'axios';

export default function LoginModal(props) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClickOpen = (name) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setLogin(false);
  };

  const handleSend = async() => {
    let res = await FetchAPIPostLogin('/login', {
      name: username,
      password: pw
    });
    if (res.loginSuccess){
      console.log('Login Success');
      setSuccess(true);
      setError(false);
      props.onCurrentUserChange(res.userId);
      props.onCurrentNameChange(username);
      props.setLogin(false);
      props.onSetFriendId('');
      console.log(res.userId)
      await localStorage.setItem('token', res.userId)
      localStorage.getItem('token')
    } else {
      console.log('Login Failed')
      setError(true);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} style={{border: '1px solid black', borderRadius: '5px'}}>
        <div className='muiModal'>
          <span style={{fontSize: '3.5rem'}}>Login</span>
          <div className='dialogContent'>
            <span>Username</span>
            <input className='dialogInput' placeholder='username' onChange={(e) => setUsername(e.target.value)} value={username} pattern="[a-zA-Z0-9]+" required></input>
          </div>
          <div className='dialogContent'>
            <span>Password (6 - 20 characters))</span>
            <input type='password' className='dialogInput' placeholder='password' onChange={(e) => setPw(e.target.value)} minLength="6" maxLength="20" required></input>
          </div>
          <div className='dialogActions'>
            <button className='save' onClick={handleSend} type='submit'><span>Confirm</span></button>
            <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
          </div>
          {error && <span style={{color: "#f73939"}}>Invalid id or password</span>}
        </div>
      </Dialog>
    </div>
  );
}