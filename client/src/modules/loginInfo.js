const CURRENT_USER = 'loginInfo/CURRENT_USER';
const CURRENT_NAME = 'loginInfo/CURRENT_NAME';

export const currentUser = userId => ({
    type: CURRENT_USER,
    userId
});

export const currentName = name => ({
    type: CURRENT_NAME,
    name
})

const initialState = '';

export default function loginInfo( state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state,
                userId: action.userId
            }
        case CURRENT_NAME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}