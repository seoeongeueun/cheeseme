
function SearchResultLeft(props){
    return (
        <div className='leftInnerBorder'>
            <div className="leftContent">
                <p>Search Results for {props.keyword}</p>
            </div>
        </div>
    )
}

export default SearchResultLeft;