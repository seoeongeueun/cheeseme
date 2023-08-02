import React from 'react';
import { useSelector } from 'react-redux';
import Clock from '../widgets/Clock';

function ClockContainer(props) {
  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));

  return <Clock move={props.move} userId={userId} />;
}

export default ClockContainer;
