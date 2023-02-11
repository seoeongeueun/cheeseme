import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddFriend from './AddFriend.js';
import axios from 'axios';

function Friend(){
    const [myFriends, setMyFriends] = useState(['burgerpants', 'eltonjohn']);
    const [clicked, setClicked] = useState('')
    const [addFriend, setAddFriend] = useState(false);
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (username != ''){
            const id = setTimeout(() => {
                setUsername('')
            }, 3000);
            return () => {
                clearTimeout(id)
            }
        }
    }, [username])

    const handleClickFriend = (name) => {
        setClicked(name);
        console.log('Viewing ' + name + `'s Posts...`)
    }

    const handleAddFriend = () => {
        setUsername('');
        setAddFriend(true);
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>My Friends</span>
                    <span style={{color: "#F9D876"}}>{myFriends?.length}</span>
                </div>
                <div className='friendButton'>
                    <span onClick={() => setAddFriend(true)}><AddRoundedIcon sx={{fontSize: '1.5rem'}}/></span>
                    {addFriend && <AddFriend setAddFriend={setAddFriend} setUsername={setUsername} myFriends={myFriends}/>}
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
                {username != '' && <span style={{color: "red"}}>Friend Request Sent to {username}</span>}
            </div>
            : <span>Let's add new friends!</span>}
        </div>
    );
}

export default Friend;