import Map from "../map/Map";
import { useState } from "react";
import axios from "axios";

const SearchLease = ({ closeForm, user }) => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchResult, setSearchRersult] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearchCriteria(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (searchCriteria) {
      await axios
        .get(
          `http://localhost:5000/api/users/${user.username}/search-lease/${searchCriteria}`
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
      setSearchCriteria("");
      console.log(searchCriteria);
    }
  };

  const searchBar = (
    <>
      <input
        type="search"
        placeholder="search by city or zip"
        //name="searchCriteria"
        value={searchCriteria}
        onChange={handleChange}
      ></input>
      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </>
  );

  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <div>{searchResult && <Map />}</div>
      <div>{searchBar}</div>
    </>
  );
};

export default SearchLease;
