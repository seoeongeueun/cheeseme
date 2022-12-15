const EDIT_NOTE = 'notes/EDIT_NOTE';
const CREATE_NOTE = 'notes/CREATE_NOTE';

export const editNote = text => ({
    type: EDIT_NOTE,
    text
});

export const createNote = (id) => ({
    type: CREATE_NOTE,
    id
})

const initialState = {
    id: new Date(),
    text: '안녕'
};

export default function notes( state = initialState, action) {
    switch (action.type) {
        case EDIT_NOTE:
            return {
                ...state,
                text: action.text
            }
        case CREATE_NOTE:
            return {
                id: action.id,
                text: ''
            }
        default:
            return state;
    }
}