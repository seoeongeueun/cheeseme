import { useEffect, useState, useRef } from 'react';
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
import { FetchAPIPost, FetchAPIPostImg, FetchApiDelete } from '../utils/api.js';
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
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import BookmarkPosts from './BookmarkPosts.js';

function Right({date, userId, friendId, onSetFriendId, onChangeDate, name}){
    const [showSettings, setShowSettings] = useState(false);
    const [grid, setGrid] = useState(false);
    const [plain, setPlain] = useState(false);

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

    const [closeQuill, setCloseQuill] = useState(true);
    const [tmpBody, setTmpBody] = useState(null);
    const [openBookmark, setOpenBookmark] = useState(false);
    const quillRef = useRef();
    
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
        } else {
            setAllPosts([]);
            onSetFriendId('');
        }
    }, [userId]);

    useEffect(() => {
        if (friendId !== '' && friendId !== undefined && userId) {
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
            if (friendId !== '' && userId) {
                axios.get('/api/right/getByOwner/' + friendId)
                .then((res) => {
                    setLoading(true);
                    const n = res?.data;
                    if (n) {
                        setAllPosts(n.sort((a, b) => a.date - b.date));
                    }
                    else {
                        setAllPosts([]);
                    }
                    return;
                })
                .catch( (err) => {
                    console.log('Error loading posts: ', err);
                })
            }
            else {
                if (userId) {
                    axios.get('/api/right/getByOwner/' + userId)
                        .then((res) => {
                        setLoading(true);
                        const n = res?.data;
                        if (n) {
                            setAllPosts(n.sort((a, b) => a.date - b.date))
                        }
                        else {
                            setAllPosts([]);
                            setIndex(-1)
                            setBody('');
                            setTitle('');
                            setHeart(false);
                            setImgUrl('');
                            setBookmark(false);
                            setHide(false);
                            setLikes([]);
                            setWeather('');
                            setId('');
                            setPostImage(false);
                            setGrid(false);
                            setPlain(false);
                            setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                        }
                        return;
                    })
                    .catch( (err) => {
                        console.log('Error loading posts: ', err);
                    })
                }
            }
            
        }
    }, [loading, friendId]);

    useEffect(() => {
        if (imgUrl === undefined) {
            setImgUrl('');
            setPostImage(false);
        }
    }, [imgUrl]);

    useEffect(() => {
        if (!userId && body) {
            setMessage('');
            setImgUrl('')
        }
    }, [body]);

    useEffect(() => {
        if (!userId && !edit) {
            setBody('');
            setTitle('');
            setImgUrl('');
            setSelectedImage(null);
            setPostImage(false);
        }
    }, [date])

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            if ((userId === friendId && userId !== '') || (friendId === '' && userId !== '')) {
                const post = allPosts.find(p => `${new Date(p.date).getMonth()+1}.${new Date(p.date).getDate()}.${new Date(p.date).getFullYear()}` === `${new Date(date).getMonth()+1}.${new Date(date).getDate()}.${new Date(date).getFullYear()}`);
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
                    setGrid(post?.grid);
                    setPlain(post?.plain);
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
                    setGrid(false);
                    setPlain(false);
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setLoading(true);
                }
            }
            else {
                const post = allPosts.find(p => `${new Date(p.date).getMonth()+1}.${new Date(p.date).getDate()}.${new Date(p.date).getFullYear()}` === `${new Date(date).getMonth()+1}.${new Date(date).getDate()}.${new Date(date).getFullYear()}`);
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
                        setId('');
                        setGrid(false);
                        setPlain(false);
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
                        setGrid(post?.grid);
                        setPlain(post?.plain);
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
                    setGrid(false);
                    setPlain(false);
                    setId('');
                    setLoading(true);
                    setPostImage(false);
                }
            }
        } else {
            setId('');
            setLoading(true);
            if (allPosts.length === 0) {
                setIndex(-1)
                setBody('');
                setTitle('');
                setHeart(false);
                setImgUrl('');
                setBookmark(false);
                setHide(false);
                setLikes([]);
                setWeather('');
                setId('');
                setGrid(false);
                setPlain(false);
                setPostImage(false);
                setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
            }
        }
    }, [allPosts]);

    useEffect(() => {
        if (allPosts?.length > 0 && date) {
            if ((userId === friendId && userId !== '') || (friendId === '' && userId !== '')) {
                const post = allPosts.find(p => `${new Date(p.date).getMonth()+1}.${new Date(p.date).getDate()}.${new Date(p.date).getFullYear()}` === `${new Date(date).getMonth()+1}.${new Date(date).getDate()}.${new Date(date).getFullYear()}`);
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
                    setGrid(post?.grid);
                    setPlain(post?.plain);
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
                    setGrid(false);
                    setPlain(false);
                    setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`)
                    setLoading(true)
                }
            }
            else {
                const post = allPosts.find(p => `${new Date(p.date).getMonth()+1}.${new Date(p.date).getDate()}.${new Date(p.date).getFullYear()}` === `${new Date(date).getMonth()+1}.${new Date(date).getDate()}.${new Date(date).getFullYear()}`);
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
                        setGrid(false);
                        setPlain(false);
                        setWeather('');
                        setId('');
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
                        setGrid(post?.grid);
                        setPlain(post?.plain);
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
                    setGrid(false);
                    setPlain(false);
                    setLikes([]);
                    setWeather('');
                    setId('')
                    setLoading(true);
                }
            }
        } else {
            setId('');
            setLoading(true);
            setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`);

        }
    }, [date]);

    useEffect(() => {
        if (value) {
            const post = allPosts[value];
            if (post) {
                onChangeDate(post?.date);
            }
            else{

            }
        }
        else if (value === 0){
            const post = allPosts[0];
            if (post) {
                onChangeDate(post?.date);
            }
            else{
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
        if (imgUrl !== '' && postImage) {
            setSelectedImage(null);
        }
    }, [imgUrl, postImage]);

    useEffect(() => {
        if (openBookmark) {
            setShowBookMark(true);
        } else {
            setShowBookMark(false);
        }
    }, [openBookmark]);

    useEffect(() => {
        if (friendId === '') {
            setCurrentFriendName('')
        }
    }, [friendId])

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
                    imgUrl: imgUrl,
                    grid: grid,
                    plain: plain
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
                    imgUrl: imgUrl,
                    grid: grid,
                    plain: plain
                });
            }
        }
    }

    const onClickBookmark = async() => {
        if (_id !== '') {
            if (bookmark) {
                setBookmark(false);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    bookmark: false,
                });
                if (res) axios.get('/api/right/getByOwner/' + userId)
                    .then((res) => {
                    const n = res?.data;
                    if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                    else setAllPosts([])
                })
                .catch((err) => {
                    console.log('Error loading posts')
                })
            } else {
                setBookmark(true);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    bookmark: true,
                });
                if (res) axios.get('/api/right/getByOwner/' + userId)
                    .then((res) => {
                    const n = res?.data;
                    if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                    else setAllPosts([])
                })
                .catch((err) => {
                    console.log('Error loading posts')
                })                
            }
        }
    }

    const onClickLock = async() => {
        if (_id !== '') {
            if (hide) {
                setHide(false);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    hide: false,
                });
            } else {
                setHide(true);
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    hide: true,
                });
            }
        } else {
            setHide(!hide);
        }
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleDelete = async() => {
        setOpen(false);
        if (date) {
            let res = await FetchApiDelete('/api/right/delete/' + date);
            axios.post('/deleteImg/' + imgUrl.replace(/^images\\/i, ''))
                .then((res) => {
                    console.log(res);
            })
            setBody('');
            setTitle('');
            setHeart(false);
            setImgUrl('');
            setBookmark(false);
            setHide(false);
            setLikes([]);
            setWeather('');
            setGrid(false);
            setPlain(false);
            setId('')
            setPostImage(false);
            setMessage(`No Post On ${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`);
            setAllPosts(allPosts.filter(e => e.date !== date));
            setIndex(0);
        }
    };

    const handleClose = async() => {
        setOpen(false);
    }
    const onUploadImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPostImage(true);
            setSelectedImage(e.target.files[0]);
          }
    };

    const handleSave = async() => {
        setEdit(false);
        let tmp = '';
        setTitle(document.getElementById("rightTitle").value);
        if (plain) {
            tmp = quillRef.current.editor.container.firstChild.innerHTML;
            setBody(tmp);
            setCloseQuill(true);
        } else {
            setBody(document.getElementById("text").value);
        }
        let tmpText = document.getElementById("text")?.value;
        let tmpTitle = document.getElementById("rightTitle").value;
        let imgPath = '';
        console.log('heee: ', selectedImage)
        if (selectedImage && userId) {
            const formData = new FormData();
            formData.append("image", selectedImage);
            const res = await axios({
                method: 'POST',
                url: '/upload',
                data: formData,
                header: {
                    'Access-Control-Allow-Origin': 'https://main--cheeseme.netlify.app',
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            imgPath = res?.data;
            setImgUrl(imgPath);
            setSelectedImage(null);
        }
        
        if (_id === '' && userId){
            let res = await FetchAPIPost('/api/right/add/', {
                owner: userId,
                date: date,
                like: heart,
                bookmark: bookmark,
                title: tmpTitle,
                text: plain ? tmp : tmpText,
                weather: weather,
                hide: hide,
                likes: likes,
                imgUrl: imgPath !== '' ? imgPath : imgUrl,
                grid: grid,
                plain: plain
            });
            console.log("created");
            setMessage('');
            if (res) axios.get('/api/right/getByOwner/' + userId)
            .then((res) => {
                const n = res?.data;
                if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                else setAllPosts([])
            })
            .catch((err) => {
                console.log('Error loading posts')
            })
        } else {
            if (userId) {
                let res = await FetchAPIPost('/api/right/updateById/' + _id, {
                    like: heart,
                    bookmark: bookmark,
                    title: tmpTitle,
                    text: plain ? tmp : tmpText,
                    weather: weather,
                    hide: hide,
                    likes: likes,
                    imgUrl: imgPath !== '' ? imgPath : imgUrl,
                    grid: grid,
                    plain: plain
                });
                console.log("updated");
                if (res) axios.get('/api/right/getByOwner/' + userId)
                    .then((res) => {
                        const n = res?.data;
                        if (n) setAllPosts(n.sort((a, b) => a.date - b.date))
                        else setAllPosts([])
                    })
                    .catch((err) => {
                        console.log('Error loading posts')
                })
            }
            
            
        }
        setTmpBody(null);

    }

    const handleCancel = () => {
        setEdit(false);
        if (plain) {
            setCloseQuill(true);
            setTmpBody(null)
        }
        if (_id === '') {
            setBody('');
            setSelectedImage(null);
            setPostImage(false);
        }
        setHide(false);
    }

    const handleEdit = () => {
        setEdit(true);
        if (plain) setCloseQuill(false);
    }

    useEffect(() => {
        if (tmpBody) {
        } 
    }, [tmpBody])

    const handleWeather = async(weatherOption) => {
        if (plain) setTmpBody(quillRef.current.editor.container.firstChild.innerHTML);
        if (weatherOption === 'sunny') setWeather('sunny')
        if (weatherOption === 'cloud') setWeather('cloud')
        if (weatherOption === 'rainy') setWeather('rainy')
        if (weatherOption === 'snowy') setWeather('snowy')
    }

    const handleClickHome = () => {
        console.log('ye?')
        setOpenBookmark(false);
        setShowBookMark(false);
        onSetFriendId('');
        setCurrentFriendName('')
        setId('');
        setIndex(-1);
        onChangeDate(new Date().setHours(0, 0, 0, 0));
        setLoading(true);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /*<span className="profileArea"/>*/

    return(
        <div className="rightInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} lineColor={"#e1e1e1"}>
            <div className="rightContent">
                {friendId === '' && !openBookmark ? <div className='marker'>
                    <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                : <div className='marker2' onClick={() => handleClickHome()} style={{top: '6rem', background: 'rgba(249, 216, 118, 0.8)' }}>
                    <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
                {(friendId !== '' && currentFriendName !== '') ? <div className='marker' style={{top: '12rem', background: 'rgba(249, 216, 118, 0.8)'}}>
                    <span><PeopleRoundedIcon style={{fontSize: '1.7rem'}}/></span>
                </div>
                : <div className='marker2'/>}
                {showBookMark ? <div className='marker4'>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>
                :
                <div className='marker3' onClick={() => {setOpenBookmark(true); setShowBookMark(true);}}>
                    <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                </div>}
                {openBookmark ? <BookmarkPosts allPosts={allPosts} setOpenBookmark={setOpenBookmark} userId={userId} friendId={friendId} onSetFriendId={onSetFriendId}/>
                    : <div className='rightBodyAndHeader'>
                    {edit ? <div className="rightHeader">
                        <input id='rightTitle' type="text" defaultValue={title}/>
                    </div> : <span style={{textAlign: 'center'}}>{title}</span>}
                    <div className="rightBody" style={{maxHeight: (plain && edit) && '90%', justifyContent: (plain && !edit) && 'flex-start'}}>
                        <div className="rightBodyHeader" style={{margin: (title !== '' && !edit) && '0.1rem 0 1rem 0' }}>
                            <span>{new Date(date).getMonth()+1}/{new Date(date).getDate()}/{new Date(date).getFullYear()}</span>
                            <div className='weatherMood'>
                                <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('sunny')} disabled={friendId !== '' || !edit ? true : false}><img alt= "sunny" src={weather === 'sunny' ? SunColor : SunPlain}/></button>
                                <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('cloud')} disabled={friendId !== '' || !edit ? true : false}><img alt= "cloud" src={weather === 'cloud' ? CloudColor : CloudPlain}/></button>
                                <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('rainy')} disabled={friendId !== '' || !edit ? true : false}><img alt= "rainy" src={weather === 'rainy' ? UmbColor : UmbPlain}/></button>
                                <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('snowy')} disabled={friendId !== '' || !edit ? true : false}><img alt= "snowy" src={weather === 'snowy' ? SnowColor : SnowPlain}/></button>
                            </div>
                        </div>
                        
                            {plain ?
                            <div className='plainRight'>
                            <ReactQuill 
                                ref={quillRef} 
                                readOnly={closeQuill}
                                style={{border: 'none', height: edit && '100%'}}
                                modules={closeQuill ? Right.modules2 : Right.modules}
                                formats={Right.formats}
                                placeholder="Let's start writing!"
                                value={tmpBody ? tmpBody : body}>
                                <div className="ql-container" style={{height: edit && '80%', border: '1px solid black'}}/>
                            </ReactQuill>
                            {!closeQuill ?
                                <div className="inputButtons">
                                    <button className="save" onClick={handleSave}>SAVE</button>
                                    <button className="cancel" onClick={handleCancel}>CANCEL</button>
                                </div> :
                                <div className="postButtons" style={{padding: '0rem'}}>
                                    <div className="postButtonsLeft">
                                        <button onClick={onClickBookmark} disabled={friendId !== '' ? true : false}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        <button onClick={onClickHeart}><span className='likes' style={{left: likes?.length > 10 && '59px', color: 'black'}}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        {friendId === '' ? <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        : <button disabled={true} className='tooltip'><LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/></button>}
                                    </div>
                                    <div className="postButtonsRight">
                                        <button onClick={() => {handleEdit(); setShowSettings(false);}} disabled={friendId !== '' ? true : false}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                        <button onClick={handleClickOpen} disabled={friendId !== '' ? true : false}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                            <div className='muiModal'>
                                                <span style={{fontSize: '3.5rem'}}>Delete this post?</span>
                                                <div className='dialogContent'>
                                                    <span style={{marginBottom: '1.2rem'}}>This post will be deleted permanently.</span>
                                                </div>
                                                <div className='dialogActions'>
                                                    <button className='save' onClick={handleDelete} type='submit'><span>Confirm</span></button>
                                                    <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
                                                </div>
                                            </div>
                                        </Dialog>
                                        <div className='leftWidget'>
                                            <button onClick={()=> setShowSettings(!showSettings)}  className='tooltip' disabled={friendId !== '' ? true : false}>
                                                <span className='tooltiptext'>Settings apply separately for each post</span>
                                                {showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                            {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setPlain={setPlain} plain={plain} date={date} setAllPosts={setAllPosts} userId={userId}/>}
                                        </div>
                                    </div>
                                </div>
                            }
                            </div>
                            :
                            <div className="rightBodyMain">
                                {postImage ?
                                    <IconButton disabled={!edit} className="uploadIconWithImage" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                        <img src={edit ? (selectedImage ? URL.createObjectURL(selectedImage) : imgUrl) : (userId && imgUrl ? imgUrl : selectedImage && URL.createObjectURL(selectedImage))} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>
                                    </IconButton>
                                :   
                                    <IconButton disabled={!edit} className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                        <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                        {edit && <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>}
                                    </IconButton>}
                                <div className="postButtons">
                                    <div className="postButtonsLeft">
                                        <button onClick={onClickBookmark} disabled={friendId !== '' || edit ? true : false}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        <button onClick={onClickHeart} disabled={edit ? true : false}><span className='likes' style={{left: likes?.length > 10 && '59px', color: 'black'}}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        {friendId === '' ? <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        : <button disabled={true} className='tooltip'><LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/></button>}
                                    </div>
                                    <div className="postButtonsRight">
                                        <button onClick={() => {handleEdit(); setShowSettings(false);}} disabled={friendId !== '' || edit ? true : false}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                        <button onClick={handleClickOpen} disabled={friendId !== '' || edit ? true : false}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                        <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                            <div className='muiModal'>
                                                <span style={{fontSize: '3.5rem'}}>Delete this post?</span>
                                                <div className='dialogContent'>
                                                    <span style={{marginBottom: '1.2rem'}}>This post will be deleted permanently.</span>
                                                </div>
                                                <div className='dialogActions'>
                                                    <button className='save' onClick={handleDelete} type='submit'><span>Confirm</span></button>
                                                    <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
                                                </div>
                                            </div>
                                        </Dialog>
                                        <div className='leftWidget'>
                                            <button onClick={()=> setShowSettings(!showSettings)} disabled={friendId !== '' || edit ? true : false}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                            {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setPlain={setPlain} plain={plain} date={date} setAllPosts={setAllPosts} userId={userId}/>}
                                        </div>
                                    </div>
                                </div>
                                {(message !== '' && !edit) && <span className='errorMessage'>{message.toUpperCase()}</span>}

                                {edit ? 
                                <div className="postInput">
                                    <textarea id="text" name="text" rows="12" cols="50" defaultValue={body}/>
                                    <div className="inputButtons">
                                        <button className="save" onClick={handleSave}>Save</button>
                                        <button className="cancel" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div> : <div className='postInput2'>
                                            <span>{body && body.replace(/<[^>]*>([^<]*)<\/[^>]*>/g, "$1\r\n").replace(/<[^>]*>/g, "")}</span>
                                        </div>}
                            </div>}
                        </div>
                    </div>}
                    {(!edit && !openBookmark) && <div className='rightFooter'>
                                <div className='pageSlider'>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack className='pageSliderStack' spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                            <span style={{marginBottom: '-1.3rem'}}>{allPosts?.length < 1 ? 0 : 1}</span>
                                            <Slider aria-label="Posts" key={`slider-${value}`} min={0} max={allPosts?.length-1} defaultValue={value} onChange={handleChange} sx={{color: '#F9D876'}} valueLabelDisplay='auto' valueLabelFormat={value => <div>{value + 1}</div>}/>
                                            <span style={{marginBottom: '-2.2rem'}}>{allPosts?.length}</span>
                                        </Stack>
                                    </Box>
                                </div>
                                <div className='pageSliderButtons'>
                                    <button onClick={() => setValue(value < 1 ? 0 : value-1)}><ArrowBackIosNewRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                    <span style={{marginBottom: '2rem'}}>{currentFriendName !== '' ? `@ ${currentFriendName}` : userId ? `@ ${name}` : 'Login Required'} </span>
                                    <button onClick={() => setValue(value > allPosts?.length ? allPosts?.length : value + 1)}><ArrowForwardIosRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                </div>
                            </div>}
                </div>
            </GridLines> :
                <div className="rightContent">
                    {friendId === '' && !openBookmark ? <div className='marker'>
                        <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                    </div>
                    : <div className='marker2' onClick={() => handleClickHome()} style={{top: '6rem', background: 'rgba(249, 216, 118, 0.8)' }}>
                        <span><HomeSharpIcon sx={{fontSize: '1.7rem'}}/></span>
                    </div>}
                    {(friendId !== '' && currentFriendName !== '') ? <div className='marker' style={{top: '12rem', background: 'rgba(249, 216, 118, 0.8)'}}>
                        <span><PeopleRoundedIcon style={{fontSize: '1.7rem'}}/></span>
                    </div>
                    : <div className='marker2'/>}
                    {showBookMark ? <div className='marker4'>
                        <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                    </div>
                    :
                    <div className='marker3' onClick={() => {setOpenBookmark(true); setShowBookMark(true);}}>
                        <span><BookmarkIcon sx={{fontSize: '1.7rem'}}/></span>
                    </div>}
                    {openBookmark ? <BookmarkPosts allPosts={allPosts} setOpenBookmark={setOpenBookmark} userId={userId} friendId={friendId} onSetFriendId={onSetFriendId}/>
                        : <div className='rightBodyAndHeader'>
                        {edit ? <div className="rightHeader">
                            <input id='rightTitle' type="text" defaultValue={title}/>
                        </div> : <span style={{textAlign: 'center'}}>{title}</span>}
                        <div className="rightBody" style={{maxHeight: (plain && edit) && '90%', justifyContent: (plain && !edit) && 'flex-start'}}>
                            <div className="rightBodyHeader" style={{margin: (title !== '' && !edit) && '0.1rem 0 1rem 0' }}>
                                <span>{new Date(date).getMonth()+1}/{new Date(date).getDate()}/{new Date(date).getFullYear()}</span>
                                <div className='weatherMood'>
                                    <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('sunny')} disabled={friendId !== '' || !edit ? true : false}><img alt= "sunny" src={weather === 'sunny' ? SunColor : SunPlain}/></button>
                                    <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('cloud')} disabled={friendId !== '' || !edit ? true : false}><img alt= "cloud" src={weather === 'cloud' ? CloudColor : CloudPlain}/></button>
                                    <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('rainy')} disabled={friendId !== '' || !edit ? true : false}><img alt= "rainy" src={weather === 'rainy' ? UmbColor : UmbPlain}/></button>
                                    <button style={{cursor: edit && 'pointer'}} onClick={() => handleWeather('snowy')} disabled={friendId !== '' || !edit ? true : false}><img alt= "snowy" src={weather === 'snowy' ? SnowColor : SnowPlain}/></button>
                                </div>
                            </div>
                            
                                {plain ?
                                <div className='plainRight'>
                                <ReactQuill 
                                    ref={quillRef} 
                                    readOnly={closeQuill}
                                    style={{border: 'none', height: edit && '100%'}}
                                    modules={closeQuill ? Right.modules2 : Right.modules}
                                    formats={Right.formats}
                                    placeholder="Let's start writing!"
                                    value={tmpBody ? tmpBody : body}>
                                    <div className="ql-container" style={{height: edit && '80%', border: '1px solid black'}}/>
                                </ReactQuill>
                                {!closeQuill ?
                                    <div className="inputButtons">
                                        <button className="save" onClick={handleSave}>SAVE</button>
                                        <button className="cancel" onClick={handleCancel}>CANCEL</button>
                                    </div> :
                                    <div className="postButtons" style={{padding: '0rem'}}>
                                        <div className="postButtonsLeft">
                                            <button onClick={onClickBookmark} disabled={friendId !== '' ? true : false}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            <button onClick={onClickHeart}><span className='likes' style={{left: likes?.length > 10 && '59px', color: 'black'}}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            {friendId === '' ? <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            : <button disabled={true} className='tooltip'><LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/></button>}
                                        </div>
                                        <div className="postButtonsRight">
                                            <button onClick={() => {handleEdit(); setShowSettings(false);}} disabled={friendId !== '' ? true : false}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                            <button onClick={handleClickOpen} disabled={friendId !== '' ? true : false}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                                <div className='muiModal'>
                                                    <span style={{fontSize: '3.5rem'}}>Delete this post?</span>
                                                    <div className='dialogContent'>
                                                        <span style={{marginBottom: '1.2rem'}}>This post will be deleted permanently.</span>
                                                    </div>
                                                    <div className='dialogActions'>
                                                        <button className='save' onClick={handleDelete} type='submit'><span>Confirm</span></button>
                                                        <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
                                                    </div>
                                                </div>
                                            </Dialog>
                                            <div className='leftWidget'>
                                                <button onClick={()=> setShowSettings(!showSettings)}  className='tooltip' disabled={friendId !== '' ? true : false}>
                                                    <span className='tooltiptext'>Settings apply separately for each post</span>
                                                    {showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                                {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setPlain={setPlain} plain={plain} date={date} setAllPosts={setAllPosts} userId={userId}/>}
                                            </div>
                                        </div>
                                    </div>
                                }
                                </div>
                                :
                                <div className="rightBodyMain">
                                    {postImage ?
                                        <IconButton disabled={!edit} className="uploadIconWithImage" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                            <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                            <img src={edit ? (selectedImage ? URL.createObjectURL(selectedImage) : imgUrl) : (userId && imgUrl ? imgUrl : selectedImage && URL.createObjectURL(selectedImage))} alt="Thumb" style={{width: "100%", maxHeight: "100%", objectFit: "cover", objectPosition: "initial", overflow: "hidden"}}/>
                                        </IconButton>
                                    :   
                                        <IconButton disabled={!edit} className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                            <input hidden accept="image/*" type="file" alt='postImage' onChange={onUploadImage}/>
                                            {edit && <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>}
                                        </IconButton>}
                                    <div className="postButtons">
                                        <div className="postButtonsLeft">
                                            <button onClick={onClickBookmark} disabled={friendId !== '' || edit ? true : false}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            <button onClick={onClickHeart} disabled={edit ? true : false}><span className='likes' style={{left: likes?.length > 10 && '59px', color: 'black'}}>{likes?.length}</span>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}></FavoriteTwoToneIcon> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            {friendId === '' ? <button onClick={onClickLock} className='tooltip'>{hide? <span className='tooltiptext'>Only you can view this post</span> : <span className='tooltiptext'>Your friends can view this post</span>}{hide ? <LockTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            : <button disabled={true} className='tooltip'><LockOpenRoundedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/></button>}
                                        </div>
                                        <div className="postButtonsRight">
                                            <button onClick={() => {handleEdit(); setShowSettings(false);}} disabled={friendId !== '' || edit ? true : false}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                            <button onClick={handleClickOpen} disabled={friendId !== '' || edit ? true : false}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem", color: "#000000"}}/>}</button>
                                            <Dialog className="dialogBox" open={open} onClose={handleClose}>
                                                <div className='muiModal'>
                                                    <span style={{fontSize: '3.5rem'}}>Delete this post?</span>
                                                    <div className='dialogContent'>
                                                        <span style={{marginBottom: '1.2rem'}}>This post will be deleted permanently.</span>
                                                    </div>
                                                    <div className='dialogActions'>
                                                        <button className='save' onClick={handleDelete} type='submit'><span>Confirm</span></button>
                                                        <button className='cancel' onClick={handleClose}><span>Cancel</span></button>
                                                    </div>
                                                </div>
                                            </Dialog>
                                            <div className='leftWidget'>
                                                <button onClick={()=> setShowSettings(!showSettings)} disabled={friendId !== '' || edit ? true : false}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                                {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setPlain={setPlain} plain={plain} date={date} setAllPosts={setAllPosts} userId={userId}/>}
                                            </div>
                                        </div>
                                    </div>
                                    {(message !== '' && !edit) && <span className='errorMessage'>{message.toUpperCase()}</span>}
    
                                    {edit ? 
                                    <div className="postInput">
                                        <textarea id="text" name="text" rows="12" cols="50" defaultValue={body}/>
                                        <div className="inputButtons">
                                            <button className="save" onClick={handleSave}>Save</button>
                                            <button className="cancel" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div> : <div className='postInput2'>
                                                <span>{body && body.replace(/<[^>]*>([^<]*)<\/[^>]*>/g, "$1\r\n").replace(/<[^>]*>/g, "")}</span>
                                            </div>}
                                </div>}
                            </div>
                        </div>}
                        {(!edit && !openBookmark) && <div className='rightFooter'>
                                    <div className='pageSlider'>
                                        <Box sx={{ width: '100%' }}>
                                            <Stack className='pageSliderStack' spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                                <span style={{marginBottom: '-1.3rem'}}>{allPosts?.length < 1 ? 0 : 1}</span>
                                                <Slider aria-label="Posts" key={`slider-${value}`} min={0} max={allPosts?.length-1} defaultValue={value} onChange={handleChange} sx={{color: '#F9D876'}} valueLabelDisplay='auto' valueLabelFormat={value => <div>{value + 1}</div>}/>
                                                <span style={{marginBottom: '-2.2rem'}}>{allPosts?.length}</span>
                                            </Stack>
                                        </Box>
                                    </div>
                                    <div className='pageSliderButtons'>
                                        <button onClick={() => setValue(value < 1 ? 0 : value-1)}><ArrowBackIosNewRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                        <span style={{marginBottom: '2rem'}}>{currentFriendName !== '' ? `@ ${currentFriendName}` : userId ? `@ ${name}` : 'Login Required'} </span>
                                        <button onClick={() => setValue(value > allPosts?.length ? allPosts?.length : value + 1)}><ArrowForwardIosRoundedIcon sx={{fontSize: '1.7rem'}}/></button>
                                    </div>
                                </div>}
                    </div>}
            </div>
        );
    }

Right.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image']
    ],
};

Right.modules2 = {
    toolbar: false,
};

Right.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block"
];

export default Right;