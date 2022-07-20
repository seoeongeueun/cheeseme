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

function Right(){
    const [showSettings, setShowSettings] = useState(false);
    const [grid, setGrid] = useState(false);
    const [sns, setSns] = useState(true);

    const [heart, setHeart] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const [open, setOpen] = useState(false);

    const [postImage, setPostImage] = useState(false);
    

    useEffect(() => {

    }, [showSettings, grid, sns]);

    useEffect(() => {

    }, [heart])

    const onClickHeart = () => {
        if (heart) {
            setHeart(false)
        } else {
            setHeart(true)
        }
    }

    const onClickBookmark = () => {
        if (bookmark) {
            setBookmark(false)
        } else {
            setBookmark(true)
        }
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return(
        <div className="rightInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12} lineColor={"#e5e5e5"} lineColor2={"#efefef"}>
                <div className="rightContent">
                    <div className="rightHeader">
                        <p>Some Random Title To Fill Up Some Space</p>
                    </div>
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span className="profileArea"/>
                        </div>
                        <div className="rightBodyMain">
                            {postImage ? <div className='postImageArea'/> :
                                <IconButton className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                    <input hidden accept="image/*" type="file" />
                                    <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>
                                </IconButton>}
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button onClick={onClickHeart}>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <button onClick={onClickBookmark}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
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
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50"></textarea>
                                <div className="inputButtons">
                                    <button className="save">Save</button>
                                    <button className="cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> : <PlainRight grid={grid} setGrid={setGrid} sns={sns} setSns={setSns}/>}
                    <div className="rightFooter">

                    </div>
                </div>
            </GridLines> :
            <div className="rightContent">
                    <div className="rightHeader">
                        <p>Some Random Title To Fill Up Some Space</p>
                    </div>
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span className="profileArea"/>
                        </div>
                        <div className="rightBodyMain">
                            {postImage ? <div className='postImageArea'/> :
                            <IconButton className="uploadIcon" color="primary" aria-label="upload picture" component="label" style={{borderRadius: "0", backgroundColor: "#e9e9e9", border: "1px solid #a4a4a4", color: "#F9D876"}}>
                                <input hidden accept="image/*" type="file" />
                                <PhotoCamera sx={{fontSize: "5rem", color: "#929292"}}/>
                            </IconButton>}
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button onClick={onClickHeart}>{heart ? <FavoriteTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <FavoriteBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    <button onClick={onClickBookmark}>{bookmark ? <BookmarkTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <BookmarkBorderOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button><CreateOutlinedIcon sx={{fontSize: "2.3rem"}}/></button>
                                    <button onClick={handleClickOpen}>{open ? <DeleteTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <DeleteOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
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
                                    <button onClick={()=> setShowSettings(!showSettings)}>{showSettings ? <SettingsTwoToneIcon sx={{fontSize: "2.3rem"}}/> : <SettingsOutlinedIcon sx={{fontSize: "2.3rem"}}/>}</button>
                                    {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                </div>
                            </div>
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50"></textarea>
                                <div className="inputButtons">
                                    <button className="save">Save</button>
                                    <button className="cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> : <PlainRight grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                    <div className="rightFooter">

                    </div>
                </div>}
        </div>
    );
}

export default Right;