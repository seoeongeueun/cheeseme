import { useEffect, useState } from 'react';
import DisplaySettings from '../modals/DisplaySettings';
import GridLines from 'react-gridlines';
import PlainRight from './PlainRight';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SadColor from '../icons/sad.png';
import HappyColor from '../icons/happy.png';
import SadPlain from '../icons/sad (1).png';
import HappyPlain from '../icons/happy (1).png';
import CloudColor from '../icons/cloud (1).png';
import CloudPlain from '../icons/cloud.png';
import UmbPlain from '../icons/umbrella (1).png';
import UmbColor from '../icons/umbrella.png';
import SunColor from '../icons/sunny (1).png';
import SunPlain from '../icons/sunny.png';
import SnowPlain from '../icons/snowman (1).png';
import SnowColor from '../icons/snowman.png';
import { FetchAPIPost } from '../utils/api.js';
import axios from 'axios';

function Right({date}){
    const [showSettings, setShowSettings] = useState(false);
    const [grid, setGrid] = useState(false);
    const [sns, setSns] = useState(true);

    const [heart, setHeart] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const [open, setOpen] = useState(false);

    const [postImage, setPostImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [body, setBody] = useState();
    const [weather, setWeather] = useState('');

    const [found, setFound] = useState(false);
    
    useEffect(() => {
        axios.get('/api/right/' + date)
            .then( (res) => {
                const n = res?.data;
                if (n){
                    setBody(n.text);
                    setHeart(n.like);
                    setBookmark(n.bookmark);
                    setTitle(n.title);
                    setWeather(n.weather);
                    setFound(true);
                } else {
                    setBody("");
                    setHeart(false);
                    setBookmark(false);
                    setTitle("")
                    setWeather("")
                    setFound(false);
                }
                return;
            })
            .catch( (err) => {
                console.log('Error loading right post: ', err);
                setFound(false);
            })
    }, [date])

    useEffect(() => {
        console.log('edit: ', edit)

    }, [showSettings, grid, sns, edit]);

    useEffect(() => {

    }, [heart, postImage, weather])

    const onClickHeart = async() => {
        if (heart) {
            setHeart(false);
            let res = await FetchAPIPost('/api/right/update/' + date, {
                like: false,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather
            });
        } else {
            setHeart(true);
            let res = await FetchAPIPost('/api/right/update/' + date, {
                like: true,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather
            });
        }
    }

    const onClickBookmark = async() => {
        if (bookmark) {
            setBookmark(false);
            let res = await FetchAPIPost('/api/right/update/' + date, {
                like: heart,
                bookmark: false,
                title: title,
                text: body,
                weather: weather
            });
        } else {
            setBookmark(true);
            let res = await FetchAPIPost('/api/right/update/' + date, {
                like: heart,
                bookmark: true,
                title: title,
                text: body,
                weather: weather
            });
        }
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const onUploadImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setPostImage(true)
          }
    };

    const handleSave = async() => {
        setEdit(false);
        if (!found){
            let res = await FetchAPIPost('/api/right/add/', {
                date: date,
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather
            });
            setFound(true)
            console.log("create")
        } else {
            let res = await FetchAPIPost('/api/right/update/' + date, {
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather
            });

            console.log("update")
        }
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleWeather = async(weatherOption) => {
        if (weatherOption === 'sunny') setWeather('sunny')
        if (weatherOption === 'cloud') setWeather('cloud')
        if (weatherOption === 'rainy') setWeather('rainy')
        if (weatherOption === 'snowy') setWeather('snowy')
        let res = await FetchAPIPost('/api/right/update/' + date, {
            like: heart,
            bookmark: bookmark,
            title: title,
            text: body,
            weather: weatherOption
        });
    }

    /*<span className="profileArea"/>*/

    return(
        <div className="rightInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} lineColor={"#e5e5e5"} lineColor2={"#efefef"}>
                <div className="rightContent">
                    {edit ? <div className="rightHeader">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div> : <span style={{textAlign: 'center'}}>{title}</span>}
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span className="profileArea"/>
                        </div>
                        <div className="rightBodyMain">
                            {postImage ?
                                <IconButton disabled={!edit} className="uploadIconWithImage" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                    <input hidden accept="image/*" type="file" onChange={onUploadImage}/>
                                    <img src={URL.createObjectURL(selectedImage)} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>
                                </IconButton>
                                :   <IconButton className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" onChange={onUploadImage}/>
                                        <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>
                                    </IconButton>}
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button onClick={onClickHeart}>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <button onClick={onClickBookmark}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button onClick={() => setEdit(!edit)}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                    <button onClick={handleClickOpen}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                        <DialogTitle >{"Delete this post?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>This post will be permanently deleted.</DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Confirm</Button>
                                            <Button onClick={handleClose} autoFocus>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                </div>
                            </div>
                            {edit ? 
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                                <div className="inputButtons">
                                    <button className="save" onClick={handleSave}>Save</button>
                                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div> : <div className='postInput2'><span>{body}</span></div>}
                        </div>
                    </div> : <PlainRight grid={grid} setGrid={setGrid} sns={sns} setSns={setSns} edit={edit} setEdit={setEdit} date={date}/>}
                </div>
            </GridLines> :
            <div className="rightContent">
                    {edit ? <div className="rightHeader">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div> : <span style={{textAlign: 'center'}}>{title}</span>}
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span>{new Date(date).getMonth()+1}.{new Date(date).getDate()}.{new Date(date).getFullYear()}</span>
                            <div className='weatherMood'>
                                <button onClick={() => handleWeather('sunny')}><img alt= "sunny" src={weather === 'sunny' ? SunColor : SunPlain}/></button>
                                <button onClick={() => handleWeather('cloud')}><img alt= "cloud" src={weather === 'cloud' ? CloudColor : CloudPlain}/></button>
                                <button onClick={() => handleWeather('rainy')}><img alt= "rainy" src={weather === 'rainy' ? UmbColor : UmbPlain}/></button>
                                <button onClick={() => handleWeather('snowy')}><img alt= "snowy" src={weather === 'snowy' ? SnowColor : SnowPlain}/></button>
                            </div>
                        </div>
                        <div className="rightBodyMain">
                            {postImage ?
                                <IconButton disabled={!edit} className="uploadIconWithImage" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                    <input hidden accept="image/*" type="file" onChange={onUploadImage}/>
                                    <img src={URL.createObjectURL(selectedImage)} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>
                                </IconButton>
                                :   <IconButton className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" onChange={onUploadImage}/>
                                        <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>
                                    </IconButton>}
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button onClick={onClickBookmark}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    <button onClick={onClickHeart}>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button onClick={() => setEdit(true)}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                    <button onClick={handleClickOpen}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                        <DialogTitle>{"Delete this post?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>This post will be permanently deleted.</DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Confirm</Button>
                                            <Button onClick={handleClose} autoFocus>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <button onClick={()=> setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                </div>
                            </div>
                            {edit ? 
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                                <div className="inputButtons">
                                    <button className="save" onClick={handleSave}>Save</button>
                                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div> : <div className='postInput2'>
                                        <span>{body}</span>
                                    </div>}
                        </div>
                    </div> : <PlainRight grid={grid} setGrid={setGrid} setSns={setSns} sns={sns} edit={edit} setEdit={setEdit} date={date}/>}
                </div>}
        </div>
    );
}

export default Right;