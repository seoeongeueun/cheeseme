import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddFriend from './AddFriend.js';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import axios from 'axios';
import Star from '../icons/star.png';
import StarColor from '../icons/starColor.png';

function Friend(){
    const [myFriends, setMyFriends] = useState([{name: 'burgerpants', fav: true}, {name: 'eltonjohn', fav: false}]);
    const [clicked, setClicked] = useState('')
    const [addFriend, setAddFriend] = useState(false);
    const [removeFriend, setRemoveFriend] = useState(false);
    const [username, setUsername] = useState('');
    const [bye, setBye] = useState('')

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

    useEffect(() => {
        if (bye != ''){
            const id = setTimeout(() => {
                setBye('')
            }, 3000);
            return () => {
                clearTimeout(id)
            }
        }
    }, [bye])

    const handleClickFriend = (name) => {
        setClicked(name);
        console.log('Viewing ' + name + `'s Posts...`)
    }

    const handleAddFriend = () => {
        setUsername('');
        setAddFriend(true);
    }

    const handleRemove = (name) => {
        setMyFriends(myFriends.filter( e => e !== name));
        setBye(name);
    }

    const handleStar = (name) => {
        const newState = myFriends.map(f => {
            if (f.name === name) {
                return {...f, fav: !f.fav};
            }
            return f;
        });
        setMyFriends(newState)
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>My Friends</span>
                    {/* <span style={{color: "#F9D876"}}>{myFriends?.length}</span> */}
                </div>
                <div className='friendButton'>
                    <button className={removeFriend ? 'cancel2' : 'save2'} onClick={() => setAddFriend(true)}><span><AddRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    {addFriend && <AddFriend setAddFriend={setAddFriend} setUsername={setUsername} myFriends={myFriends}/>}
                    {removeFriend ? <button className='save2' onClick={() => setRemoveFriend(false)}><span><CheckRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    : <button className='cancel2' onClick={() => setRemoveFriend(true)}><span><RemoveRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>}
                </div>
            </div>
            {myFriends?.length > 0 ?
            <div className='friendList'>
                {myFriends.map((f) => (
                    <div className='friendItem'>
                        <img src={f.fav ? StarColor : Star} style={{width: '1rem', marginRight: '0.5rem', marginTop: '3px'}} onClick={() => handleStar(f.name)}/>
                        <span onClick={() => handleClickFriend(f.name)}>{f.name}</span>
                        {removeFriend && <button onClick={() => handleRemove(f.name)}><span><ClearRoundedIcon sx={{fontSize: '1.2rem', color: 'red'}}/></span></button>}
                    </div>
                ))}
            </div>
            : <span style={{fontSize: '2rem', color: '#a0a096'}}>Let's add new friends!</span>}
            {username != '' && <span style={{color: "red", fontSize: '1.7rem'}}>Friend Request Sent to {username}</span>}
            {bye != '' && <span style={{color: "red", fontSize: '1.7rem'}}>You're no longer friends with {bye}</span>}
        </div>
    );
}

export default Friend;