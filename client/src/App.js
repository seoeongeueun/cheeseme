import { useContext, useEffect, useState } from 'react';
// import Left from './components/Left';
import EditModeLeftContainer from './containers/EditModeLeftContainer';
import Right from './components/Right';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function App() {

  return (
    <div className="container">
      <header>
        <a href="/">WIP WebApp</a>
        <div className="searchbar">
          <input type="text" id="searchWord" name="searchWord" placeholder="Search"/>
          <button><SearchRoundedIcon sx={{fontSize: "21px"}}/></button>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            <EditModeLeftContainer/>
          </div>
          <div className="mainRight">
            <Right/>
          </div>
      </main>
    </div>
  );
}

export default App;
