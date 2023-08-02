import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FetchAPIPost, FetchApiDelete, FetchApiGet } from '../utils/api.js';
import axios from 'axios';

export default function Signup(props) {
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [checkPw, setCheckPw] = React.useState('');
  //notMatch || notUnique || noPw || noPwCheck || noName || shortPw || success || noEmail || notUniqueEmail
  const [errorType, setErrorType] = React.useState('');
  const [foundUser, setFoundUser] = React.useState(false);
  const [foundEmail, setFoundEmail] = React.useState(false);
  const [send, setSend] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/'
        : 'https://cheese-me.fly.dev/',
  });

  React.useEffect(() => {
    if (errorType === 'notUnique' || errorType === 'noName') {
      setErrorType('');
    }
  }, [username]);

  React.useEffect(() => {
    if (errorType === 'noEmail' || errorType === 'notUniqueEmail') {
      setErrorType('');
    }
  }, [email]);

  React.useEffect(() => {
    if (
      errorType === 'noPw' ||
      errorType === 'noPwCheck' ||
      errorType === 'shortPw' ||
      errorType === 'notMatch'
    ) {
      setErrorType('');
    }
  }, [pw, checkPw]);

  const addUser = async () => {
    let res = await FetchAPIPost('/api/users/add', {
      name: username,
      email: email,
      password: pw,
      friends: [],
      isAdmin: false,
      positions: [
        { name: 'cal', x: 0, y: 0, show: true },
        { name: 'todo', x: 0, y: 0, show: true },
        { name: 'note', x: 0, y: 0, show: true },
        { name: 'dday', x: 0, y: 0, show: true },
        { name: 'reminder', x: 0, y: 0, show: true },
        { name: 'clock', x: 0, y: 0, show: true },
      ],
      settings: [true, false, true],
      notifications: [
        {
          notiType: 'signUp',
          from: 'admin',
          to: username,
          done: false,
          date: new Date().setHours(0, 0, 0, 0),
        },
      ],
      stickers: [],
      clock: [true, false, false, false, false, false],
    });
  };

  React.useEffect(() => {
    if (send) {
      addUser();
      setErrorType('success');
      const id = setTimeout(() => {
        setOpen(false);
        setErrorType('');
        props.setSignup(false);
      }, 3000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [send]);

  React.useEffect(() => {}, [foundEmail]);

  const handleClickOpen = (name) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.setSignup(false);
  };

  const handleSend = async () => {
    let tmp = '';
    instance
      .get('/api/users/' + username, {
        withCredentials: true,
      })
      .then((res) => {
        const n = res?.data;
        if (n) {
          setErrorType('notUnique');
          tmp = 'notUnique';
        }
      })
      .catch((err) => {
        console.log('Error finding user: ', err);
      });
    instance
      .get('/api/users/search/' + email, {
        withCredentials: true,
      })
      .then((res) => {
        const n = res?.data;
        if (n) {
          setErrorType('notUniqueEmail');
          tmp = 'notUniqueEmail';
        }
      })
      .catch((err) => {
        console.log('Error finding user: ', err);
      })
      .then(() => {
        if (checkPw !== pw) {
          setErrorType('notMatch');
          return;
        } else if (username === '') {
          setErrorType('noName');
          return;
        } else if (checkPw === '') {
          setErrorType('noPwCheck');
          return;
        } else if (pw === '') {
          setErrorType('noPw');
          return;
        } else if (pw.length < 6) {
          setErrorType('shortPw');
          return;
        } else if (email.length < 3) {
          setErrorType('noEmail');
          return;
        } else if (tmp !== 'notUnique' && tmp !== 'notUniqueEmail') {
          setErrorType('');
          setSend(true);
          return;
        }
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ border: '1px solid black', borderRadius: '5px' }}
      >
        <div className="muiModal">
          <span style={{ fontSize: '3.5rem' }}>Sign Up</span>
          <div className="dialogContent">
            <span>Enter your desired username</span>
            <input
              className="dialogInput"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              pattern="[a-zA-Z0-9]+"
              required
            ></input>
          </div>
          <div className="dialogContent">
            <span>
              Enter your email. This will be used to find your password later.
            </span>
            <input
              type="email"
              className="dialogInput"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>
          <div className="dialogContent">
            <span>Enter your password (6 - 20 characters)</span>
            <input
              type="password"
              className="dialogInput"
              placeholder="password"
              onChange={(e) => setPw(e.target.value)}
              minLength="6"
              maxLength="20"
              required
            ></input>
          </div>
          <div className="dialogContent">
            <span>Doule check your password.</span>
            <input
              type="password"
              className="dialogInput"
              placeholder="password"
              onChange={(e) => setCheckPw(e.target.value)}
              minLength="6"
              maxLength="12"
              required
            ></input>
          </div>
          {errorType !== 'success' && (
            <div className="dialogActions">
              <button className="save" onClick={handleSend} type="submit">
                <span>Confirm</span>
              </button>
              <button className="cancel" onClick={handleClose}>
                <span>Cancel</span>
              </button>
            </div>
          )}
          {(errorType === 'noPw' ||
            errorType === 'noPwCheck' ||
            errorType === 'noName') && (
            <span style={{ color: '#f73939' }}>
              Please fill in all of the fields
            </span>
          )}
          {errorType === 'notMatch' && (
            <span style={{ color: '#f73939' }}>
              Password and password check are not matching
            </span>
          )}
          {errorType === 'shortPw' && (
            <span style={{ color: '#f73939' }}>
              Password needs to be at least 6 characters long
            </span>
          )}
          {errorType === 'notUnique' && (
            <span style={{ color: '#f73939' }}>
              This username is already taken
            </span>
          )}
          {errorType === 'noEmail' && (
            <span style={{ color: '#f73939' }}>
              Please enter a correct email
            </span>
          )}
          {errorType === 'notUniqueEmail' && (
            <span style={{ color: '#f73939' }}>
              This email has already been used for a different account
            </span>
          )}
          {errorType === 'success' && (
            <span>Welcome {username} ! You can now login to start writing</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
