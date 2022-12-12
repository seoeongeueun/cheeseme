const TOGGLE_LEFT = 'editMode/TOGGLE_LEFT';
const TOGGLE_RIGHT = 'editMode/TOGGLE_RIGHT';

export const toggleLeft = () => ({
    type: TOGGLE_LEFT
});

export const toggleRight = () => ({
    type: TOGGLE_RIGHT
});

const initialState = [{
    leftEdit: false,
    rightEdit: false
}];

export default function editMode( state = initialState, action ){
    switch (action.type) {
        case TOGGLE_LEFT:
            return {
                ...state,
                leftEdit: !state.leftEdit
            };
        case TOGGLE_RIGHT:
            return {
                ...state,
                rightEdit: !state.rightEdit
            }
        default:
            return state;
    }
}