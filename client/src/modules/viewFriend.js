const SET_FRIENDID = 'viewFriend/SET_FRIENDID';

export const setFriendId = friendId => ({
    type: SET_FRIENDID,
    friendId
});

const initialState = '';

export default function viewFriend( state = initialState, action) {
    switch (action.type) {
        case SET_FRIENDID:
            return {
                ...state,
                friendId: action.friendId
            }
        default:
            return state;
    }
}