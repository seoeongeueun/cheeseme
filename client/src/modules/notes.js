const EDIT_NOTE = 'notes/EDIT_NOTE';

export const editNote = text => ({
    type: EDIT_NOTE,
    text
});

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
        default:
            return state;
    }
}