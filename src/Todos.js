import React from 'react'


const Todos = ({todos, deleteToDo, completedToDo}) => {
    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div className="collection-item" key={todo.id}>
              
                    <li><span className={todo.completed.toString()} onClick={() => { completedToDo(todo.id) }}>{todo.text}</span><span className="delete" onClick={() => { deleteToDo(todo.id) }}><i className='fas fa-trash'></i></span></li>
                </div>
                
            )
        })
    ) : (
        <li>You have no Todos left</li>
    )
    return (
        <div className="collection">
            { todoList }
        </div>
    )
}

export default Todos;