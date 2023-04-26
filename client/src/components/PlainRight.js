import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import DisplaySettings from '../modals/DisplaySettings';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloudColor from '../icons/cloud (1).png';
import CloudPlain from '../icons/cloud.png';
import UmbPlain from '../icons/umbrella (1).png';
import UmbColor from '../icons/umbrella.png';
import SunColor from '../icons/sunny (1).png';
import SunPlain from '../icons/sunny.png';
import SnowPlain from '../icons/snowman (1).png';
import SnowColor from '../icons/snowman.png';



function PlainRight(props) {
    const [body, setBody] = useState("")
    const [showSettings, setShowSettings] = useState(false);
    const [closeQuill, setCloseQuill] = useState(true);
    const [date, setDate] = useState(props.date);
    const [weather, setWeather] = useState('');
    
    useEffect(()=> {

    }, [showSettings, props.grid, props.sns, closeQuill, props.edit, weather]);

    const handleBody = (e) => {
        setBody(e);
    }

    const handleEdit = () => {
        setCloseQuill(false);
        props.setEdit(true);
    }
    const handleSave = () => {
        setCloseQuill(true);
        props.setEdit(false);
    }

    return(
        <div className='plainRight'>
            <div className="rightBody">
                <div className="rightBodyHeader">
                    <span>{date}</span>
                    <div className='weatherMood'>
                        <button onClick={() => setWeather('sunny')}><img alt= "sunny" src={weather === 'sunny' ? SunColor : SunPlain}/></button>
                        <button onClick={() => setWeather('cloud')}><img alt= "cloud" src={weather === 'cloud' ? CloudColor : CloudPlain}/></button>
                        <button onClick={() => setWeather('rainy')}><img alt= "rainy" src={weather === 'rainy' ? UmbColor : UmbPlain}/></button>
                        <button onClick={() => setWeather('snowy')}><img alt= "snowy" src={weather === 'snowy' ? SnowColor : SnowPlain}/></button>
                    </div>
                </div>
                <ReactQuill
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? PlainRight.modules2 : PlainRight.modules}
                    formats={PlainRight.formats}
                >
                    <div className="ql-container" style={props.edit ? {height: '70%'} : {}}/>
                </ReactQuill>
            </div>
            {!closeQuill ? 
                <div className="inputButtons">
                    <button className="save" onClick={handleSave}>SAVE</button>
                    <button className="cancel">CANCEL</button>
                </div> :
                <div className='plainRightFooter'>
                    <div className='blank' style={{opacity: '0'}}/>
                    <div className="postButtonsPlain">
                        <button onClick={handleEdit}><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                        <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem", color: "#F9D876"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                        {showSettings && <DisplaySettings grid={props.grid} setGrid={props.setGrid} setSns={props.setSns} sns={props.sns}/>}
                    </div>
                </div>
            }
        </div>
    )
}

PlainRight.modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image']
    ],
};

PlainRight.modules2 = {
    toolbar: false,
};

PlainRight.formats = [
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

export default PlainRight;
