import { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Draggable from 'react-draggable';
import axios from 'axios';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';

function Reminder({move, onCreate, onToggle, onDelete, date}){

    return (
        <div className='reminderWidget'>
        
        </div>
    )

}

export default Reminder;