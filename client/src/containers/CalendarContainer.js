import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../widgets/Calendar';
import { changeDate } from '../modules/datePick';

function CalendarContainer(props) {
  const { date } = useSelector((state) => ({
    date: state.datePick.date,
  }));

  const dispatch = useDispatch();
  const onChangeDate = (d) => dispatch(changeDate(d));

  return <Calendar move={props.move} onChangeDate={onChangeDate} date={date} />;
}

export default CalendarContainer;
