import { useEffect, useState } from 'react';
import DisplaySettings from '../modals/DisplaySettings';
import GridLines from 'react-gridlines';
import PlainRight from './PlainRight';

function Right(){
    const [showSettings, setShowSettings] = useState(false);
    const [grid, setGrid] = useState(false);
    const [sns, setSns] = useState(true);
    

    useEffect(() => {

    }, [showSettings, grid, sns]);

    return(
        <div className="rightInnerBorder">
            {grid ? <GridLines className="grid-area" cellWidth={60} strokeWidth={2} cellWidth2={12}>
                <div className="rightContent">
                    <div className="rightHeader">
                        <p>Bigger Boys And Stolen Sweethearts - Arctic Monkeys</p>
                    </div>
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span className="profileArea"/>
                        </div>
                        <div className="rightBodyMain">
                            <span className="postImageArea"/>
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button>heart</button>
                                    <button>bookmark</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button>write</button>
                                    <button>bin</button>
                                    <button onClick={() => setShowSettings(!showSettings)}>setting</button>
                                    {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                </div>
                            </div>
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50"></textarea>
                                <div className="inputButtons">
                                    <button className="save">SAVE</button>
                                    <button className="cancel">CANCEL</button>
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
                        <p>Bigger Boys And Stolen Sweethearts - Arctic Monkeys</p>
                    </div>
                    {sns ? 
                    <div className="rightBody">
                        <div className="rightBodyHeader">
                            <span className="profileArea"/>
                        </div>
                        <div className="rightBodyMain">
                            <span className="postImageArea"/>
                            <div className="postButtons">
                                <div className="postButtonsLeft">
                                    <button>heart</button>
                                    <button>bookmark</button>
                                </div>
                                <div className="postButtonsRight">
                                    <button>write</button>
                                    <button>bin</button>
                                    <button onClick={()=> setShowSettings(!showSettings)}>setting</button>
                                    {showSettings && <DisplaySettings grid={grid} setGrid={setGrid} setSns={setSns} sns={sns}/>}
                                </div>
                            </div>
                            <div className="postInput">
                                <textarea id="text" name="text" rows="12" cols="50"></textarea>
                                <div className="inputButtons">
                                    <button className="save">SAVE</button>
                                    <button className="cancel">CANCEL</button>
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