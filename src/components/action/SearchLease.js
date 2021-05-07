import Map from "../map/Map";
import { useState } from "react";
import axios from "axios";

import transformString from "../../helper/stringTransformer";

const SearchLease = ({ closeForm, user, indicateInterest }) => {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchCriteria) {
      await axios
        .get(
          `http://localhost:5000/api/users/${
            user.username
          }/search-lease/${transformString(searchCriteria)}`
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
    await axios
      .post(
        `http://localhost:5000/api/users/${user.username}/show-interest/${lease._id}`,
        null
      )
      .then((res) => {
        indicateInterest(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.error1) {
          setError(err.response.data.error1);
          setTimeout(clearError, 3000);
          console.log(err.response.data.error1);
        }
        if (err.response.data.error2) {
          setError(err.response.data.error2);
          setTimeout(clearError, 3000);
          console.log(err.response.data.error2);
        }
        console.log(err.response.data);
      });
  };

  const clearError = () => {
    setError(null);
  };

  const searchBar = (
    <>
      <input
        type="search"
        placeholder="search by city or zip"
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
      <p>{error}</p>
      <div>{searchResult && displayResult}</div>
    </>
  );
};

export default SearchLease;
