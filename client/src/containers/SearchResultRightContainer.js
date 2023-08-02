import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultRight from '../components/SearchResultRight.js';
import { changeDate } from '../modules/datePick';

function SearchResultRightContainer(props) {
  const { userId } = useSelector((state) => ({
    userId: state.loginInfo.userId,
  }));
  const dispatch = useDispatch();
  const onChangeDate = (d) => dispatch(changeDate(d));

  return (
    <SearchResultRight
      userId={userId}
      onChangeDate={onChangeDate}
      keyword={props.keyword}
      setSearch={props.setSearch}
    />
  );
}

export default SearchResultRightContainer;
