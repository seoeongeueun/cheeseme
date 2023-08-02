const ADD_REMINDER = 'reminders/ADD_REMINDER';
const TOGGLE_REMINDER = 'reminders/TOGGLE_REMINDER';
const EDIT_REMINDER = 'reminders/EDIT_REMINDER';
const DELETE_REMINDER = 'reminders/DELETE_REMINDER';

export const addReminder = (title, detail) => ({
  type: ADD_REMINDER,
  reminder: {
    title,
    detail,
  },
});

export const toggleReminder = (_id) => ({
  type: TOGGLE_REMINDER,
  _id,
});

export const editReminder = (_id, title, detail) => ({
  type: EDIT_REMINDER,
  title,
  detail,
});

export const deleteReminder = (_id) => ({
  type: DELETE_REMINDER,
  _id,
});

const initialState = [];

export default function reminders(state = initialState, action) {
  switch (action.type) {
    case ADD_REMINDER:
      return state.concat(action.reminder);
    case TOGGLE_REMINDER:
      return state.map((reminder) =>
        reminder._id === action._id
          ? { ...reminder, check: !reminder.check }
          : reminder
      );
    case EDIT_REMINDER:
      return state.map((reminder) =>
        reminder._id === action._id
          ? {
              ...reminder,
              title: action.reminder.title,
              detail: action.reminder.detail,
            }
          : reminder
      );
    case DELETE_REMINDER:
      return state.filter((e) => e._id !== action._id);
    default:
      return state;
  }
}
