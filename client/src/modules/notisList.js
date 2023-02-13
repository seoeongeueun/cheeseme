const CURRENT_NOTIS = 'notisList/CURRENT_NOTIS';
const ADD_NOTI = 'notisList/ADD_NOTI';
const REMOVE_NOTI = 'notisList/REMOVE_NOTI';
const TOGGLE_NOTI = 'notisList/TOGGLE_NOTI';

const initialState = [];

export const currentNotis = (notis) => ({
    type: CURRENT_NOTIS,
    notis
})

export const addNoti = (noti) => ({
    type: ADD_NOTI,
    noti
})

export const removeFriend = (id) => ({
    type: REMOVE_NOTI,
    id
})

export const toggleNoti = (id) => ({
    type: TOGGLE_NOTI,
    id
})


export default function notisList( state = initialState, action) {
    switch (action.type) {
        case CURRENT_NOTIS:
            return action.notis;
        case ADD_NOTI:
            return [action.noti, ...state];
        case REMOVE_NOTI:
            return state.filter(e => e._id !== action.id);
        case TOGGLE_NOTI:
            return state.map(
                noti =>
                    noti._id === action.id
                    ? { ...noti, done: !noti.done}
                    : noti
            ); 
        default:
            return state;
    }
}