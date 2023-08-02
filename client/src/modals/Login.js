import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import Happy from '../icons/happy.png';
import Signup from './Signup.js';
import LoginModal from './LoginModal.js';
import CloudSticker from '../icons/cloudSticker.png';
import Ghost1 from '../icons/ghost1.png';
import Glitter from '../icons/glitter.png';
import Cheese from '../icons/cheeseicon2.png';

function Login({
  onCurrentUserChange,
  userId,
  onCurrentNameChange,
  onSetFriendId,
  name,
  onChangeStickers,
}) {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080/'
        : 'https://cheese-me.fly.dev/',
  });

  const handleLogout = () => {
    setLogin(false);
    instance
      .get('/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data.success) {
          localStorage.removeItem('token');
          onCurrentUserChange(null);
          onCurrentNameChange(null);
          onSetFriendId('');
          onChangeStickers([
            {
              name: 'cloud',
              x: 140,
              y: 580,
              show: true,
              imgSrc: CloudSticker,
              croppedAreaPixels: { width: 500, height: 500, x: 0, y: 0 },
              rotation: 0,
            },
            {
              name: 'ghost',
              x: 300,
              y: 330,
              show: true,
              imgSrc: Ghost1,
              croppedAreaPixels: { width: 455, height: 455, x: 22, y: 14 },
              rotation: 0,
            },
            {
              name: 'glitter',
              x: 360,
              y: 200,
              show: true,
              imgSrc: Glitter,
              croppedAreaPixels: { width: 333, height: 333, x: 74, y: 95 },
              rotation: 0,
            },
            {
              name: 'cheese',
              x: 580,
              y: 410,
              show: true,
              imgSrc: Cheese,
              croppedAreaPixels: { width: 130, height: 130, x: 0, y: 0 },
              rotation: 0,
            },
          ]);
          window.location.reload();
        } else {
          instance
            .get('/checkCookie', {
              withCredentials: true,
            })
            .then((res) => {
              if (res?.data === false) {
                onCurrentUserChange(null);
                onCurrentNameChange(null);
                onSetFriendId('');
                localStorage.removeItem('token');
              } else {
              }
            })
            .catch((err) => {
              console.log('Error: ', err);
            });
        }
      })
      .catch((err) => {
        console.log('Error loading User info: ', err);
      });
  };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <div className="settingsboxHeaderLogin">
      {userId ? (
        <div className="loginHeader">
          <span style={{ textAlign: 'justify' }}>Welcome Back</span>
          <span>
            {name}
            <img src={Happy} style={{ width: '1.7rem' }} alt="happy" />
          </span>
        </div>
      ) : (
        <div className="loginHeader">
          <span>Hello!</span>
        </div>
      )}
      <div className="loginButtons">
        {userId ? (
          <button className="cancel2" onClick={() => handleLogout()}>
            <span>Logout</span>
          </button>
        ) : (
          <>
            <button className="save2" onClick={() => handleLogin()}>
              <span>Login</span>
            </button>
            <button className="cancel2" onClick={() => setSignup(true)}>
              <span>Sign Up</span>
            </button>
          </>
        )}
      </div>
      {signup && <Signup setSignup={setSignup} />}
      {login && (
        <LoginModal
          onSetFriendId={onSetFriendId}
          setLogin={setLogin}
          onCurrentUserChange={onCurrentUserChange}
          onCurrentNameChange={onCurrentNameChange}
        />
      )}
    </div>
  );
}

export default Login;
