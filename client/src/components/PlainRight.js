import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "../../node_modules/quill/dist/quill.snow.css";
import DisplaySettings from '../modals/DisplaySettings';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

function PlainRight(props) {
    const [body, setBody] = useState("")
    const [showSettings, setShowSettings] = useState(false);
    const [closeQuill, setCloseQuill] = useState(true);
    
    useEffect(()=> {

    }, [showSettings, props.grid, props.sns, closeQuill, props.edit]);

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
                <ReactQuill
                    readOnly={closeQuill}
                    style={closeQuill ? {border: "none"} : {border: "none"}}
                    modules={closeQuill ? PlainRight.modules2 : PlainRight.modules}
                >
                    <div className="ql-container" style={props.edit ? null : {height: "100%"}}/>
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
                        <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                        {showSettings && <DisplaySettings grid={props.grid} setGrid={props.setGrid} setSns={props.setSns} sns={props.sns}/>}
                    </div>
                </div>
            }
        </div>
    )
}

PlainRight.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]
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