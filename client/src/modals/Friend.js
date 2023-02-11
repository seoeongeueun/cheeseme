import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import axios from 'axios';

function Friend(){
    const [myFriends, setMyFriends] = useState(['burgerpants', 'eltonjohn']);
    const [clicked, setClicked] = useState('')

    const handleClickFriend = (name) => {
        setClicked(name)
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendCount'>
                <p1>My Friends</p1>
                <p1 style={{color: "#F9D876"}}>{myFriends?.length}</p1>
            </div>
            {myFriends?.length > 0 ?
            <div className='friendList'>
                {myFriends.map((f) => (
                    <div className='friendItem' onClick={() => handleClickFriend(f)}>
                        <span>{f}</span>
                    </div>
                ))}
            </div>
            : <span>Let's add new friends!</span>}
        </div>
    );
}

export default Friend;