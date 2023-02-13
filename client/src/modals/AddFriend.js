import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FetchAPIPost } from '../utils/api.js';
import axios from 'axios';

export default function AddFriend({name, setAddFriend}) {
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState('')
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [friendsNoti, setFriendsNoti] = useState();

  const updateNotis = async() => {
    const newNoti = [{notiType: 'sendRequest', from: name, to: entered, done: false, date: new Date().setHours(0, 0, 0, 0)}, ...friendsNoti]
    let res = await FetchAPIPost('/api/users/updateWithName/' + entered, {
      notifications: newNoti.length > 5 ? newNoti.slice(0,5) : newNoti
    })
    if (!res) {
      setMessage('User with username ' + entered + ' does not exit');
      setError(true);
    }
    else {
      setError(false);
      setAddFriend(false);
    }
  }

  useEffect(() => {
    if (friendsNoti) updateNotis();
  }, [friendsNoti])
  
  useEffect(() => {
    if (error){
      setError(false);
    }
  }, [entered]);

  const handleClickOpen = (name) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddFriend(false);
  };

  const handleSend = async(friendName) => {
    if (friendName !== '') {
      axios.get('/api/users/' + friendName)
        .then((res) => {
          if (res) setFriendsNoti(res?.data.notifications)
          else {
            setMessage('User with username ' + friendName + ' does not exit');
            setError(true);
          }
        })
    }
    else {
      setMessage('Please enter a correct username')
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} style={{border: '1px solid black', borderRadius: '5px'}}>
        <div className='muiModal'>
          <span style={{fontSize: '3rem'}}>Add Friend</span>
          <div className='dialogContent'>
            <span>Enter a username to add. Make sure you enter a correct username.</span>
            <input className='dialogInput' placeholder='username' onChange={(e) => setEntered(e.target.value)} style={{color: error ? '#929292' : 'black'}}></input>
          </div>
          <div className='dialogActions'>
            <button className='save' onClick={() => handleSend(entered)}><span>Send</span></button>
            <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
          </div>
          {error && <span style={{color: "red"}}>Error: User <i>{entered}</i> is already your friend!</span>}
          {message !== '' && <span style={{color: "red"}}>{message}</span>}
          </div>
      </Dialog>
    </div>
  );
}