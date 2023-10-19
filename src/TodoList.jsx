import { useState } from 'react'
import { useImmerReducer } from 'use-immer'
import styled, { ThemeProvider } from 'styled-components'
import Todo from './Todo'
import todoReducer from './todoReducer'

const List = styled.ul`
    list-style-type: none;
    max-width: 20em;
`

const StyledTodo = styled(Todo)`
    background-color: ${props => props.todo.done ? props.theme.bgMain : "white"};
    max-width: 20em;
    color: ${props => props.theme.main};
    margin-top: 10px;
    border-top: 1px solid ${props => props.theme.secondary};
    padding-top: 10px;
    &:first-child {
        border-top: none
    }
`
const initialTodo = {id: 0, text: "Faire les courses", done: false}
let nextId = 1

const initialTheme = {
    main: 'red',
    secondary: 'green',
    bgMain: 'lightsteelblue',
    bgSecondary: 'lavenderblush',
}

export default function TodoList() {
    const [todos, dispatch] = useImmerReducer(todoReducer, [initialTodo])
    const [newTodo, setNewTodo] = useState('')
    const [selectedTheme, setSelectedTheme] = useState(initialTheme)
    

    const listTodos = todos.map(todo =>
         <StyledTodo 
            key={todo.id}  
            todo={todo}
            handleChange={handleChangeTask}
            handleClick={handleDeleteTask}>
        </StyledTodo>
    )

    function handleAddTask(e) {
        e.preventDefault()
        dispatch({
            type: 'added',
            text: e.target[0].value,
            id: nextId++
        })
        setNewTodo('')
    }

    function handleChangeTask(todoId) {
        dispatch({
            type: 'changed',
            id: todoId,
        })
    }

    function handleDeleteTask(todoId) {
        dispatch({
            type: 'deleted',
            id: todoId,
        })
    }

    function handleThemeSwitch() {
        setSelectedTheme(invertTheme(selectedTheme))
        
    }

    function invertTheme(theme) {
        return {
            main: theme.secondary,
            secondary: theme.main,
            bgMain: theme.bgSecondary,
            bgSecondary: theme.bgMain,
        }
    }

    return (
        <ThemeProvider theme={selectedTheme}>
            <List>
                {listTodos}
            </List>
            <form onSubmit={handleAddTask}>
                <input 
                    type="text" 
                    name="text" 
                    value={newTodo} 
                    onChange={(e) => setNewTodo(e.target.value)}
                >
                </input>
                <button type="submit">Add todo</button>
            </form>
                <button onClick={handleThemeSwitch}>Change theme</button>
        </ThemeProvider>
    )
}