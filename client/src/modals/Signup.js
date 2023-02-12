import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import axios from 'axios';

export default function Signup(props) {
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState('')
  const [pw, setPw] = React.useState('');
  const [checkPw, setCheckPw] = React.useState('')
  const [error, setError] = React.useState(false);
  //notMatch || notUnique || noPw || noPwCheck || noName || shortPw || success
  const [errorType, setErrorType] = React.useState('')

  const handleClickOpen = (name) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setSignup(false);
  };

  const handleSend = async(name) => {
    setErrorType('');
    if (checkPw !== pw){
      setErrorType('notMatch');
    }
    else if (isUnique(name) === false) {
      setErrorType('notUnique')
    }
    else if (username === ''){
      setErrorType('noName')
    }
    else if (checkPw === ''){
      setErrorType('noPwCheck')
    }
    else if (pw === ''){
      setErrorType('noPw')
    }
    else if (pw.length < 6) {
      setErrorType('shortPw')
    }

    if (errorType === ''){
      let res = await FetchAPIPost('/api/users/add', {
        name: username,
        password: pw,
        friends: [],
        isAdmin: false,
      });
      setErrorType('success')
      if (errorType === 'success'){
        const id = setTimeout(() => {
            setOpen(false);
        }, 3000);
        return () => {
            clearTimeout(id)
        }
    }
    }

  };

  function isUnique(name) {
    axios.get('/api/users/search/' + name)
            .then( (res) => {
                const n = res?.data;
                if (n) return false;
                else return true;
            })
            .catch( (err) => {
                console.log('Error finding user: ', err);
            });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} style={{border: '1px solid black', borderRadius: '5px'}}>
        <div className='muiModal'>
          <span style={{fontSize: '3.5rem'}}>Sign Up</span>
          <div className='dialogContent'>
            <span>Enter your desired username. You cannot change this later so choose wisely!</span>
            <input className='dialogInput' placeholder='username' onChange={(e) => setUsername(e.target.value)} style={{color: error ? '#929292' : 'black'}} pattern="[a-zA-Z0-9]+" required></input>
          </div>
          <div className='dialogContent'>
            <span>Enter your password (6 - 12 characters)</span>
            <input type='password' className='dialogInput' placeholder='password' onChange={(e) => setPw(e.target.value)} style={{color: error ? '#929292' : 'black', marginBottom: '-0.2rem'}} minLength="6" maxLength="12" required></input>
          </div>
          <div className='dialogContent'>
            <span>Doule check your password.</span>
            <input type='password' className='dialogInput' placeholder='password' onChange={(e) => setCheckPw(e.target.value)} style={{color: error ? '#929292' : 'black'}} minLength="6" maxLength="12" required></input>
          </div>
          {errorType !== 'success' && <div className='dialogActions'>
            <button className='save' onClick={() => handleSend()} type='submit'><span>Send</span></button>
            <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
          </div>}
          {errorType === 'noPw' || errorType === 'noPwCheck' || errorType === 'noName' && <span style={{color: "red"}}>Please fill in all of the fields</span>}
          {errorType === 'notMatch' && <span style={{color: "red"}}>Password and password check are not matching</span>}
          {errorType === 'shortPw' && <span style={{color: "red"}}>Password needs to be at least 6 characters long</span>}
          {errorType === 'notUnique' && <span style={{color: "red"}}>This username is already taken</span>}
          {errorType === 'success' && <span>Account successfully created. Welcome to CheeseMe, {username} !</span>}
          </div>
      </Dialog>
    </div>
  );
}