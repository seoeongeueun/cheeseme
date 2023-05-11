import { useContext, useEffect, useState, useRef } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import RightContainer from './containers/RightContainer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLeftContainer from './containers/SearchResultLeftContainer.js';
import SearchResultRightContainer from './containers/SearchResultRightContainer.js';
import LoginContainer from './containers/LoginContainer.js';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FriendContainer from './containers/FriendContainer';
import Notification from './modals/Notification';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Login from './modals/Login';
import { currentUser } from './modules/loginInfo.js';
import { useSelector, useDispatch } from 'react-redux';
import BigCheese from './icons/cheese.png';
import SmallCheese from './icons/smallCheese.png';
import { currentFriends } from './modules/friendsList.js';
import { currentNotis } from './modules/notisList';
import { currentPositions } from './modules/positionsList';
import NotiContainer from './containers/NotiContainer';
import { setFriendId } from './modules/viewFriend.js';
import { currentName } from './modules/nameInfo.js';

import axios from 'axios';

function App() {
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [noti, setNoti] = useState([]);
  const [unRead, setUnread] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [positions, setPositions] = useState([]);
  const inputRef = useRef(null);

  const { userId } = useSelector(state => ({
    userId: state.loginInfo.userId,
  }));
  
  const dispatch = useDispatch();
  const onChangeFriends = friends => dispatch(currentFriends(friends));
  const onChangeNotis = notis => dispatch(currentNotis(notis));
  const onChangePositions = positions => dispatch(currentPositions(positions));
  const onCurrentUserChange = id => dispatch(currentUser(id));
  const onSetFriendId = friendId => dispatch(setFriendId(friendId));
  const onCurrentNameChange = name => dispatch(currentName(name));

  useEffect(() => {
    if (localStorage.getItem('token')) {
      onCurrentUserChange(localStorage.getItem('token'));
      onSetFriendId('');
    }
  }, [])

  useEffect(() => {
    if (userId) {
      axios.get('/api/users/find/' + userId)
        .then((res) => {
          const n = res?.data;
          if (n) {
            onChangeNotis(n.notifications);
            onChangeFriends(n.friends);
            onChangePositions(n.positions?.length === 0 ? [{name: 'cal', x: 0, y: 0, show: true},
              {name: 'dday', x: 0, y: 0, show: true},
              {name: 'note', x: 0, y: 0, show: true},
              {name: 'todo', x: 0, y: 0, show: true},
              {name: 'reminder', x: 0, y: 0, show: true}] : n.positions);
            onCurrentNameChange(n.name);
          }
        })
        .catch( (err) => {
            console.log('Error loading note')
        })
    }
  }, [userId])

  useEffect(() => {
    noti?.map(n => (
      n.done === false && setUnread(true)
    ));
  }, [noti])

  useEffect(() => {
    if (showAccount) {
      setShowFriend(false);
      setShowNoti(false);
    }
  }, [showAccount]);

  useEffect(() => {
    if (showFriend) {
      setShowAccount(false);
      setShowNoti(false);
    }
  }, [showFriend]);

  useEffect(() => {
    if (showNoti) {
      setUnread(false);
      setShowAccount(false);
      setShowFriend(false);
    }
  }, [showNoti]);

  const handleClick = () => {
    setKeyword(inputRef.current.value);
    setSearch(true)
  }

  return (
    <div className="container">
      <header>
        <div className='mainHeader'>
          <div className='fill'/>
          <div className='title'>
            <a href="/">CheeseMe</a>
            <div className="searchbar">
              <input ref={inputRef} type="text" id="searchWord" name="searchWord" placeholder="Search"/>
              <button onClick={handleClick}><SearchRoundedIcon sx={{fontSize: "21px"}} /></button>
            </div>
          </div>
          <div className='mainMenu'>
            <div className='headerButtonSet'>
              {showNoti ? <button onClick={() => setShowNoti(false)}><NotificationsNoneTwoToneIcon sx={{fontSize: '2rem', color: '#F9D876'}}/></button>
              : unRead ? <button onClick={() => setShowNoti(true)}><NotificationImportantIcon sx={{fontSize: '2rem'}}/></button>
                : <button onClick={() => setShowNoti(true)}><NotificationsNoneOutlinedIcon sx={{fontSize: '2rem'}}/></button>}
              {showNoti && <NotiContainer/>}
            </div>
            <div className='headerButtonSet'>
              {showFriend ? <button onClick={() => setShowFriend(false)}><AddReactionTwoToneIcon sx={{fontSize: '2rem', color: '#F9D876'}}/></button>
              : <button onClick={() => setShowFriend(true)}><AddReactionOutlinedIcon sx={{fontSize: '2rem'}}/></button>}
              {showFriend && <FriendContainer/>}
            </div>
            <div className='headerButtonSet'>
              {showAccount ? <button onClick={() => setShowAccount(false)}><AccountCircleTwoToneIcon sx={{fontSize: '2rem', color: '#F9D876'}}/></button>
              : <button onClick={() => setShowAccount(true)}><AccountCircleOutlinedIcon sx={{fontSize: '2rem'}}/></button>}
              {showAccount && <LoginContainer/>}
            </div>
          </div>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            {userId  ? 
              search ? <SearchResultLeftContainer keyword={keyword} setSearch={setSearch}/> 
              : <EditModeLeftContainer/>
            : <div className="leftInnerBorderGuest">
                <img src={BigCheese} alt='bigCheese' style={{width: '10rem', height: '10rem'}}/>
                <span>Login Required</span>
              </div>}
          </div>
          <div className="mainRight">
            {userId ?
              search ? <SearchResultRightContainer keyword={keyword} setSearch={setSearch}/>
              : <RightContainer/>
            : <div className='rightInnerBorderGuest'>
                <img src={SmallCheese} alt='smallCheese' style={{width: '10rem', height: '10rem'}}/>
                <span>Login Required</span>
              </div>}
          </div>
      </main>
    </div>
  );
}

export default App;
