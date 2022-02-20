import React, {useState} from 'react'
import Todo from './Todo'


const Form = () => {
    const [todo, setTodo] = useState({})
    const [todos, setTodos] = useState([
        {todo: 'Tasca 1'},
        {todo: 'Tasca 2'},
        {todo: 'Tasca 3'}
    ])

    const handleChange = e => setTodo({[e.target.name]: e.target.value})

    const handleClick = e => {
        if(Object.keys(todo).length === 0 || todo.todo.trim() === '') {
            alert('el campo no puede estar vacio')
            return
        }
        setTodos([...todos, todo])
    }

    const deleteTodo = indice => {
        const resetTodos = [...todos]
        resetTodos.splice(indice, 1)
        setTodos(resetTodos)
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" name="todo" onChange={handleChange}/>
                <button onClick={handleClick}>Afegir Tasca</button>
            </form>
            {
                todos.map((value, index) => (
                    <Todo todo={value.todo} key={index} index={index} deleteTodo={deleteTodo}/>
                ))
            }
        </>
    )
}

export default Form