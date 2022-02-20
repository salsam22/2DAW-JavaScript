import React from 'react'

const Todo = ({todo, index, deleteTodo}) => {
    return (
        <>
            <div className="list">
                <h3>{todo}</h3> <button  onClick={() => deleteTodo(index)}>X</button>
            </div>
        </>
    )
}
export default Todo