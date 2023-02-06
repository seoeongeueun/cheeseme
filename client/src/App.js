import { useContext, useEffect, useState } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import RightContainer from './containers/RightContainer';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLeft from './components/SearchResultLeft.js';

function App() {
  const [keyword, setKeyword] = useState('')

  return (
    <div className="container">
      <header>
        <a href="/">CheeseMe!</a>
        <div className="searchbar">
          <input type="text" id="searchWord" name="searchWord" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          <button><SearchRoundedIcon sx={{fontSize: "21px"}}/></button>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            {keyword === "" ? <EditModeLeftContainer/> : <SearchResultLeft/>}
          </div>
          <div className="mainRight">
            {keyword === "" && <RightContainer/>}
          </div>
      </main>
    </div>
  );
}

export default App;
