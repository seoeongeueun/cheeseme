import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultLeft from '../components/SearchResultLeft.js';
import { changeDate } from '../modules/datePick';

function SearchResultLeftContainer(props) {
  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));

  const dispatch = useDispatch();
  const onChangeDate = (d) => dispatch(changeDate(d));

  return (
    <SearchResultLeft
      userId={userId}
      onChangeDate={onChangeDate}
      keyword={props.keyword}
      setSearch={props.setSearch}
    />
  );
}

export default SearchResultLeftContainer;
