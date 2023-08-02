const CURRENT_FRIENDS = 'friendsList/CURRENT_FRIENDS';
const ADD_FRIEND = 'friendsList/ADD_FRIEND';
const REMOVE_FRIEND = 'friendsList/REMOVE_FRIEND';
const FAV_FRIEND = 'friendsList/FAV_FRIEND';

const initialState = [];

export const currentFriends = (friends) => ({
  type: CURRENT_FRIENDS,
  friends,
});

export const addFriend = (name) => ({
  type: ADD_FRIEND,
  friend: {
    name: name,
    fav: false,
  },
});

export const removeFriend = (name) => ({
  type: REMOVE_FRIEND,
  name,
});

export const favFriend = (name) => ({
  type: FAV_FRIEND,
  name,
});

export default function friendsList(state = initialState, action) {
  switch (action.type) {
    case CURRENT_FRIENDS:
      return action.friends;
    case ADD_FRIEND:
      return state.concat(action.friend);
    case REMOVE_FRIEND:
      return state.filter((e) => e.name !== action.name);
    case FAV_FRIEND:
      return state.map((friend) =>
        friend.name === action.name ? { ...friend, fav: !friend.fav } : friend
      );
    default:
      return state;
  }
}
