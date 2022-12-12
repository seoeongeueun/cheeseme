const ADD_GOAL = 'todos/ADD_GOAL';
const TOGGLE_GOAL = 'todos/TOGGLE_GOAL';
const EDIT_GOAL = 'todos/EDIT_GOAL';
const DELETE_GOAL = 'todos/DELETE_GOAL';

let nextId = 1;
export const addGoal = text => ({
    type: ADD_GOAL,
    goal: {
        id: nextId++,
        text
    }
});

export const toggleGoal = (id, text) => ({
    type: TOGGLE_GOAL,
    id
});

export const editGoal = id => ({
    type: EDIT_GOAL,
    id
})

export const deleteGoal = (id) => ({
    type: DELETE_GOAL,
    id
});

const initialState = [];

export default function goals(state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat(action.goal);
        case TOGGLE_GOAL:
            return state.map(
                goal =>
                    goal.id === action.id
                    ? { ...goal, check: !goal.check}
                    : goal
            );
        case EDIT_GOAL:
            return state.map(
                goal =>
                    goal.id === action.id
                    ? { ...goal, text: action.goal.text}
                    : goal
            );
        case DELETE_GOAL:
            return state.filter( e => e.id !== action.id);
        default:
            return state;
    }
};
