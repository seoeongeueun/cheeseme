const CURRENT_POSITIONS = 'positionsList/CURRENT_POSITIONS';

export const currentPositions = (positions) => ({
    type: CURRENT_POSITIONS,
    positions
});

const initialState = [];

export default function positionsList( state = initialState, action) {
    switch (action.type) {
        case CURRENT_POSITIONS:
            return action.positions;
        default:
            return state;
    }
}