import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import DisplaySettings from '../modals/DisplaySettings';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SadColor from '../icons/sad.png';
import HappyColor from '../icons/happy.png';
import SadPlain from '../icons/sad (1).png';
import HappyPlain from '../icons/happy (1).png';

function PlainRight(props) {
    const [body, setBody] = useState("")
    const [showSettings, setShowSettings] = useState(false);
    const [closeQuill, setCloseQuill] = useState(true);
    const [date, setDate] = useState(props.date);
    const [happy, setHappy] = useState();
    
    useEffect(()=> {

    }, [showSettings, props.grid, props.sns, closeQuill, props.edit, happy]);

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
                    <div className='faceMood'>
                        <button onClick={() => setHappy(true)}><img src={happy ? HappyColor : HappyPlain} style={happy ? {width: '2.1rem', height: '2.1rem'} : null}/></button>
                        <button onClick={() => setHappy(false)}><img src={!happy ? SadColor : SadPlain} style={!happy ? {width: '2.1rem', height: '2.1rem'} : null}/></button>
                    </div>
                    <span>{date}</span>
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