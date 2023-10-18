

export default function Todo({ todo }) {

    return (
        <li>
            <h2>{todo.text}</h2>
            <input type="checkbox"></input>
        </li>
    )
}