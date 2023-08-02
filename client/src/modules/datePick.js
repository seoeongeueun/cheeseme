const CHANGE_DATE = 'datePick/CHANGE_DATE';

export const changeDate = (date) => ({
  type: CHANGE_DATE,
  date,
});

const initialState = {
  date: new Date().setHours(0, 0, 0, 0),
};

export default function date(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
