import { useEffect, useState } from 'react';

function DisplaySettingsLeft(props) {
  const [grid, setGrid] = useState(props.grid);

  const handleGridClick = () => {
    setGrid(!grid);
    props.setGrid(!grid);
  };

  return (
    <div className="settingsbox">
      <span className="settingsboxTitle">Display Settings</span>
      <div className="checkboxlist">
        <div className="checkboxButton">
          <input
            type="checkbox"
            name="checkGrid"
            onChange={() => handleGridClick()}
            checked={props.grid}
          />
          <label>Grid</label>
        </div>
      </div>
    </div>
  );
}

export default DisplaySettingsLeft;
