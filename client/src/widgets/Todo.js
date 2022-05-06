import { useEffect, useState } from 'react'

function Todo(){
    return (
        <div className="todoWidget">
            <p1>To Do</p1>
            <div className="todoList">
                <div className="checkboxButton">
                    <input type="checkbox" name="check1"/>
                    <label>Study cse 323</label>
                </div>
                <div className="checkboxButton">
                    <input type="checkbox" name="check2"/>
                    <label>Test todo 2</label>
                </div>
            </div>
        </div>
    )

}

export default Todo;