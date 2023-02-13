const CURRENT_USER = 'loginInfo/CURRENT_USER';

export const currentUser = userId => ({
    type: CURRENT_USER,
    userId
});

const initialState = '';

export default function loginInfo( state = initialState, action) {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state,
                userId: action.userId
            }
        default:
            return state;
    }
}