import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultRight from '../components/SearchResultRight.js'
import { changeDate } from '../modules/datePick';

function SearchResultRightContainer(props) {

    const dispatch = useDispatch();
    const onChangeDate = d => dispatch(changeDate(d));

    return <SearchResultRight onChangeDate={onChangeDate} keyword={props.keyword} setSearch={props.setSearch}/>;
}

export default SearchResultRightContainer;
