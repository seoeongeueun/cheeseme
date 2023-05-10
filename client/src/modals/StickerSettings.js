import { useEffect, useState } from 'react';
import { FetchAPIPost, FetchApiDelete} from '../utils/api.js';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import axios from 'axios';

function StickerSettings(props){
    const [stickers, setStickers] = useState(props.stickers)

    const update = async() => {
        let res = await FetchAPIPost('/api/users/update/' + props.userId, {
            stickers: stickers
        });
    }

    useEffect(() => {
        
        if (stickers?.length > 0 && props.userId) {
            update();
        }
    }, [stickers])

    const handleStickerDelete = async(name) => {
        let imgSrc = stickers.find(s => s.name === name).imgSrc;
        axios.post('/deleteImg/' + imgSrc.replace(/^images\\/i, ''))
            .then((res) => {
                console.log(res);
        })
        setStickers(stickers.filter(s=> s.name !== name));
        props.setStickers(stickers.filter(s=> s.name !== name));
        props.setStickerList(props.stickerList.filter(s => s.name !== name));
        if (stickers.filter(s=> s.name !== name).length === 0) {
            let res = await FetchAPIPost('/api/users/update/' + props.userId, {
                stickers: []
            });
        }
    }

    const handleStickerClick = (name) => {
        setStickers(stickers.map(s =>
                s.name === name
                ? { ...s, show: !s.show}
                : s
        ))
        props.setStickers(stickers.map(s =>
            s.name === name
            ? { ...s, show: !s.show}
            : s
        ))
    }

    return(
        <div className="settingsbox">
            <span className='settingsboxTitle'>Sticker Settings</span>
            <div className='checkboxStickers'>
                {stickers?.length > 0 && stickers.map((s, index) => 
                    <div className="checkboxButton">
                        <input type="checkbox" name="checkTodo" checked={s.show} onChange={() => handleStickerClick(s.name)}/>
                        <label>{s.name}</label>
                        <ClearRoundedIcon onClick={() => handleStickerDelete(s.name)} sx={{fontSize: '1.2rem', color: '#f73939', marginLeft: '1rem', cursor: 'pointer'}}/>
                    </div>
                )}
                {stickers?.length === 0 && <span>No Stickers Yet</span>}
            </div>
        </div>
    );
}

export default StickerSettings;