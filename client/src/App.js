import { useContext, useEffect, useState, useRef } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import RightContainer from './containers/RightContainer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLeftContainer from './containers/SearchResultLeftContainer.js';
import SearchResultRightContainer from './containers/SearchResultRightContainer.js';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Friend from './modals/Friend.js';

function App() {
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [showFriend, setShowFriend] = useState(false);
  const inputRef = useRef(null);

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
            <button><HomeIcon sx={{fontSize: '2rem'}}/></button>
            <button onClick={() => setShowFriend(!showFriend)}><AddReactionIcon sx={{fontSize: '2rem'}}/></button>
            {showFriend && <Friend/>}
            <button><AccountCircleIcon sx={{fontSize: '2rem'}}/></button>
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
