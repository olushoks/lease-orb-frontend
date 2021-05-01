import Map from "../map/Map";
import { useState } from "react";
import axios from "axios";

const SearchLease = ({ closeForm, user }) => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchCriteria) {
      await axios
        .get(
          `http://localhost:5000/api/users/${user.username}/search-lease/${searchCriteria}`
        )
        .then(({ data }) => {
          setSearchResult(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
      setSearchCriteria("");
    }
  };

  const indicateInterestInLease = async (lease) => {
    console.log(lease.name);
    await axios
      .post(
        `http://localhost:5000/api/users/${user.username}/show-interest/${lease._id}`,
        null
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
    </>
  );

  let displayResult;

  if (searchResult) {
    displayResult =
      searchResult.length === 0 ? (
        <>No results found. Please refine your search</>
      ) : (
        searchResult.map((result) => {
          return (
            <div>
              <p>
                {result.name} posted by {result.postedBy}
              </p>
              <p>{result.address}</p>
              <p>
                Listed on {result.dateListed} | Available on{" "}
                {result.availableDate}
              </p>
              <p>Currently leasing for ${result.rent} per month</p>
              <p>{result.additionalInfo}</p>
              <button onClick={() => indicateInterestInLease(result)}>
                Indicate Interest
              </button>

              <hr></hr>
            </div>
          );
        })
      );
  }

  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <div>{searchResult && <Map searchResult={searchResult} />}</div>
      <div>{searchBar}</div>
      <div>{searchResult && displayResult}</div>
    </>
  );
};

export default SearchLease;
