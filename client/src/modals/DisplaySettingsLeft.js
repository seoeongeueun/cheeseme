import { useEffect, useState } from 'react'

function DisplaySettingsLeft(props){
    const [grid, setGrid] = useState(props.grid);

    useEffect(() => {

    }, [props.grid])

    const handleGridClick = () => {
        setGrid(!grid)
        props.setGrid(!grid)
    }

    return(
        <div className="settingsbox">
            <div className="checkboxlist">
                <p1>Display Settings</p1>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkGrid" onClick={() => handleGridClick()} checked={props.grid}/>
                    <label>Grid</label>
                </div>
            </div>
        </div>
    );
}

export default DisplaySettingsLeft;