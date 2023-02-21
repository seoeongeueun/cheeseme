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
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import { FetchAPIPost } from '../utils/api.js';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';

function Right({date, userId}){
    const [showSettings, setShowSettings] = useState(false);
    const [grid, setGrid] = useState(false);
    const [sns, setSns] = useState(true);

    const [heart, setHeart] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [likes, setLikes] = useState([]);

    const [open, setOpen] = useState(false);

    const [postImage, setPostImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [body, setBody] = useState();
    const [weather, setWeather] = useState('');

    const [found, setFound] = useState(false);

    const [hide, setHide] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [_id, setId] = useState('');
    const [showBookMark, setShowBookMark] = useState(false);
    const [showHome, setShowHome] = useState(false);
    const colorCode = ['rgba(253, 223, 126, 0.5)', 'rgba(103, 235, 250, 0.5)', 'rgba(250, 169, 157, 0.5)', 'rgba(206, 151, 251, 0.5)'];

    useEffect(() => {
        if (userId) {
            axios.get('/api/right/getByOwner/' + userId)
                .then((res) => {
                    const n = res?.data;
                    if (n) setAllPosts(n)
                    else setAllPosts([])
                })
                .catch((err) => {
                    console.log('Error loading posts')
                })
        }
    }, [userId]);

    useEffect(() => {
        if (_id === '') {
            axios.get('/api/right/getByOwner/' + userId)
            .then((res) => {
                setLoading(true);
                const n = res?.data;
                if (n) {
                    setAllPosts(n);
                }
                else {
                    setAllPosts([])
                }
                return;
            })
            .catch( (err) => {
                console.log('Error loading posts: ', err);
            })
        }
    }, [loading]);

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            const post = allPosts.find(p => p.date === date);
            if (post) {
                setBody(post?.text);
                setHeart(post?.like);
                setBookmark(post?.bookmark);
                setTitle(post?.title);
                setWeather(post?.weather);
                setLikes(post?.likes);
                setHide(post?.hide);
                setId(post?._id);
                setLoading(false);
            } else {
                setBody('');
                setTitle('');
                setHeart(false);
                setBookmark(false);
                setHide(false);
                setLikes([]);
                setWeather('');
                setId('')
                setLoading(true)
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [allPosts]);

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            const post = allPosts.find(p => p.date === date);
            if (post) {
                setBody(post?.text);
                setHeart(post?.like);
                setBookmark(post?.bookmark);
                setTitle(post?.title);
                setLikes(post?.likes);
                setWeather(post?.weather);
                setHide(post?.hide);
                setId(post?._id);
                setLoading(false);
            } else {
                setBody('');
                setTitle('');
                setHeart(false);
                setLikes([]);
                setBookmark(false);
                setHide(false);
                setWeather('');
                setId('')
                setLoading(true)
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [date]);

    const onClickHeart = async() => {
        if (_id !== '') {
            if (heart) {
                setHeart(false);
                setLikes(likes.filter(e => e !== userId))
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: false,
                    bookmark: bookmark,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: hide,
                    likes: likes.filter(e => e !== userId)
                });
            } else {
                setHeart(true);
                setLikes([...likes, userId]);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: true,
                    bookmark: bookmark,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: hide,
                    likes: [...likes, userId]
                });
            }
        }
    }

    const onClickBookmark = async() => {
        if (_id !== '') {
            if (bookmark) {
                setBookmark(false);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: heart,
                    bookmark: false,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: hide,
                    likes: likes
                });
            } else {
                setBookmark(true);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: heart,
                    bookmark: true,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: hide,
                    likes: likes
                });
            }
        }
    }

    const onClickLock = async() => {
        if (_id !== '') {
            if (hide) {
                setHide(false);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: heart,
                    bookmark: bookmark,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: false,
                    likes: likes
                });
            } else {
                setHide(true);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: heart,
                    bookmark: bookmark,
                    title: title,
                    text: body,
                    weather: weather,
                    hide: true,
                    likes: likes
                });
            }
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
        if (_id === ''){
            let res = await FetchAPIPost('/api/right/add/', {
                owner: userId,
                date: date,
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather,
                hide: hide,
                likes: likes
            });
            setLoading(false);
            console.log("create")
        } else {
            let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather,
                hide: hide,
                likes: likes
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
        if (_id !== '') {
            let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weatherOption,
                hide: hide,
                likes: likes
            });
        }

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
                                    <button onClick={onClickHeart}>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", position: 'relative'}}><span>1</span></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <button onClick={onClickBookmark}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <button onClick={onClickBookmark}>{bookmark ? <LockTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem"}}/>}</button>
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
                {showHome ? <div className='marker'>
                    <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                : <div className='marker2' style={{top: '6rem', background: 'rgba(247, 57, 57, 0.8)' }}>
                    <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
                <div className='marker2'>
                    <span>B</span>
                </div>
                <div className='marker2' style={{top: '15rem'}}/>
                {showBookMark ? <div className='marker4'>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                :
                <div className='marker3'>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
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
                                    <button onClick={onClickHeart}><span className='likes' style={{left: likes?.length > 10 && '59px' }}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
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
                                    <div className='leftWidget'>
                                        <button onClick={()=> setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                        {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                    </div>
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