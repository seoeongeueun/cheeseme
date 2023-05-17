import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FetchAPIPost } from '../utils/api.js';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import axios from 'axios';

function DisplaySettings(props){
    const [grid, setGrid] = useState(props.grid);
    const [plain, setPlain] = useState(props.plain);
    const { date } = useSelector(state => ({
        date: state.datePick.date,
    }));
    const instance = axios.create({
        baseURL: "https://cheese-me.fly.dev/",
      });

    const handleGridClick = async(bool) => {
        props.setGrid(bool)
        setGrid(bool);
        let res = await FetchAPIPost('/api/right/update/' + date, {
            grid: bool
        });
        if (props.userId && res) {
            instance.get('/api/right/getByOwner/' + props.userId)
                .then((res) => {
                    const n = res?.data;
                    if (n) props.setAllPosts(n.sort((a, b) => a.date - b.date))
                })
                .catch((err) => {
                    console.log('Error loading posts')
                });
        }
    }

    const handlePlainClick = async(bool) => {
        props.setPlain(bool);
        setPlain(bool);
        let res = await FetchAPIPost('/api/right/update/' + date, {
            plain: bool,
        });
        if (props.userId && res) {
            instance.get('/api/right/getByOwner/' + props.userId)
                .then((res) => {
                    const n = res?.data;
                    if (n) props.setAllPosts(n.sort((a, b) => a.date - b.date))
                })
                .catch((err) => {
                    console.log('Error loading posts');
                });
        }
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