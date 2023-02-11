import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import axios from 'axios';

function Friend(){
    const [myFriends, setMyFriends] = useState(['burgerpants', 'eltonjohn']);
    const [clicked, setClicked] = useState('')

    const handleClickFriend = (name) => {
        setClicked(name);
        console.log('Viewing ' + name + `'s Posts...`)
    } 

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>My Friends</span>
                    <span style={{color: "#F9D876"}}>{myFriends?.length}</span>
                </div>
                <div className='friendButton'>
                    <span><AddRoundedIcon sx={{fontSize: '1.5rem'}}/></span>
                    <span><RemoveRoundedIcon sx={{fontSize: '1.5rem'}}/></span>
                </div>
            </div>
            {myFriends?.length > 0 ?
            <div className='friendList'>
                {myFriends.map((f) => (
                    <div className='friendItem'>
                        <CircleOutlinedIcon sx={{fontSize: '0.5rem', marginRight: '0.5rem', marginTop: '3px'}}/>
                        <span onClick={() => handleClickFriend(f)}>{f}</span>
                    </div>
                ))}
            </div>
            : <span>Let's add new friends!</span>}
        </div>
    );
}

export default Friend;