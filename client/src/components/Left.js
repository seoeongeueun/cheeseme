import { useEffect, useState, useCallback } from 'react'
import GridLines from 'react-gridlines';
import DisplaySettingsLeft from '../modals/DisplaySettingsLeft';
import AddPicSettings from '../modals/AddPicSettings';
import WidgetSettingsLeft from '../modals/WidgetSettingsLeft';
import Todo from '../widgets/Todo';
import Notes from '../widgets/Notes';
import CalendarWidget from '../widgets/Calendar';
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

function Left(){
    const [showSettings, setShowSettings] = useState(false);
    const [showWidgetSettings, setShowWidgetSettings] = useState(false);

    const [grid, setGrid] = useState(false);

    const [todo, setTodo] = useState(true);
    const [calendar, setCalendar] = useState(true);
    const [notes, setNotes] = useState(true);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [editMode, setEditMode] = useState(false);
    const [addPic, setAddPic] = useState(false);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [stickerList, setStickerList] = useState([]);
    const [stickersOn, setStickersOn] = useState([]);

    const [imgSrc, setImageSrc] = useState();
    
    const ORIENTATION_TO_ANGLE = {
        '3': 180,
        '6': 90,
        '8': -90,
    }

    useEffect(() => {
        const bodyRef = document.getElementById("leftContent");
        if (bodyRef){
            setHeight(bodyRef.offsetHeight)
            setWidth(bodyRef.offsetWidth)
        }
    }, []);

    useEffect(() => {

    }, [editMode, addPic]);

    useEffect(() => {

    }, [stickerList, stickersOn, imgSrc]);


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
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
            setAddPic(false);
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
                        <button onClick={() => setEditMode(!editMode)}><OpenWithRoundedIcon sx={{fontSize: '20px'}}/></button>
                    </div>
                </div>
            </GridLines> :
            <div className="leftContent" id="leftContent">
                    <div className="leftBody">
                        {calendar && <Draggable bounds={{top: 0, left: 0, right: width-398, bottom: height-464}} handle="strong"><div><CalendarWidget move={editMode}/></div></Draggable>}
                        {todo && <Draggable bounds={{top: 0, left: 0, right: width-320, bottom: height-224}} handle="strong"><div><Todo move={editMode}/></div></Draggable>} 
                        {notes && <Draggable bounds={{top: 0, left: 0, right: width-300, bottom: height-248}} handle="strong"><div><Notes move={editMode}/></div></Draggable>}
                        <div className="stickers">
                            {stickerList?.length > 0 &&
                                stickerList.map((value, index) => {
                                    if (stickersOn[index]) {
                                        return (
                                            <Draggable bounds={{top: 0, left: 0, right: width-300, bottom: height-248}} handle="strong">
                                                <div className="stickerWidget">
                                                    <img alt={"sticker" + index} src={value}/>
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
                    </div>
                    <div className="leftFooter">
                        <div className="leftWidget">
                            <button onClick={() => setAddPic(!addPic)}><AddPhotoAlternateOutlinedIcon sx={{fontSize: '2.3rem'}}/></button>
                            {addPic && <input type="file" onChange={onFileChange} accept="image/*" />}
                            {(addPic && imgSrc) && <div className='stickerMakerBox'>
                                <div className='stickerMaker'>
                                    <Cropper
                                      image={imgSrc}
                                      crop={crop}
                                      rotation={rotation}
                                      zoom={zoom}
                                      aspect={1 / 1}
                                      onCropChange={setCrop}
                                      onRotationChange={setRotation}
                                      onCropComplete={onCropComplete}
                                      onZoomChange={setZoom}
                                    />
                                  </div>
                                  <div className='stickerMakerSettings'>
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
                                    <Button
                                      onClick={showCroppedImage}
                                      variant="contained"
                                      color="primary">
                                      Done
                                    </Button>
                                  </div>
                                </div>
                            }
                        </div>
                        <div className="leftWidget">
                            <button onClick={() => setEditMode(!editMode)}><OpenWithRoundedIcon sx={ editMode ? {fontSize: '2.3rem', color: '#F9D876'} : {fontSize: '2.3rem'}}/></button>
                        </div>
                        <div className="leftWidget">
                            <button onClick={() => setShowWidgetSettings(!showWidgetSettings)}>{showWidgetSettings ? <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <DashboardCustomizeOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                            {showWidgetSettings && <WidgetSettingsLeft todo={todo} setTodo={setTodo} calendar={calendar} setCalendar={setCalendar} notes={notes} setNotes={setNotes} stickersOn={stickersOn} setStickersOn={setStickersOn}/>}
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