import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost } from '../utils/api.js';
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

function Friend({userId, friends, onChangeFriends, onAddFriend, onRemoveFriend, onFavFriend}){
    const [clicked, setClicked] = useState('')
    const [addFriend, setAddFriend] = useState(false);
    const [removeFriend, setRemoveFriend] = useState(false);
    const [username, setUsername] = useState('');
    const [bye, setBye] = useState('');

    useEffect(() => {
        console.log("friends: ", friends)
    })

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

    const handleRemove = async(name) => {
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            friends: friends
        });
        if (res){
            onRemoveFriend(name);
            setBye(name);
        }
    }

    const handleStar = async(name) => {
        onFavFriend(name);
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            friends: friends
        });
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>My Friends</span>
                    {/* <span style={{color: "#F9D876"}}>{friends?.length}</span> */}
                </div>
                <div className='friendButton'>
                    <button className={removeFriend ? 'cancel2' : 'save2'} onClick={() => setAddFriend(true)}><span><AddRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    {/* {addFriend && <AddFriend setAddFriend={setAddFriend} userId={userId} friends={friends} username={username}/>} */}
                    {removeFriend ? <button className='save2' onClick={() => setRemoveFriend(false)}><span><CheckRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    : <button className='cancel2' onClick={() => setRemoveFriend(true)}><span><RemoveRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>}
                </div>
            </div>
            {friends?.length > 0 ?
            <div className='friendList'>
                {friends.map((f) => (
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