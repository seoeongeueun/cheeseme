const CURRENT_NAME = 'nameInfo/CURRENT_NAME';

export const currentName = name => ({
    type: CURRENT_NAME,
    name
})

const initialState = '';

export default function nameInfo( state = initialState, action) {
    switch (action.type) {
        case CURRENT_NAME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}