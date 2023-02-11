import { useEffect, useState, useCallback, useRef } from 'react';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddFriend from './AddFriend.js';
import axios from 'axios';

function Notification(props){
    const [user, setUser] = useState('burgerpants')

    useEffect(() => {

        console.log('n: ', props.noti)
    }, [props.noti])

    const handleAccept = (id) => {
        const newState = props.noti.map(n => {
            if (n._id === id) {
                return {...n, done: true};
            }
            return n;
        });
        props.setNoti([{type: 'acceptRequest', from: user, to: 'sam', done: true, date: new Date().setHours(0, 0, 0, 0)}, ...newState]);
    }

    const handleDecline = (id) => {
        const newState = props.noti.map(n => {
            if (n._id === id) {
                return {...n, done: true};
            }
            return n;
        });
        props.setNoti([{type: 'declineRequest', from: user, to: 'sam', done: true, date: new Date().setHours(0, 0, 0, 0)}, ...newState]);
    }

    // {props.noti?.length > 0 ? props.noti.map((n) => (
    //     n.type === 'sendRequest' ?
    //         <div className='notiItem'>
    //             <span>{n.from} sent you a friend request</span>
    //             {n.done === false && 
    //                 <div className='notificationButtons'>
    //                     <button className='save' onClick={() => handleAccept(n._id)}>Accept</button>
    //                     <button className='cancel' onClick={() => handleDecline(n._id)}>Decline</button>
    //                 </div>
    //             }
    //         </div>
    //     : n.type === 'declineRequest' ? <div className='notiItem'>
    //         <span>You declined {n.to}'s friend request</span>
    //         </div>
    //         : n.type === 'acceptRequest' ? <div className='notiItem'>
    //             <span>You and {n.to} are now friends!</span>
    //             </div>
    //             : <span></span>
    // ))
    // : <span>No Notifications</span>}

    
    // {n.type === 'acceptRequest' && <div className='notiItem'><span>You and {n.to} are now friends!</span></div>}
    // {n.type === 'declineRequest' && <div className='notiItem'><span>You decliend {n.to}'s friend request</span></div>}

    return (
        <div className='settingsboxHeader'>
            <div className='friendHeader'>
                <div className='friendCount'>
                    <span>Notifications</span>
                </div>
            </div>
            <div className='notification'>
                {props.noti?.length > 0 && props.noti.map((n, i) => (
                    <div className='notiItem'>
                        <div className='notiItemContent'>
                            <span style={{marginRight: '1rem', color: !n.done || i === 0 ? 'black' : '#a0a096'}}>{new Date(n.date).getMonth()+1}/{new Date(n.date).getDate()}/{new Date(n.date).getFullYear()}</span>
                            {n.type === 'sendRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096', color: !n.done ? 'black' : '#a0a096'}}>{n.from} sent you a friend request</span>}
                            {n.type === 'acceptRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>You and {n.to} are now friends!</span>}
                            {n.type === 'declineRequest' && <span style={{color: i === 0 ? 'black' : '#a0a096'}}>You declined {n.to}'s friend request</span>}
                            </div>
                            {n.done === false && 
                                <div className='notificationButtons'>
                                    <button className='save2' onClick={() => handleAccept(n._id)}>Accept</button>
                                    <button className='cancel2' onClick={() => handleDecline(n._id)}>Decline</button>
                                </div>
                            }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;