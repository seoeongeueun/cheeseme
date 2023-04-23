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
import { FetchAPIPost, FetchAPIPostImg } from '../utils/api.js';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import axios from 'axios';

function Right({date, userId, friendId, onSetFriendId, onChangeDate}){
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
    const [showHome, setShowHome] = useState(true);
    const [currentFriendName, setCurrentFriendName] = useState('');
    const [index, setIndex] = useState(0);

    const [value, setValue] = useState(0);
    const [message, setMessage] = useState('');
    const [imgUrl, setImgUrl] = useState();
    
    const colorCode = ['rgba(253, 223, 126, 0.5)', 'rgba(103, 235, 250, 0.5)', 'rgba(250, 169, 157, 0.5)', 'rgba(206, 151, 251, 0.5)'];

    useEffect(() => {
        if (userId) {
            axios.get('/api/right/getByOwner/' + userId)
                .then((res) => {
                    const n = res?.data;
                    if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                    else setAllPosts([])
                })
                .catch((err) => {
                    console.log('Error loading posts')
                })
        }
    }, [userId]);

    useEffect(() => {
        if (friendId !== '') {
            axios.get('/api/right/getByOwner/' + friendId)
                .then((res) => {
                    const n = res?.data;
                    if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                    else setAllPosts([])
                })
                .catch((err) => {
                    console.log('Error loading posts: ', err)
                })
            axios.get('/api/users/find/' + friendId)
                .then((res) => {
                    const n = res?.data;
                    if (n) setCurrentFriendName(n.name);
                })
        }
    }, [friendId]);

    useEffect(() => {
        if (_id === '') {
            if (friendId !== '') {
                axios.get('/api/right/getByOwner/' + friendId)
                .then((res) => {
                    setLoading(true);
                    const n = res?.data;
                    if (n) {
                        setAllPosts(n.sort((a, b) => a.date - b.date));
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
            else {
                axios.get('/api/right/getByOwner/' + userId)
                .then((res) => {
                    setLoading(true);
                    const n = res?.data;
                    if (n) {
                        setAllPosts(n.sort((a, b) => a.date - b.date))
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
            
        }
    }, [loading]);

    useEffect(() => {
        if (imgUrl === undefined) {
            setImgUrl('');
            setPostImage(false);
        }
    }, [imgUrl])

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            if ((userId === friendId && userId !== '') || (friendId === '' && userId !== '')) {
                const post = allPosts.find(p => p.date === date);
                if (post) {
                    setIndex(allPosts.indexOf(post))
                    setBody(post?.text);
                    setHeart(post?.like);
                    setBookmark(post?.bookmark);
                    setTitle(post?.title);
                    setWeather(post?.weather);
                    setLikes(post?.likes);
                    setHide(post?.hide);
                    setId(post?._id);
                    setImgUrl(post?.imgUrl)
                    setPostImage(post?.imgUrl !== '' ? true : false);
                    setMessage('')
                    setLoading(false);
                } else {
                    setIndex(-1)
                    setBody('');
                    setTitle('');
                    setHeart(false);
                    setImgUrl('');
                    setBookmark(false);
                    setHide(false);
                    setLikes([]);
                    setWeather('');
                    setId('')
                    setPostImage(false);
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setLoading(true)
                }
            }
            else {
                const post = allPosts.find(p => p.date === date);
                if (post) {
                    if (post.hide) {
                        setIndex(post ? allPosts.indexOf(post) : 0)
                        setBody('');
                        setImgUrl('');
                        setTitle('');
                        setHeart(false);
                        setBookmark(false);
                        setHide(true);
                        setLikes([]);
                        setWeather('');
                        setId('')
                        setMessage('This post is private');
                        setLoading(true);
                        setPostImage(false);
                    }
                    else {
                        setIndex(allPosts.indexOf(post))
                        setBody(post?.text);
                        setImgUrl(post?.imgUrl);
                        setHeart(post?.like);
                        setBookmark(post?.bookmark);
                        setPostImage(post?.imgUrl !== '' ? true : false);
                        setTitle(post?.title);
                        setWeather(post?.weather);
                        setLikes(post?.likes);
                        setHide(post?.hide);
                        setId(post?._id);
                        setMessage('');
                        setLoading(false);
                    }
                }
                else {
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setIndex(-1)
                    setBody('');
                    setImgUrl('')
                    setTitle('');
                    setHeart(false);
                    setBookmark(false);
                    setHide(false);
                    setLikes([]);
                    setWeather('');
                    setId('')
                    setLoading(true);
                    setPostImage(false);
                }
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [allPosts]);

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            if ((userId === friendId && userId !== '') || (friendId === '' && userId !== '')) {
                const post = allPosts.find(p => p.date === date);
                // console.log(new Date(date).toString());
                if (post) {
                    setIndex(allPosts.indexOf(post))
                    setBody(post?.text);
                    setImgUrl(post?.imgUrl);
                    setPostImage(post?.imgUrl !== '' ? true : false);
                    setHeart(post?.like);
                    setBookmark(post?.bookmark);
                    setTitle(post?.title);
                    setWeather(post?.weather);
                    setLikes(post?.likes);
                    setHide(post?.hide);
                    setId(post?._id);
                    setMessage('');
                    setLoading(false);
                } else {
                    setIndex(-1)
                    setBody('');
                    setImgUrl('')
                    setTitle('');
                    setPostImage(false);
                    setHeart(false);
                    setBookmark(false);
                    setHide(false);
                    setLikes([]);
                    setWeather('');
                    setId('');
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setLoading(true)
                }
            }
            else {
                const post = allPosts.find(p => p.date === date);
                if (post) {
                    if (post.hide) {
                        setIndex(post ? allPosts.indexOf(post) : 0)
                        setBody('');
                        setImgUrl('')
                        setTitle('');
                        setPostImage(false);
                        setHeart(false);
                        setBookmark(false);
                        setHide(true);
                        setLikes([]);
                        setWeather('');
                        setId('')
                        setMessage('This post is private');
                        setLoading(true)
                    }
                    else {
                        setIndex(allPosts.indexOf(post))
                        setBody(post?.text);
                        setImgUrl(post?.imgUrl);
                        setPostImage(post?.imgUrl !== '' ? true : false);
                        setHeart(post?.like);
                        setBookmark(post?.bookmark);
                        setTitle(post?.title);
                        setWeather(post?.weather);
                        setLikes(post?.likes);
                        setHide(post?.hide);
                        setId(post?._id);
                        setMessage('')
                        setLoading(false);
                    }
                }
                else {
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setIndex(-1)
                    setBody('');
                    setPostImage(false);
                    setImgUrl('');
                    setTitle('');
                    setHeart(false);
                    setBookmark(false);
                    setHide(false);
                    setLikes([]);
                    setWeather('');
                    setId('')
                    setLoading(true);
                }
            }
        } else {
            setId('');
            setLoading(true);
        }
    }, [date]);

    useEffect(() => {
        if (value) {
            const post = allPosts[value];
            if (post) {
                onChangeDate(post?.date);
            }
            else{
                console.log('no postttttt')
            }
        }
        else if (value === 0){
            const post = allPosts[0];
            if (post) {
                onChangeDate(post?.date);
            }
            else{
                console.log('no postttttt')
            }
        }
    }, [value]);

    useEffect(() => {
        if (index) {
            setValue(index)
        }
        if (index === 0) {
            setValue(0)
        }
    }, [index]);

    useEffect(() => {
        if (edit) {
            setMessage('');
        }
    }, [edit])

    useEffect(() => {
        if (imgUrl !== '' && postImage) {
            setSelectedImage(null);
        }
    }, [imgUrl, postImage])

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
                    likes: likes.filter(e => e !== userId),
                    imgUrl: imgUrl
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
                    likes: [...likes, userId],
                    imgUrl: imgUrl
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
                    likes: likes,
                    imgUrl: imgUrl
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
                    likes: likes,
                    imgUrl: imgUrl
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
                    likes: likes,
                    imgUrl: imgUrl
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
                    likes: likes,
                    imgUrl: imgUrl
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
        let imgPath = '';
        console.log('heee: ', selectedImage)
        if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);
            const res = await axios({
                method: 'POST',
                url: '/upload',
                data: formData,
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            imgPath = res?.data;
            setImgUrl(imgPath);
        }
        
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
                likes: likes,
                imgUrl: imgPath
            });
            setLoading(false);
            console.log("created")
        } else {
            let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                like: heart,
                bookmark: bookmark,
                title: title,
                text: body,
                weather: weather,
                hide: hide,
                likes: likes,
                imgUrl: imgPath
            });
            console.log("updated")
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
                likes: likes,
            });
        }

    }

    const handleClickHome = () => {
        onSetFriendId('');
        setCurrentFriendName('')
        setId('');
        setIndex(-1);
        onChangeDate(new Date().setHours(0, 0, 0, 0))
        setLoading(true);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                                    {/* <img src={URL.createObjectURL(selectedImage)} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/> */}
                                    <img src={imgUrl ? imgUrl.replace(/\.\.\/client\//g, "../../") : URL.createObjectURL(selectedImage)} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>

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
                                    <button onClick={() => setEdit(edit)}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
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
                {/*here*/}
            </GridLines> :
            <div className="rightContent">
                {friendId === '' ? <div className='marker'>
                    <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                : <div className='marker2' style={{top: '6rem', background: 'rgba(233, 233, 233, 0.7)' }}>
                    <span onClick={() => handleClickHome()}><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
                {(friendId !== '' && currentFriendName !== '') ? <div className='marker' style={{top: '12rem', background: 'rgba(249, 216, 118, 0.8)'}}>
                    <span><PeopleRoundedIcon style={{fontSize: '1.7rem'}}/></span>
                </div>
                : <div className='marker2'/>}
                {showBookMark ? <div className='marker4'>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                :
                <div className='marker3'>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
                    <div className='rightBodyAndHeader'>
                    {edit ? <div className="rightHeader">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div> : <span style={{textAlign: 'center'}}>{title}</span>}
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader" style={{margin: (title !== '' && !edit) && '0.1rem 0 1rem 0' }}>
                            <span>{new Date(date).getMonth()+1}/{new Date(date).getDate()}/{new Date(date).getFullYear()}</span>
                            <div className='weatherMood'>
                                <button onClick={() => handleWeather('sunny')} disabled={friendId !== '' ? true : false}><img alt= "sunny" src={weather === 'sunny' ? SunColor : SunPlain}/></button>
                                <button onClick={() => handleWeather('cloud')} disabled={friendId !== '' ? true : false}><img alt= "cloud" src={weather === 'cloud' ? CloudColor : CloudPlain}/></button>
                                <button onClick={() => handleWeather('rainy')} disabled={friendId !== '' ? true : false}><img alt= "rainy" src={weather === 'rainy' ? UmbColor : UmbPlain}/></button>
                                <button onClick={() => handleWeather('snowy')} disabled={friendId !== '' ? true : false}><img alt= "snowy" src={weather === 'snowy' ? SnowColor : SnowPlain}/></button>
                            </div>
                        </div>
                        <div className="rightBodyMain">
                            {postImage ?
                                    <IconButton disabled={!edit} className="uploadIconWithImage" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                        <img src={imgUrl === '' && selectedImage ? URL.createObjectURL(selectedImage) : imgUrl} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>
                                    </IconButton>
                                :   
                                    <IconButton disabled={!edit} className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                        {edit && <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>}
                                    </IconButton>}
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button onClick={onClickBookmark} disabled={friendId !== '' ? true : false}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    <button onClick={onClickHeart}><span className='likes' style={{left: likes?.length > 10 && '59px', color: 'black'}}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    {friendId === '' ? <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                    : <button disabled={true} className='tooltip'><LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/></button>}
                                </div>
                                <div className="postButtonsRight">
                                    <button onClick={() => setEdit(true)} disabled={friendId !== '' ? true : false}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                    <button onClick={handleClickOpen} disabled={friendId !== '' ? true : false}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
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
                                        <button onClick={()=> setShowSettings(!showSettings)} disabled={friendId !== '' ? true : false}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                        {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                    </div>
                                </div>
                            </div>
                            {message !== '' && <span className='errorMessage'>{message.toUpperCase()}</span>}

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
                    </div>
                    {!edit&& <div className='rightFooter'>
                                <div className='pageSlider'>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack className='pageSliderStack' spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                            <span style={{marginBottom: '-1.5rem'}}>1</span>
                                            <Slider aria-label="Posts" key={`slider-${value}`} min={0} max={allPosts?.length-1} defaultValue={value} onChange={handleChange} sx={{color: '#F9D876'}} valueLabelDisplay="auto"/>
                                            <span style={{marginBottom: '-2.2rem'}}>{allPosts?.length}</span>
                                        </Stack>
                                    </Box>
                                </div>
                                <div className='pageSliderButtons'>
                                    <button onClick={() => setValue(value < 1 ? 0 : value-1)}><ArrowBackIosNewRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                    <span style={{marginBottom: '2rem'}}>{currentFriendName !== '' ? `@ ${currentFriendName.toUpperCase()}'s posts` : '@ My posts'} </span>
                                    <button onClick={() => setValue(value > allPosts?.length ? allPosts?.length : value + 1)}><ArrowForwardIosRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                </div>
                            </div>}
            </div>}
        </div>
    );
}

export default Right;