import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import GridLines from 'react-gridlines';
import DisplaySettingsLeft from '../modals/DisplaySettingsLeft';
import AddPicSettings from '../modals/AddPicSettings';
import WidgetSettingsLeft from '../modals/WidgetSettingsLeft';
import Todos from '../widgets/Todo';
import Notes from '../widgets/Notes';
import CalendarWidget from '../widgets/Calendar';
import DdayCounter from '../widgets/DdayCounter';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Draggable from 'react-draggable';
import OpenWithRoundedIcon from '@mui/icons-material/OpenWithRounded';
import OpenWithSharpIcon from '@mui/icons-material/OpenWithSharp';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Cropper from 'react-easy-crop';
import { Slider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getCroppedImg, getRotatedImage } from '../modals/cropImage';
import { getOrientation } from 'get-orientation/browser'
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CropPortraitSharpIcon from '@mui/icons-material/CropPortraitSharp';
import CropSquareSharpIcon from '@mui/icons-material/CropSquareSharp';
import TodosContainer from '../containers/TodosContainer';
import NotesContainer from '../containers/NotesContainer';
import CalendarContainer from '../containers/CalendarContainer';
import ReminderContainer from '../containers/ReminderContainer.js';
import ClockContainer from '../containers/ClockContainer.js';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import StickerIcon from '../icons/sticker.png';
import StickerColor from '../icons/stickerColor.png';
import axios from 'axios';
import StickerSettings from '../modals/StickerSettings';
import CloudSticker from '../icons/cloudSticker.png';
import Ghost1 from '../icons/ghost1.png';
import Glitter from '../icons/glitter.png';

