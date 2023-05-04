import { useEffect, useState } from 'react';
import { FetchAPIPost } from '../utils/api.js';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

function DisplaySettings(props){
    const [grid, setGrid] = useState(props.grid);
    const [plain, setPlain] = useState(props.plain);

    const handleGridClick = async(bool) => {
        props.setGrid(bool)
        setGrid(bool);
        let res = await FetchAPIPost('/api/right/update/' + props.date, {
            grid: bool
        });
    }

    const handlePlainClick = async(bool) => {
        props.setPlain(bool);
        setPlain(bool);
        let res = await FetchAPIPost('/api/right/update/' + props.date, {
            plain: bool
        });
    }

    return(
        <div className="settingsbox">
            <span className='settingsboxTitle' style={{marginTop: '-0.2rem'}}>Style Settings</span>
            <div className="checkboxlist">
                <div className="checkboxButton">
                    {props.plain ? <CheckBoxRoundedIcon className='checkbox' sx={{fontSize: '1.5rem'}} onClick={() => handlePlainClick(false)}/>
                    : <CheckBoxOutlineBlankRoundedIcon className='checkbox' sx={{fontSize: '1.5rem'}} onClick={() => handlePlainClick(true)}/>}
                    <label>Plain text only</label>
                </div>
                <div className="checkboxButton">
                    {props.grid ? <CheckBoxRoundedIcon className='checkbox' sx={{fontSize: '1.5rem'}} onClick={() => handleGridClick(false)}/>
                    : <CheckBoxOutlineBlankRoundedIcon className='checkbox' sx={{fontSize: '1.5rem'}} onClick={() => handleGridClick(true)}/>}
                    <label>Grid</label>
                </div>
            </div>
        </div>
    );
}

export default DisplaySettings;