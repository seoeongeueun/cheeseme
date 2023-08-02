const EDIT_NOTE = 'notes/EDIT_NOTE';
const CREATE_NOTE = 'notes/CREATE_NOTE';

export const editNote = (text) => ({
  type: EDIT_NOTE,
  text,
});

export const createNote = (date) => ({
  type: CREATE_NOTE,
  date,
});

const initialState = {
  date: new Date(),
  text: '',
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case EDIT_NOTE:
      return {
        ...state,
        text: action.text,
      };
    case CREATE_NOTE:
      return {
        date: action.date,
        text: '',
      };
    default:
      return state;
  }
}
