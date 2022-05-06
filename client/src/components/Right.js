import { useEffect, useState } from 'react'

function Right(){
    useEffect(() => {

    });

    return(
        <div className="rightInnerBorder">
            <div className="rightContent">
                <div className="rightHeader">
                    <p>Bigger Boys And Stolen Sweethearts - Arctic Monkeys</p>
                </div>
                <div className="rightBody">
                    <div className="rightBodyHeader">
                        <span class="profileArea"/>
                    </div>
                    <div className="rightBodyMain">
                        <span class="postImageArea"/>
                        <div className="postButtons">

                        </div>
                        <div className="postInput">
                            <textarea id="text" name="text" rows="12" cols="50"></textarea>
                            <div className="inputButtons">
                                <button className="save">SAVE</button>
                                <button className="cancel">CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightFooter">

                </div>
            </div>
        </div>
    );
}

export default Right;