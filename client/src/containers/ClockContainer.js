import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clock from '../widgets/Clock';

function ClockContainer(props) {
  const { date } = useSelector((state) => ({
    date: state.datePick.date,
  }));

  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));

  return <Clock move={props.move} userId={userId} />;
}

export default ClockContainer;
