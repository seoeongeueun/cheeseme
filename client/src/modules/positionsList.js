const CURRENT_POSITIONS = 'positionsList/CURRENT_POSITIONS';

export const currentPositions = (positions) => ({
    type: CURRENT_POSITIONS,
    positions
});

const initialState = [{name: 'cal', x: 0, y: 0, show: true},
{name: 'dday', x: 0, y: 0, show: true},
{name: 'note', x: 0, y: 0, show: true},
{name: 'todo', x: 0, y: 0, show: true},
{name: 'reminder', x: 0, y: 0, show: true}];

export default function positionsList( state = initialState, action) {
    switch (action.type) {
        case CURRENT_POSITIONS:
            return action.positions;
        default:
            return state;
    }
}