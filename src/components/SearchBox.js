import React from "react";
const SearchBox = (porps) => {
    return (
        <div className="col col-sm-4">
            <input className="form-control" value={porps.value} onChange={(event) => porps.setSearchValue(event.target.value)} placeholder="type to search..."></input>
        </div>
    );
}
export default SearchBox;