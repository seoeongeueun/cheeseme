import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddFriend(props) {
  const [open, setOpen] = React.useState(true);
  const [entered, setEntered] = React.useState('')
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (error){
      setError(false);
    }
  }, [entered]);

  const handleClickOpen = (name) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setAddFriend(false);
    props.setUsername('')
  };

  const handleSend = (name) => {
    if (props.myFriends){
      for (let i = 0; i < props.myFriends.length; i++) {
        if (props.myFriends[i] === name){
          setError(true)
          return
        }
      }
      setOpen(false);
      props.setAddFriend(false);
      props.setUsername(name);
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
          </div>
      </Dialog>
    </div>
  );
}