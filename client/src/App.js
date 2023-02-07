import { useContext, useEffect, useState, useRef } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import RightContainer from './containers/RightContainer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLeftContainer from './containers/SearchResultLeftContainer.js';

function App() {
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    setKeyword(inputRef.current.value);
    setSearch(true)
  }


  return (
    <div className="container">
      <header>
        <a href="/">CheeseMe!</a>
        <div className="searchbar">
          <input ref={inputRef} type="text" id="searchWord" name="searchWord" placeholder="Search"/>
          <button onClick={handleClick}><SearchRoundedIcon sx={{fontSize: "21px"}} /></button>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            {search ? <SearchResultLeftContainer keyword={keyword} setSearch={setSearch}/> : <EditModeLeftContainer/> }
          </div>
          <div className="mainRight">
            {search && <RightContainer/>}
          </div>
      </main>
    </div>
  );
}

export default App;
