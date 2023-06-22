import { useEffect, useState } from 'react';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddFriend from './AddFriend.js';
import { FetchAPIPost } from '../utils/api.js';
import axios from 'axios';

function Notification({name, notis, userId, onAddNoti, onToggleNoti, friends, onChangeFriends, onAddFriend}){
    const [friendsNoti, setFriendsNoti] = useState();
    const [tmpObj, setTmpObj] = useState();
    const [friendName, setFriendName] = useState('');
    const [friendFriends, setFriendFriends] = useState();
    const instance = axios.create({
        baseURL: "https://cheese-me.fly.dev/",
      });

    const updateFriendNoti = async() => {
        if (friendsNoti) {
            const newNoti = [tmpObj, ...friendsNoti]
            let res = await FetchAPIPost('/api/users/updateWithName/' + friendName, {
                notifications: newNoti.length > 5 ? newNoti.slice(0,5) : newNoti
            })
            if (res) {
                let res2 = await FetchAPIPost('/api/users/update/' + userId, {
                    notifications: notis.length > 5 ? notis.slice(0, 5) : notis
                });
                if (tmpObj.notiType === 'receiveAccept') {
                    onAddFriend(friendName);
                    let res3 = await FetchAPIPost('/api/users/updateWithName/' + friendName, {
                        friends: friendFriends.concat({name: name, fav: false})
                    });
                }
            }
        }
    }

    const updateFriends = async() => {
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            friends: friends
        })
    }


    useEffect(() => {
        if (friends){
            updateFriends();
        }
    }, [friends]);

    useEffect(() => {
        if (tmpObj) {
            updateFriendNoti()
        }
    }, [friendsNoti]);

    const handleAccept = async(id, from) => {
        onAddNoti({notiType: 'acceptRequest', from: name, to: from, done: true, date: new Date().setHours(0, 0, 0, 0)})
        setFriendName(from);
        instance.get('/api/users/' + from, {
            withCredentials: true
        })
            .then((res) => {
            if (res) {
                setFriendsNoti(res?.data.notifications);
                setFriendFriends(res?.data.friends);
            }
        })
        setTmpObj({notiType: 'receiveAccept', from: name, to: from, done: false, date: new Date().setHours(0, 0, 0, 0)})
        onToggleNoti(id)
    }

    const handleDecline = (id, from) => {
        onAddNoti({notiType: 'declineRequest', from: name, to: from, done: true, date: new Date().setHours(0, 0, 0, 0)})
        setFriendName(from);
        instance.get('/api/users/' + from, {
            withCredentials: true
        })
            .then((res) => {
            if (res) {
                setFriendsNoti(res?.data.notifications);
                setFriendFriends(res?.data.friends);
            }
        })
        setTmpObj({notiType: 'receiveDecline', from: name, to: from, done: false, date: new Date().setHours(0, 0, 0, 0)})
        onToggleNoti(id)
    }

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>Notifications</span>
                </div>
            </div>
            <div className='notification'>
                {notis?.length > 0 && notis.map((n, i) => (
                    <div className='notiItem' key={i}>
                        <div className='notiItemContent'>
                            <span style={{marginRight: '1rem', color: (!n.done && n.notiType === 'sendRequest')|| i === 0 ? 'black' : '#a0a096'}}>{new Date(n.date).getMonth()+1}/{new Date(n.date).getDate()}/{new Date(n.date).getFullYear()}</span>
                            {n.notiType === 'receiveAccept' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>{n.from} has accepted your friend request</span>}
                            {n.notiType === 'receiveDecline' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>{n.from} has declined your friend request</span>}
                            {n.notiType === 'sendRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096', color: !n.done ? 'black' : '#a0a096'}}>{n.from} sent you a friend request</span>}
                            {n.notiType === 'acceptRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>{n.to} is now your friend!</span>}
                            {n.notiType === 'declineRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>You declined friend request from {n.to}</span>}
                            {n.notiType === 'signUp' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>You joined CheeseMe</span>}
                            </div>
                            {n.notiType === 'sendRequest' && n.done === false && 
                                <div className='notificationButtons'>
                                    <button className='save2' onClick={() => handleAccept(n._id, n.from)}>Accept</button>
                                    <button className='cancel2' onClick={() => handleDecline(n._id, n.from)}>Decline</button>
                                </div>
                            }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;