import { useEffect, useState } from 'react'

function DisplaySettings(props){
    const [grid, setGrid] = useState(props.grid);
    const [sns, setSns] = useState(props.sns);

    useEffect(() => {

    }, [props.grid, props.sns])

    const handleGridClick = () => {
        props.setGrid(!grid)
        setGrid(!grid)
    }

    const handleSnsClick = () => {
        props.setSns(!sns)
        setSns(!sns)
    }

    return(
        <div className="settingsbox">
            <span className='settingsboxTitle' style={{marginTop: '-0.2rem'}}>Display Settings</span>
            <div className="checkboxlist">
                <div className="checkboxButton">
                    <input type="checkbox" name="checkSNS" onChange={handleSnsClick} checked={props.sns}/>
                    <label>Social Network Style</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="checkGrid" onChange={handleGridClick} checked={props.grid}/>
                    <label>Grid</label>
                </div>
            </div>
        </div>
    );
}

export default DisplaySettings;