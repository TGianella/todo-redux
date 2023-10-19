import styled from 'styled-components'

const Title = styled.h2`
    margin-top: auto;
`

const DeleteButton = styled.button`
    background-color: white;
    margin-left: 1em;
    border-color: red;
    border-radius: 25%;
    color: red;
    font-weight: bold;
`

export default function Todo({ todo, handleChange, handleClick, className }) {

    return (
        <li className={className}>
            <Title>{todo.text}</Title>
            <span>
                <input type="checkbox" checked={todo.done} onChange={() => handleChange(todo.id)}></input>
                <label>Done</label>
            </span>
            <DeleteButton onClick={() => handleClick(todo.id)}>X</DeleteButton>
        </li>
    )
}