function Left({editMode, setEditMode, date, userId, positions, onChangePositions, stickers, onChangeStickers, onEdit}){
    const [addPic, setAddPic] = useState(false);
    const [showStickerSettings, setShowStickerSettings] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetSettings, setShowWidgetSettings] = useState(false);

    const [grid, setGrid] = useState(true);

    const [todo, setTodo] = useState(positions.find(obj => obj.name === 'todo').show)
    const [calendar, setCalendar] = useState(positions.find(obj => obj.name === 'cal').show)
    const [ddayCounter, setDdayCounter] = useState(positions.find(obj => obj.name === 'dday').show)
    const [notes, setNotes] = useState(positions.find(obj => obj.name === 'note').show);
    const [reminder, setReminder] = useState(positions.find(obj => obj.name === 'reminder').show);
    const [clock, setClock] = useState(positions.find(obj => obj.name === 'clock').show);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [stickerList, setStickerList] = useState([]);

    const [square, setSquare] = useState(false);
    const [rect, setRect] = useState(true);
    const [circle, setCircle] = useState(false);

    const [imgSrc, setImageSrc] = useState();

    const [today, setToday] = useState(0);

    
    const [calPosition, setCalPosition] = useState({x: positions[0].x, y: positions[0].y})
    const [ddayPosition, setDdayPosition] = useState({x: positions[1].x, y: positions[1].y})
    const [notePosition, setNotePosition] = useState({x: positions[2].x, y: positions[2].y})
    const [todoPosition, setTodoPosition] = useState({x: positions[3].x, y: positions[3].y})
    const [reminderPosition, setReminderPosition] = useState({x: positions[4].x, y: positions[4].y});
    const [clockPosition, setClockPosition] = useState({x: positions[5].x, y: positions[5].y});

    const [settings, setSettings] = useState();

    const [angle, setAngle] = useState();

    const [ddayEdit, setDdayEdit] = useState(false);

    const [loading, setLoading] = useState(false);


    const [id, setId] = useState("");
    const [message, setMessage] = useState('');
    const instance = axios.create({
        baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/' : "https://cheese-me.fly.dev/",
    });
    const regex = "/\.com\/images\/([^/]+)$/";
    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }
    
    const change = async () => {
        const newState = [{name: 'cal', x: Object.values(calPosition)[0], y: Object.values(calPosition)[1], show: calendar},
            {name: 'dday', x: Object.values(ddayPosition)[0], y: Object.values(ddayPosition)[1], show: ddayCounter},
            {name: 'note', x: Object.values(notePosition)[0], y: Object.values(notePosition)[1], show: notes},
            {name: 'todo', x: Object.values(todoPosition)[0], y: Object.values(todoPosition)[1], show: todo},
            {name: 'reminder', x: Object.values(reminderPosition)[0], y: Object.values(reminderPosition)[1], show: reminder},
            {name: 'clock', x: Object.values(clockPosition)[0], y: Object.values(clockPosition)[1], show: clock}];
        
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            positions: newState
        });
        onChangePositions(newState);
    };

    const changeStickers = async() => {
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            stickers: stickers
        });
        setRotation(0);
        setAngle(0);
        setCircle(false);
    };

    const updateList = async() => {
        const tmp = [];
        console.log('stickers: ', stickers)
        for (const sticker of stickers) {
            tmp.push({name: sticker.name, imgSrc: await getCroppedImg(sticker.imgSrc, sticker.croppedAreaPixels, sticker.rotation), show: sticker.show})
        };
        setStickerList(tmp);
    }

    useEffect(() => {
        if (stickers?.length === 0) {
            setStickerList([])
        } else {
            updateList()
        }
        if (userId) changeStickers();
    }, [stickers]);

    useEffect(() => {
        console.log('stickerList: ', stickerList)
    }, [stickerList])
    
    useEffect(() => {
        setToday(new Date().setHours(0, 0, 0, 0));
    }, [id]);

    useEffect(() => {
        if (userId) {
            instance.get('/api/users/find/' + userId, {
                withCredentials: true
            })
            .then((res) => {
              const n = res?.data;
              if (n) {
                onChangePositions(n.positions?.length === 0 ? [{name: 'cal', x: 0, y: 0, show: true},
                    {name: 'dday', x: 377, y: 42, show: true},
                    {name: 'note', x: 402, y: 249, show: true},
                    {name: 'todo', x: 358.5, y: 460, show: true},
                    {name: 'reminder', x: 31, y: 401, show: true},
                    {name: 'clock', x: 600, y: 20, show: true}] : n.positions);
                setCalPosition({x: Object.values(n.positions[0])[1], y: Object.values(n.positions[0])[2]});
                setDdayPosition({x: Object.values(n.positions[1])[1], y: Object.values(n.positions[1])[2]});
                setNotePosition({x: Object.values(n.positions[2])[1], y: Object.values(n.positions[2])[2]});
                setTodoPosition({x: Object.values(n.positions[3])[1], y: Object.values(n.positions[3])[2]});
                setReminderPosition({x: Object.values(n.positions[4])[1], y: Object.values(n.positions[4])[2]});
                setClockPosition({x: Object.values(n.positions[5])[1], y: Object.values(n.positions[5])[2]});
                setCalendar((n.positions.find(obj => obj.name === 'cal')).show)
                setDdayCounter((n.positions.find(obj => obj.name === 'dday')).show)
                setNotes((n.positions.find(obj => obj.name === 'note')).show)
                setReminder((n.positions.find(obj => obj.name === 'reminder')).show)
                setTodo((n.positions.find(obj => obj.name === 'todo')).show)
                setClock((n.positions.find(obj => obj.name === 'clock')).show);
                setSettings(n.settings);
                setGrid(n.settings[0]);
                onChangeStickers(n.stickers?.length <= 0 ? [] : n.stickers);
                if (n.stickers?.length <= 0) setStickerList([]);
              }
            })
            .catch( (err) => {
                console.log('Error loading positions')
            })
        } else  {
            setCalPosition({x: 0, y: 0});
            setDdayPosition({x: 377, y: 42});
            setNotePosition({x: 402, y: 249});
            setTodoPosition({x: 358.5, y: 460});
            setReminderPosition({x: 21, y: 401});
            setClockPosition({x: 600, y: 20});
            setCalendar(true);
            setDdayCounter(true);
            setNotes(true);
            setReminder(true);
            setClock(true);
            setTodo(true);
            setGrid(true);
        }
    }, [userId]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            // Depending on the layout, you may need to swap inlineSize with blockSize
            window.requestAnimationFrame(() => {
                if (!Array.isArray(event) || !event.length) {
                  return;
                }
                setWidth(event[0].contentBoxSize[0].inlineSize);
                const bodyRef = document.getElementById("leftContent");
                if (bodyRef){
                    setHeight(bodyRef.clientHeight)

                }
            });
        });
        resizeObserver.observe(document.getElementById("leftBody"));
    });

    const gridSetting = async() => {
        let res = await FetchAPIPost('/api/users/update/' + userId, {
            settings: [grid, settings[1], settings[2]]
        });
    }

    useEffect(() => {
        if (settings) {
            gridSetting();
        }
    }, [grid])

    useEffect(() => {
        if (userId && editMode === false) {
            change();
            changeStickers();
        }
    }, [editMode]);

    useEffect(() => {
        if (!addPic){
            setImageSrc(null);
            setRotation(0);
            setCroppedAreaPixels(null);
            setAngle(null);
        }
    }, [addPic]);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    

    const showCroppedImage = useCallback(async () => {
        try {   
                let stickerName = document.getElementById('stickerName').value;
                if (stickerName === '') {
                    setMessage('Name required');
                    return
                }
                else if (stickers.filter(s => s.name === stickerName).length >= 1) {
                    setMessage('Name already taken')
                    return
                }
                onChangeStickers([...stickers, {name: stickerName, imgSrc: imgSrc, 
                round: circle, croppedAreaPixels: croppedAreaPixels, rotation: rotation, angle: angle ? angle : 0, show: true, x: 0, y: 0}])
                setStickerList([...stickerList, {name: stickerName, imgSrc: await getCroppedImg(imgSrc, croppedAreaPixels, rotation), show: true}]);
                setAddPic(false);
                setMessage('');
                setCircle(false);
                setLoading(false);
                setImageSrc(null);
        } catch (e) {
          console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setLoading(true);
      
            // // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation];
            setAngle(rotation);
            const formData = new FormData();
            formData.append("image", file);
            const res = await instance({
                method: 'POST',
                url: '/upload',
                data: formData,
                header: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            setImageSrc(res?.data);
            setShowStickerSettings(false);
        }
    }

    const handleCancel = async() => {
        instance.post('/deleteImg/' + imgSrc.split("/").pop())
            .then((res) => {
                console.log('Image Deleted');
        })
        setAddPic(false);
        setImageSrc('');
        setMessage('');
        setCircle(false);
        setLoading(false);
    }

    return(
        <div className="leftInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={1} strokeWidth2={1} cellWidth2={12} lineColor2={"#e8e8e8"} lineColor={"#d9d9d9"}>
            <div className="leftContent" id="leftContent">
                    <div className="leftBody" id="leftBody">
                        {(addPic && loading && !imgSrc) && <span className='loading'>LOADING . . .</span>}
                        {calendar && <Draggable bounds={{top: 0, left: 0, right: width-(319), bottom: height-(360)}}
                                            position={calPosition ? {x: Object.values(calPosition)[0] > width-319 ? width-319 : Object.values(calPosition)[0], y: Object.values(calPosition)[1] > height-(360) ? height-(360) : Object.values(calPosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setCalPosition({x, y})} handle="strong"><div><CalendarContainer move={editMode}/></div></Draggable>}
                        {todo && <Draggable bounds={{top: 0, left: 0, right: width-(222), bottom: height-(156)}}
                                            position={todoPosition ? {x: Object.values(todoPosition)[0] > width-222 ? width-222 : Object.values(todoPosition)[0], y: Object.values(todoPosition)[1] > height-(156) ? height-(156) : Object.values(todoPosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setTodoPosition({x, y})} handle="strong"><div><TodosContainer move={editMode} date={date}/></div></Draggable>} 
                        {notes && <Draggable bounds={{top: 0, left: 0, right: width-(202), bottom: height-(236)}}
                                            position={notePosition ? {x: Object.values(notePosition)[0] > width-202 ? width-202 : Object.values(notePosition)[0], y: Object.values(notePosition)[1] > height-(236) ? height-(236) : Object.values(notePosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setNotePosition({x, y})} handle="strong"><div><NotesContainer move={editMode} date={date}/></div></Draggable>}
                        {reminder && <Draggable bounds={{top: 0, left: 0, right: width-(322), bottom: height-(247)}}
                                                position={reminderPosition ? {x: Object.values(reminderPosition)[0] > width-322 ? width-322 : Object.values(reminderPosition)[0], y: Object.values(reminderPosition)[1] > height-(247) ? height-(247) : Object.values(reminderPosition)[1]}  : {x: 0, y: 0}}
                                                onStop={(e, {x, y}) => setReminderPosition({x, y})} handle="strong"><div><ReminderContainer move={editMode}/></div></Draggable>}
                        {clock && <Draggable bounds={{top: 0, left: 0, right: width-(212), bottom: height-(156)}}
                                            position={todoPosition ? {x: Object.values(clockPosition)[0] > width-212 ? width-212 : Object.values(clockPosition)[0], y: Object.values(clockPosition)[1] > height-(156) ? height-(156) : Object.values(clockPosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setClockPosition({x, y})} handle="strong"><div><ClockContainer move={editMode} date={date}/></div></Draggable>} 
                        {ddayCounter && <Draggable bounds={{top: 0, left: 0, right: ddayEdit ? width - (232) : width-(152), bottom: height-(228)}} 
                                                        position={ddayPosition ? {x: ddayEdit ? Object.values(ddayPosition)[0] > width-232 ? width-232 : Object.values(ddayPosition)[0] : Object.values(ddayPosition)[0] > width-152 ? width-152 : Object.values(ddayPosition)[0], y: Object.values(ddayPosition)[1] > height-(228) ? height-(228) : Object.values(ddayPosition)[1]}  : {x: 0, y: 0}}
                                                        onStop={(e, {x, y}) => setDdayPosition({x, y})} handle="strong"><div><DdayCounter move={editMode} userId={userId} setDdayEdit={setDdayEdit}/></div></Draggable>}
                        <div className="stickers">
                            {(stickerList?.length > 0 && stickerList?.length === stickers?.length) &&
                                stickerList.map((sticker, index) => {
                                    if (sticker?.show) {
                                        return (
                                            <Draggable key={index} bounds={{top: 0, left: 0, right: width-70, bottom: height-112}}
                                                position={{x: stickers[index].x > width-70 ? width-70 : stickers[index].x, y: stickers[index].y > height-112 ? height-112 : stickers[index].y}}
                                                onStop={(e, {x, y}) => {stickers[index].x = x; stickers[index].y = y;
                                                    onEdit(sticker.name, x, y)}} handle="strong">
                                                <div className="stickerWidget">
                                                    <img alt={sticker.name} src={sticker.imgSrc} style={{borderRadius: stickers[index].round && "50%"}}/>
                                                    {editMode && <strong>
                                                        <OpenWithSharpIcon sx={{fontSize: '7rem'}}/>
                                                    </strong>}
                                                </div>
                                            </Draggable>
                                        )
                                    }
                                    return null }
                                )
                            }
                        </div>
                        {(addPic && imgSrc) && <div className='stickerMakerBox'>
                            <div className='stickerMaker'>
                                <Cropper
                                  image={imgSrc}
                                  crop={crop}
                                  rotation={rotation}
                                  zoom={zoom}
                                  aspect={(square || circle) ? 1 / 1 : 3 / 4}
                                  onCropChange={setCrop}
                                  onRotationChange={setRotation}
                                  onCropComplete={onCropComplete}
                                  onZoomChange={setZoom}
                                  cropShape={circle ? 'round' : 'rect'}
                                />
                            </div>
                            <div className='stickerMakerSettings'>
                                <div className="sliders">
                                    <div className='stickerMakerSliders'>
                                      <Typography variant="overline">
                                        Zoom
                                      </Typography>
                                      <Slider
                                        value={zoom}
                                        min={1}
                                        max={5}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e, zoom) => setZoom(zoom)}
                                      />
                                    </div>
                                    <div className='stickerSliderContainer'>
                                      <Typography variant="overline">
                                        Rotation
                                      </Typography>
                                      <Slider
                                        value={rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        onChange={(e, rotation) => setRotation(rotation)}
                                      />
                                    </div>
                                </div>
                                <div className='stickerDetail'>
                                    <div className='stickerName'>
                                        <Typography variant="overline">Sticker Name</Typography>
                                        <input type='text' id='stickerName' required placeholder='sticker 1' style={{border: message !== '' && '1px solid red', fontSize: '1.5rem'}}/>
                                        <span style={{color: 'red', fontSize: '2rem'}}>{message}</span>
                                    </div>
                                    <div className="stickersShaper">
                                        <Typography variant="overline">Crop Shape</Typography>
                                        <div className="stickerShape">
                                            <button style={ circle ? {borderColor: "black"} : {} } onClick={() => {setCircle(true); setSquare(false); setRect(false);}}><CircleOutlinedIcon sx={ circle ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                            <button style={ square ? {borderColor: "black"} : {} } onClick={() => {setSquare(true); setCircle(false); setRect(false);}}><CropSquareSharpIcon sx={ square ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                            <button style={ rect ? {borderColor: "black"} : {} } onClick={() => {setRect(true); setSquare(false); setCircle(false);}}><CropPortraitSharpIcon sx={ rect ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                  onClick={showCroppedImage}
                                  variant="contained"
                                  style={{fontSize: "1rem", marginLeft: '1rem'}}>
                                  Done
                                </Button>
                                <Button
                                  onClick={() => handleCancel()}
                                  variant="outlined"
                                  style={{fontSize: "1rem", marginLeft: '1rem'}}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                        }
                    </div>
                    <div className="leftFooter">
                        <div className="leftWidget">
                            <button onClick={() => {setAddPic(!addPic); setShowStickerSettings(false); setShowWidgetSettings(false); setShowSettings(false);}}><AddPhotoAlternateOutlinedIcon sx={ addPic ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                            {addPic && <input type="file" onChange={onFileChange} accept="image/*" />}
                        </div>
                        <div className="leftWidget">
                            {!showStickerSettings ? <button onClick={() => {setShowStickerSettings(true); setShowWidgetSettings(false); setShowSettings(false); setAddPic(false);}}><img src={StickerIcon} alt='stickerWidget' style={{width: '2.05rem'}}/></button>
                                : <button onClick={() => setShowStickerSettings(false)}><img src={StickerColor} alt='stickerWidget' style={{width: '2.05rem'}}/></button>}
                            {showStickerSettings && <StickerSettings userId={userId} stickers={stickers} onChangeStickers={onChangeStickers} stickerList={stickerList} setStickerList={setStickerList}/>}
                        </div>
                        <div className="leftWidget">
                            <button onClick={editMode ? () => setEditMode() : () => {setEditMode(); setShowSettings(false); setShowWidgetSettings(false); setShowStickerSettings(false);}}><OpenWithRoundedIcon sx={ editMode ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                        </div>
                        <div className="leftWidget">
                            {showWidgetSettings ? <button onClick={() => setShowWidgetSettings(false)}><DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/></button>
                                 : <button onClick={() => {setShowWidgetSettings(true); setShowStickerSettings(false); setShowSettings(false); setAddPic(false);}}><DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>}
                            {showWidgetSettings && <WidgetSettingsLeft userId={userId} reminder={reminder} setReminder={setReminder} todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar} notes={notes} setNotes={setNotes} setDdayCounter={setDdayCounter} setClock={setClock} clock={clock} ddayCounter={ddayCounter}/>}
                        </div>
                        <div className="leftWidget">
                        {showSettings ? <button onClick={() => setShowSettings(false)}><SettingsOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/></button> 
                            : <button onClick={() => {setShowSettings(true); setShowWidgetSettings(false); setShowStickerSettings(false); setAddPic(false);}}><SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>}
                            {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                        </div>
                    </div>
                </div>
            </GridLines> :
                <div className="leftContent" id="leftContent">
                <div className="leftBody" id="leftBody">
                    {(addPic && loading && !imgSrc) && <span className='loading'>LOADING . . .</span>}
                    {calendar && <Draggable bounds={{top: 0, left: 0, right: width-(319), bottom: height-(360)}}
                                            position={calPosition ? {x: Object.values(calPosition)[0] > width-319 ? width-319 : Object.values(calPosition)[0], y: Object.values(calPosition)[1] > height-(360) ? height-(360) : Object.values(calPosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setCalPosition({x, y})} handle="strong"><div><CalendarContainer move={editMode}/></div></Draggable>}
                    {todo && <Draggable bounds={{top: 0, left: 0, right: width-(222), bottom: height-(156)}}
                                        position={todoPosition ? {x: Object.values(todoPosition)[0] > width-222 ? width-222 : Object.values(todoPosition)[0], y: Object.values(todoPosition)[1] > height-(156) ? height-(156) : Object.values(todoPosition)[1]}  : {x: 0, y: 0}}
                                        onStop={(e, {x, y}) => setTodoPosition({x, y})} handle="strong"><div><TodosContainer move={editMode} date={date}/></div></Draggable>} 
                    {notes && <Draggable bounds={{top: 0, left: 0, right: width-(202), bottom: height-(236)}}
                                        position={notePosition ? {x: Object.values(notePosition)[0] > width-202 ? width-202 : Object.values(notePosition)[0], y: Object.values(notePosition)[1] > height-(236) ? height-(236) : Object.values(notePosition)[1]}  : {x: 0, y: 0}}
                                        onStop={(e, {x, y}) => setNotePosition({x, y})} handle="strong"><div><NotesContainer move={editMode} date={date}/></div></Draggable>}
                    {reminder && <Draggable bounds={{top: 0, left: 0, right: width-(322), bottom: height-(247)}}
                                            position={reminderPosition ? {x: Object.values(reminderPosition)[0] > width-322 ? width-322 : Object.values(reminderPosition)[0], y: Object.values(reminderPosition)[1] > height-(247) ? height-(247) : Object.values(reminderPosition)[1]}  : {x: 0, y: 0}}
                                            onStop={(e, {x, y}) => setReminderPosition({x, y})} handle="strong"><div><ReminderContainer move={editMode}/></div></Draggable>}
                    {clock && <Draggable bounds={{top: 0, left: 0, right: width-(212), bottom: height-(156)}}
                                        position={todoPosition ? {x: Object.values(clockPosition)[0] > width-212 ? width-212 : Object.values(clockPosition)[0], y: Object.values(clockPosition)[1] > height-(156) ? height-(156) : Object.values(clockPosition)[1]}  : {x: 0, y: 0}}
                                        onStop={(e, {x, y}) => setClockPosition({x, y})} handle="strong"><div><ClockContainer move={editMode} date={date}/></div></Draggable>} 
                    {ddayCounter && <Draggable bounds={{top: 0, left: 0, right: ddayEdit ? width - (232) : width-(152), bottom: height-(228)}} 
                                position={ddayPosition ? {x: ddayEdit ? Object.values(ddayPosition)[0] > width-232 ? width-232 : Object.values(ddayPosition)[0] : Object.values(ddayPosition)[0] > width-152 ? width-152 : Object.values(ddayPosition)[0], y: Object.values(ddayPosition)[1] > height-(228) ? height-(228) : Object.values(ddayPosition)[1]}  : {x: 0, y: 0}}
                                onStop={(e, {x, y}) => setDdayPosition({x, y})} handle="strong"><div><DdayCounter move={editMode} userId={userId} setDdayEdit={setDdayEdit}/></div></Draggable>}
                    <div className="stickers">
                        {(stickerList?.length > 0 && stickerList?.length === stickers?.length) &&
                            stickerList.map((sticker, index) => {
                                if (sticker?.show) {
                                    return (
                                        <Draggable key={index} bounds={{top: 0, left: 0, right: width-70, bottom: height-112}}
                                            position={{x: stickers[index].x > width-70 ? width-70 : stickers[index].x, y: stickers[index].y > height-112 ? height-112 : stickers[index].y}}
                                            onStop={(e, {x, y}) => {stickers[index].x = x; stickers[index].y = y;
                                                onEdit(sticker.name, x, y)}} handle="strong">
                                            <div className="stickerWidget">
                                                <img alt={sticker.name} src={sticker.imgSrc} style={{borderRadius: stickers[index].round && "50%"}}/>
                                                {editMode && <strong>
                                                    <OpenWithSharpIcon sx={{fontSize: '7rem'}}/>
                                                </strong>}
                                            </div>
                                        </Draggable>
                                    )
                                }
                                return null }
                            )
                        }
                    </div>
                    {(addPic && imgSrc) && <div className='stickerMakerBox'>
                        <div className='stickerMaker'>
                            <Cropper
                              image={imgSrc}
                              crop={crop}
                              rotation={rotation}
                              zoom={zoom}
                              aspect={(square || circle) ? 1 / 1 : 3 / 4}
                              onCropChange={setCrop}
                              onRotationChange={setRotation}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                              cropShape={circle ? 'round' : 'rect'}
                            />
                        </div>
                        <div className='stickerMakerSettings'>
                            <div className="sliders">
                                <div className='stickerMakerSliders'>
                                  <Typography variant="overline">
                                    Zoom
                                  </Typography>
                                  <Slider
                                    value={zoom}
                                    min={1}
                                    max={5}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e, zoom) => setZoom(zoom)}
                                  />
                                </div>
                                <div className='stickerSliderContainer'>
                                  <Typography variant="overline">
                                    Rotation
                                  </Typography>
                                  <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    onChange={(e, rotation) => setRotation(rotation)}
                                  />
                                </div>
                            </div>
                            <div className='stickerDetail'>
                                <div className='stickerName'>
                                    <Typography variant="overline">Sticker Name</Typography>
                                    <input type='text' id='stickerName' required placeholder='sticker 1' style={{border: message !== '' && '1px solid red', fontSize: '1.5rem'}}/>
                                    <span style={{color: 'red', fontSize: '2rem'}}>{message}</span>
                                </div>
                                <div className="stickersShaper">
                                    <Typography variant="overline">Crop Shape</Typography>
                                    <div className="stickerShape">
                                        <button style={ circle ? {borderColor: "black"} : {} } onClick={() => {setCircle(true); setSquare(false); setRect(false);}}><CircleOutlinedIcon sx={ circle ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                        <button style={ square ? {borderColor: "black"} : {} } onClick={() => {setSquare(true); setCircle(false); setRect(false);}}><CropSquareSharpIcon sx={ square ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                        <button style={ rect ? {borderColor: "black"} : {} } onClick={() => {setRect(true); setSquare(false); setCircle(false);}}><CropPortraitSharpIcon sx={ rect ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                    </div>
                                </div>
                            </div>
                            <Button
                              onClick={showCroppedImage}
                              variant="contained"
                              style={{fontSize: "1rem", marginLeft: '1rem'}}>
                              Done
                            </Button>
                            <Button
                              onClick={() => handleCancel()}
                              variant="outlined"
                              style={{fontSize: "1rem", marginLeft: '1rem'}}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                    }
                </div>
                <div className="leftFooter">
                    <div className="leftWidget">
                        <button onClick={() => {setAddPic(!addPic); setShowStickerSettings(false); setShowWidgetSettings(false); setShowSettings(false);}}><AddPhotoAlternateOutlinedIcon sx={ addPic ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                        {addPic && <input type="file" onChange={onFileChange} accept="image/*" />}
                    </div>
                    <div className="leftWidget">
                        {!showStickerSettings ? <button onClick={() => {setShowStickerSettings(true); setShowWidgetSettings(false); setShowSettings(false); setAddPic(false);}}><img src={StickerIcon} alt='stickerWidget' style={{width: '2.05rem'}}/></button>
                                : <button onClick={() => setShowStickerSettings(false)}><img src={StickerColor} alt='stickerWidget' style={{width: '2.05rem'}}/></button>}
                        {showStickerSettings && <StickerSettings userId={userId} stickers={stickers} onChangeStickers={onChangeStickers} stickerList={stickerList} setStickerList={setStickerList}/>}
                    </div>
                    <div className="leftWidget">
                        <button onClick={editMode ? () => setEditMode() : () => {setEditMode(); setShowSettings(false); setShowWidgetSettings(false); setShowStickerSettings(false);}}><OpenWithRoundedIcon sx={ editMode ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                    </div>
                    <div className="leftWidget">
                        {showWidgetSettings ? <button onClick={() => setShowWidgetSettings(false)}><DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/></button>
                                 : <button onClick={() => {setShowWidgetSettings(true); setShowStickerSettings(false); setShowSettings(false); setAddPic(false);}}><DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>}
                        {showWidgetSettings && <WidgetSettingsLeft userId={userId} reminder={reminder} setReminder={setReminder} todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar} notes={notes} setNotes={setNotes} setDdayCounter={setDdayCounter} ddayCounter={ddayCounter} setClock={setClock} clock={clock}/>}
                    </div>
                    <div className="leftWidget">
                        {showSettings ? <button onClick={() => setShowSettings(false)}><SettingsOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/></button> 
                            : <button onClick={() => {setShowSettings(true); setShowWidgetSettings(false); setShowStickerSettings(false); setAddPic(false);}}><SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>}
                        {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Left;