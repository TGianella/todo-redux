export default function todoReducer(draft, action) {
    switch (action.type) {
        case 'added': {
            draft.push({
                text: action.text,
                id: action.id,
                done: false,
            });
            break;
        }
        case 'changed': {
            const index = draft.findIndex((t) => t.id === action.id);
            draft[index] = {
                ...draft[index],
                done: !draft[index].done,
            };
            break;

        }
        case 'deleted': {
            return draft.filter((todo) => todo.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}