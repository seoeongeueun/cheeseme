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
import AddFriendContainer from '../containers/AddFriendContainer.js';

function Friend({userId, name, friends, onChangeFriends, onAddFriend, onRemoveFriend, onFavFriend, onSetFriendId}){
    const [clicked, setClicked] = useState('')
    const [addFriend, setAddFriend] = useState(false);
    const [removeFriend, setRemoveFriend] = useState(false);
    const [username, setUsername] = useState('');
    const [bye, setBye] = useState('');
    const [friendName, setFriendName] = useState('');
    const [friendFriends, setFriendFriends] = useState(null);
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'https://localhost:8080/' : "https://cheese-me.fly.dev/",
      });
    
    const updateList = async() => {
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            friends: friends
        });
    };

    const updateFriendList = async() => {
        let res = await FetchAPIPost('/api/users/updateWithName/' + bye, {
            friends: friendFriends.filter(e => e.name !== name)
        });
        setFriendFriends(null);
    }

    useEffect(() => {
        updateList();
    }, [friends]);

    useEffect(() => {
        if (username !== ''){
            const id = setTimeout(() => {
                setUsername('')
            }, 3000);
            return () => {
                clearTimeout(id)
            }
        }
    }, [username]);

    useEffect(() => {
        if (bye !== ''){
            instance.get('/api/users/' + bye, {
                withCredentials: true
            })
                .then((res) => {
                setFriendFriends(res?.data.friends);
            })
            const id = setTimeout(() => {
                setBye('')
            }, 3000);
            return () => {
                clearTimeout(id)
            }
        }
    }, [bye])

    useEffect(() => {
        if (friendFriends) {
            updateFriendList();
        }
    }, [friendFriends]);

    const handleClickFriend = async(name) => {
        setClicked(name);
        instance.get('/api/users/' + name, {
            withCredentials: true
        })
            .then((res) => {
                onSetFriendId(res?.data._id.toString());
            })
        console.log('Viewing ' + name + `'s Posts...`)
    }

    const handleAddFriend = () => {
        setUsername('');
        setAddFriend(true);
    }

    const handleRemove = async(name) => {
        onRemoveFriend(name);
        setBye(name);
    }

    const handleStar = async(name) => {
        onFavFriend(name);
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>My Friends</span>
                    {/* <span style={{color: "#F9D876"}}>{friends?.length}</span> */}
                </div>
                <div className='friendButton'>
                    <button disabled={userId ? removeFriend ? true : false : true} className={userId ? removeFriend ? 'cancel2' : 'save2' : 'cancel2'} onClick={() => setAddFriend(true)}><span><AddRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    {addFriend && <AddFriendContainer setAddFriend={setAddFriend}/>}
                    {removeFriend ? <button className='save2' onClick={() => setRemoveFriend(false)}><span><CheckRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>
                    : <button disabled={userId ? false : true} className='save2' onClick={() => setRemoveFriend(true)}><span><RemoveRoundedIcon sx={{fontSize: '1.5rem'}}/></span></button>}
                </div>
            </div>
            {userId ?
                friends?.length > 0 ?
                <div className='friendList'>
                    {friends.map((f, i) => (
                        <div className='friendItem' key={i}>
                            <img src={f.fav ? StarColor : Star} style={{width: '1rem', marginRight: '0.5rem', marginTop: '3px'}} onClick={() => handleStar(f.name)}/>
                            <span onClick={() => handleClickFriend(f.name)}>{f.name}</span>
                            {removeFriend && <button onClick={() => handleRemove(f.name)}><span><ClearRoundedIcon sx={{fontSize: '1.2rem', color: '#f73939'}}/></span></button>}
                        </div>
                    ))}
                </div>
                : <span style={{fontSize: '2rem', color: '#a0a096'}}>Let's add new friends!</span>
            : <span style={{fontSize: '2rem'}}>Login Required</span>}
            {username !== '' && <span style={{color: "#f73939", fontSize: '1.7rem'}}>Friend Request Sent to {username}</span>}
            {bye !== '' && <span style={{color: "#f73939", fontSize: '1.7rem'}}>You're no longer friends with {bye}</span>}
        </div>
    );
}

export default Friend;