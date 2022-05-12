import { useContext, useEffect, useState } from 'react';
import Left from './components/Left';
import Right from './components/Right';

function App() {

  return (
    <div className="container">
      <header>
        <a href="/">WIP WebApp</a>
        <div className="searchbar">
          <input type="text" id="searchWord" name="searchWord" placeholder="Search"/>
          <button>.</button>
        </div>
      </header>
      <main>
          <div className="mainLeft">
            <Left/>
          </div>
          <div className="mainRight">
            <Right/>
          </div>
      </main>
    </div>
  );
}

export default App;
