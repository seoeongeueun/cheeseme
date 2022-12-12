const ADD_GOAL = 'todos/ADD_GOAL';
const TOGGLE_GOAL = 'todos/TOGGLE_GOAL';

let nextId = 1;
export const addGoal = text => ({
    type: ADD_GOAL,
    goal: {
        id: nextId++,
        text
    }
});

export const toggleGoal = id => ({
    type: TOGGLE_GOAL,
    id
});

const initialState = [
    {
        id: 1,
        text: '예시',
        done: false
    }
]

export default function goals( state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat(action.goal);
        case TOGGLE_GOAL:
            return state.map(
                goal =>
                    goal.id === action.id
                    ? { ...goal, done: !goal.done}
                    : goal
            );
        default:
            return state;
    }
}
