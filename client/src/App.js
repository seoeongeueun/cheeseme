import { useContext, useEffect, useState, useRef } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import RightContainer from './containers/RightContainer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLeftContainer from './containers/SearchResultLeftContainer.js';
import SearchResultRightContainer from './containers/SearchResultRightContainer.js';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Friend from './modals/Friend.js';
import Notification from './modals/Notification';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

function App() {
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [noti, setNoti] = useState([{_id: 1, type: 'sendRequest', from: 'sam', to: 'burgerpants', done: false}])
  const [unRead, setUnread] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("noti!!! : ", noti)
    setUnread(false);
    noti?.map(n => (
      n.done === false && setUnread(true)
    ));
  }, [noti])

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
            <a href="/">CheeseMe!</a>
            <div className="searchbar">
              <input ref={inputRef} type="text" id="searchWord" name="searchWord" placeholder="Search"/>
              <button onClick={handleClick}><SearchRoundedIcon sx={{fontSize: "21px"}} /></button>
            </div>
          </div>
          <div className='mainMenu'>
            <button><HomeOutlinedIcon sx={{fontSize: '2rem'}}/></button>
            {showFriend ? <button onClick={() => setShowFriend(false)}><AddReactionTwoToneIcon sx={{fontSize: '2rem', color: '#F9D876'}}/></button>
            : <button onClick={() => setShowFriend(true)}><AddReactionOutlinedIcon sx={{fontSize: '2rem'}}/></button>}
            {showFriend && <Friend/>}
            {showNoti ? <button onClick={() => setShowNoti(false)}><NotificationsNoneTwoToneIcon sx={{fontSize: '2rem', color: '#F9D876'}}/></button>
            : unRead ? <button onClick={() => setShowNoti(true)}><NotificationImportantIcon sx={{fontSize: '2rem'}}/></button>
              : <button onClick={() => setShowNoti(true)}><NotificationsNoneOutlinedIcon sx={{fontSize: '2rem'}}/></button>}
            {showNoti && <Notification noti={noti} setNoti={setNoti}/>}
            <button><AccountCircleOutlinedIcon sx={{fontSize: '2rem'}}/></button>
          </div>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            {search ? <SearchResultLeftContainer keyword={keyword} setSearch={setSearch}/> : <EditModeLeftContainer/> }
          </div>
          <div className="mainRight">
            {search ? <SearchResultRightContainer keyword={keyword} setSearch={setSearch}/> : <RightContainer/> }
          </div>
      </main>
    </div>
  );
}

export default App;
