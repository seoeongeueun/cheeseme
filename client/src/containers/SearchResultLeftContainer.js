import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultLeft from '../components/SearchResultLeft.js'
import { changeDate } from '../modules/datePick';

function SearchResultLeftContainer(props) {

    const dispatch = useDispatch();
    const onChangeDate = d => dispatch(changeDate(d));

    return <SearchResultLeft onChangeDate={onChangeDate} keyword={props.keyword} setSearch={props.setSearch}/>;
}

export default SearchResultLeftContainer;
