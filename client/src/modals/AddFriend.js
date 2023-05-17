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

export default function AddFriend({name, setAddFriend, friends, notis}) {
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState('')
  const [error, setError] = useState(true);
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
      setMessage('Friend Request sent to ' + entered);
      const id = setTimeout(() => {
          setOpen(false);
          setMessage('');
          setAddFriend(false);
      }, 2500);
      return () => {
          clearTimeout(id)
      }

    }
  }

  // useEffect(() => {
  //   if (friendsNoti) {
  //     if (!error) updateNotis();
  //   }
  // }, [friendsNoti])

  useEffect(() => {
    if (error === false && entered !== '' && message === '') {
      updateNotis()
    }
  }, [error]);
  
  // useEffect(() => {
  //   if (error){
  //     setError(false);
  //     setMessage('');
  //   }
  // }, [entered]);

  const handleClickOpen = (name) => {
    setOpen(true);
    setError(false);
    setAddFriend(false);
  };

  const handleClose = () => {
    setOpen(false);
    setAddFriend(false);
  };

  const checkFriend = async(name) => {
    await friends?.forEach((f) => {
      if (f.name === name) {
        setMessage(name + ' is already your friend');
        setError(true);
      }
    })
  };

  const checkNotis = async(name) => {
    await notis?.forEach((n) => {
      if (n.notiType === 'sendRequest' && n.from === name && n.done === false) {
        setMessage('You have a pending friend request from ' + name);
        setError(true);
      }
    })
  }

  const handleSend = async(friendName) => {
    if (friendName !== '') {
      if (name === friendName){
        setMessage('You cannot add yourself')
        setError(true);
        return
      }
      else {
        instance.get('/api/users/' + friendName)
          .then((res) => {
            if (res?.data) {
              setFriendsNoti(res?.data.notifications);
              setMessage('');
              setError(false);
            }
            else {
              setMessage('User with username ' + friendName + ' does not exit');
              setError(true);
              return;
            }
          })
        .then(checkFriend(friendName))
        .then(checkNotis(friendName));
      }
    }
    else {
      setMessage('Please enter a correct username');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} style={{border: '1px solid black', borderRadius: '5px'}}>
        <div className='muiModal'>
          <span style={{fontSize: '3rem'}}>Add Friend</span>
          <div className='dialogContent'>
            <span>Enter a username to add. Make sure you enter a correct username.</span>
            <input className='dialogInput' placeholder='username' onChange={(e) => setEntered(e.target.value)}></input>
          </div>
          <div className='dialogActions'>
            <button className='save' onClick={() => handleSend(entered)}><span>Send</span></button>
            <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
          </div>
          {message !== '' && <span style={{color: "#f73939"}}>{message}</span>}
          </div>
      </Dialog>
    </div>
  );
}