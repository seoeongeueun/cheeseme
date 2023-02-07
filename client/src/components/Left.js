import { useEffect, useState, useCallback, useRef } from 'react'
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
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCroppedImg, getRotatedImage } from '../modals/cropImage';
import { getOrientation } from 'get-orientation/browser'
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CropPortraitSharpIcon from '@mui/icons-material/CropPortraitSharp';
import CropSquareSharpIcon from '@mui/icons-material/CropSquareSharp';
import TodosContainer from '../containers/TodosContainer';
import NotesContainer from '../containers/NotesContainer';
import CalendarContainer from '../containers/CalendarContainer';
import { FetchAPIPost, FetchApiDelete, FetchApiGet} from '../utils/api.js';
import axios from 'axios';

function Left({editMode, setEditMode, date}){
    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetSettings, setShowWidgetSettings] = useState(false);

    const [grid, setGrid] = useState(false);

    const [todo, setTodo] = useState(true);
    const [calendar, setCalendar] = useState(true);
    const [notes, setNotes] = useState(true);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // const [editMode, setEditMode] = useState(false);
    const [addPic, setAddPic] = useState(false);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [stickerList, setStickerList] = useState([]);
    const [stickersOn, setStickersOn] = useState([]);
    const [roundStickers, setRoundStickers] = useState([]);

    const [square, setSquare] = useState(false);
    const [rect, setRect] = useState(true);
    const [circle, setCircle] = useState(false);

    const [imgSrc, setImageSrc] = useState();

    const [ddayCounter, setDdayCounter] = useState(true);

    const [today, setToday] = useState(0);

    const [calPosition, setCalPosition] = useState({x: 0, y: 0})
    const [todoPosition, setTodoPosition] = useState({x: 0, y: 0})
    const [ddayPosition, setDdayPosition] = useState({x: 0, y: 0})
    const [notePosition, setNotePosition] = useState({x: 0, y: 0})

    const [id, setId] = useState("");


    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }
    
    const change = async () => {
        let res = await FetchAPIPost('/api/position/update/' + id, {
            cal: [Object.values(calPosition)[0], Object.values(calPosition)[1]],
            dday: [Object.values(ddayPosition)[0], Object.values(ddayPosition)[1]],
            note: [Object.values(notePosition)[0], Object.values(notePosition)[1]],
            todo: [Object.values(todoPosition)[0], Object.values(todoPosition)[1]],
        });
    }
    const addNew = async () => {
        let res = await FetchAPIPost('/api/position/add/', {
            cal: [Object.values(calPosition)[0], Object.values(calPosition)[1]],
            dday: [Object.values(ddayPosition)[0], Object.values(ddayPosition)[1]],
            note: [Object.values(notePosition)[0], Object.values(notePosition)[1]],
            todo: [Object.values(todoPosition)[0], Object.values(todoPosition)[1]],
        });
    }

    useEffect(() => {
        setToday(new Date().setHours(0, 0, 0, 0));
        axios.get('/api/position/' + "default")
            .then( (res) => {
                const n = res?.data;
                setCalPosition({x: n.cal[0], y: n.cal[1]});
                setTodoPosition({x: n.todo[0], y: n.todo[1]});
                setDdayPosition({x: n.dday[0], y: n.dday[1]});
                setNotePosition({x: n.note[0], y: n.note[1]});
                setId("default")
                return;
            })
            .catch( (err) => {
                console.log('Error loading positions: ', err);
                addNew();
                setId("default");
                console.log("position created")
            })
    }, [id]);

    useEffect(() => {

    }, [calPosition, todoPosition, ddayPosition, notePosition])

    // useEffect(() => {
    //     axios.get('/api/position/')
    //         .then( (res) => {
    //             const n = res?.data;
    //             if (n) {
    //                 setCalPosition({x: n.cal[0], y: n.cal[1]});
    //                 setTodoPosition({x: n.todo[0], y: n.todo[1]});
    //                 setDdayPosition({x: n.dday[0], y: n.dday[1]});
    //                 setNotePosition({x: n.note[0], y: n.note[1]});
    //                 setId("default");
    //             }
    //             return;
    //         })
    //         .catch( (err) => {
    //             setId("")
    //             console.log('Error loading positions');
    //         })
    // }, [id]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            // Depending on the layout, you may need to swap inlineSize with blockSize
            // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
            setWidth(event[0].contentBoxSize[0].inlineSize);
            const bodyRef = document.getElementById("leftContent");
            if (bodyRef){
                setHeight(bodyRef.clientHeight)
                //console.log("height: ", bodyRef.clientHeight)

            }
            //setHeight(event[0].contentBoxSize[0].blockSize);
            //console.log("height: ", event[0].contentBoxSize[0].blockSize)
            //console.log("width: ", event[0].contentBoxSize[0].inlineSize)
        });
        resizeObserver.observe(document.getElementById("leftBody"));
    });

    useEffect(() => {

    }, [date])

    useEffect(() => {

    }, [addPic, today]);

    useEffect(() => {
        if (!editMode && id != "") {
            change();
        }
    }, [editMode]);

    useEffect(() => {

    }, [stickerList, stickersOn, imgSrc, square, rect, circle]);


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imgSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('done', { croppedImage })
            await setStickerList([...stickerList, croppedImage])
            await setStickersOn([...stickersOn, true]);
            await setRoundStickers([...roundStickers, circle])
            console.log(roundStickers)
            setAddPic(false);
            setImageSrc(null);
            console.log("stickerlist: ", stickerList)
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
            let imageDataUrl = await readFile(file)
      
            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
            imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }
    
            setImageSrc(imageDataUrl)
        }
    }

    const handleDragStop = (e, position) => {
        const {x, y} = position;

        //setControlledPosition({x, y});
        console.log("X: ", x)
        console.log("Y: ", y)
    };
    return(
        <div className="leftInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12}>
                <div className="leftContent">
                    <div className="leftBody">
                    </div>
                    <div className="leftFooter">
                        <button onClick={()=> setShowWidgetSettings(!showWidgetSettings)}>widgets</button>
                        {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo}/>}
                        <button onClick={()=> setShowSettings(!showSettings)}>settings</button>
                        {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                        <button onClick={() => setEditMode()}><OpenWithRoundedIcon sx={{fontSize: '20px'}}/></button>
                    </div>
                </div>
            </GridLines> :
                <div className="leftContent" id="leftContent">
                    <div className="leftBody" id="leftBody">
                        {calendar && <Draggable bounds={{top: 0, left: 0, right: width-(350), bottom: height-(350 + 45)}} position={calPosition} onStop={(e, {x, y}) => setCalPosition({x, y})} handle="strong"><div><CalendarContainer move={editMode}/></div></Draggable>}
                        {todo && <Draggable bounds={{top: 0, left: 0, right: width-(320 - 98), bottom: height-(350 - 33)}} position={todoPosition} onStop={(e, {x, y}) => setTodoPosition({x, y})} handle="strong"><div><TodosContainer move={editMode} date={date}/></div></Draggable>} 
                        {notes && <Draggable bounds={{top: 0, left: 0, right: width-(320 - 118), bottom: height-(400- 153)}} position={notePosition} onStop={(e, {x, y}) => setNotePosition({x, y})} handle="strong"><div><NotesContainer move={editMode} date={date}/></div></Draggable>}
                        <div className="stickers">
                            {stickerList?.length > 0 &&
                                stickerList.map((value, index) => {
                                    if (stickersOn[index]) {
                                        return (
                                            <Draggable bounds={{top: 0, left: -112*index, right: width-112*(index+1), bottom: height-112*(index+1)}} handle="strong">
                                                <div className="stickerWidget">
                                                    <img alt={"sticker" + index} src={value} style={roundStickers[index] ? {borderRadius: "50%"} : {}}/>
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
                                      <Typography variant="overline" classes='sliderLabel'>
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
                                <div className="stickersShaper">
                                    <Typography variant="overline" classes='sliderLabel'>Crop Shape</Typography>
                                    <div className="stickerShape">
                                        <button style={ circle ? {borderColor: "black"} : {} } onClick={() => {setCircle(!circle); setSquare(false); setRect(false);}}><CircleOutlinedIcon sx={ circle ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                        <button style={ square ? {borderColor: "black"} : {} } onClick={() => {setSquare(!square); setCircle(false); setRect(false);}}><CropSquareSharpIcon sx={ square ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                        <button style={ rect ? {borderColor: "black"} : {} } onClick={() => {setRect(!rect); setSquare(false); setCircle(false);}}><CropPortraitSharpIcon sx={ rect ? {size: "30px"} : {size: "30px", color: "#d2d2d2"}}/></button>
                                    </div>
                                </div>
                                <Button
                                  onClick={showCroppedImage}
                                  variant="contained"
                                  color="primary"
                                  style={{fontSize: "1.5rem"}}>
                                  Done
                                </Button>
                              </div>
                            </div>
                        }
                    </div>
                    <div className="leftFooter">
                        <div className="leftWidget">
                            <button onClick={() => setAddPic(!addPic)}><AddPhotoAlternateOutlinedIcon sx={ addPic ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                            {addPic && <input type="file" onChange={onFileChange} accept="image/*" />}
                        </div>
                        <div className="leftWidget">
                            <button onClick={() => setEditMode()}><OpenWithRoundedIcon sx={ editMode ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                        </div>
                        <div className="leftWidget">
                            <button onClick={() => setShowWidgetSettings(!showWidgetSettings)}>{showWidgetSettings ? <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                            {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar} notes={notes} setNotes={setNotes} stickersOn={stickersOn} setStickersOn={setStickersOn} setDdayCounter={setDdayCounter} ddayCounter={ddayCounter}/>}
                        </div>
                        <div className="leftWidget">
                            <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? <SettingsOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                            {showSettings && <DisplaySettingsLeft grid={grid} setGrid={setGrid}/>}
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Left;