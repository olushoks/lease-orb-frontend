import Map from "../map/Map";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import getDate from "../../helper/getDateFromDateTime";
import "./SearchLease.css";
import transformString from "../../helper/stringTransformer";

const SearchLease = ({ closeForm, user, indicateInterest }) => {
  const searchBox = useRef("");
  const [searchResult, setSearchResult] = useState(null);
  const responeRef = useRef(null);

  useEffect(() => {
    searchBox.current.focus();
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchBox) {
      await axios
        .get(
          `http://localhost:5000/api/users/${
            user.username
          }/search-lease/${transformString(searchBox.current.value)}`
        )
        .then(({ data }) => {
          setSearchResult(data);
        })
        .catch((err) => console.log(err));
      searchBox.current.focus();
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
        responeRef.current.innerText = `Interest indicated. Message has been sent to the leaseholder`;
        responeRef.current.className = "success";
        setTimeout(clearError, 3000);
      })
      .catch((err) => {
        if (err.response.data.error1) {
          responeRef.current.innerText = err.response.data.error1;
          responeRef.current.className = "error";
          setTimeout(clearError, 3000);
        }
        if (err.response.data.error2) {
          responeRef.current.innerText = err.response.data.error2;
          responeRef.current.className = "error";
          setTimeout(clearError, 3000);
        }
        console.log(err.response);
      });
  };

  const clearError = () => {
    responeRef.current.innerText = null;
  };

  const searchField = (
    <>
      <input
        type="search"
        placeholder="search by city or zip"
        ref={searchBox}
        className="input-field"
      ></input>
      <button className="search-btn" type="submit" onClick={handleSearch}>
        <i className="fas fa-search-location"></i>
      </button>
    </>
  );

  let displayResult;

  if (searchResult) {
    displayResult =
      searchResult.length === 0 ? (
        <div className="lease-result">
          No results found. Please refine your search
        </div>
      ) : (
        searchResult.map((result) => {
          return (
            <div className="lease-result">
              <p>
                {result.name} posted by {result.postedBy}
              </p>
              <p>{result.address}</p>
              <p>
                {`Listed on ${getDate(result.dateListed)}`} |
                {` Available on ${getDate(result.availableDate)}`}
              </p>
              <p>Currently leasing for ${result.rent} per month</p>
              <p>Additional info: {result.additionalInfo}</p>
              <button
                className="indicate-interest-btn"
                onClick={() => indicateInterestInLease(result)}
              >
                Indicate Interest
              </button>
              <hr></hr>
            </div>
          );
        })
      );
  }

  return (
    <div className="search-result-section">
      <span onClick={closeForm} className="close">
        <i className="fas fa-window-close"></i>
      </span>

      <div>
        {searchResult && searchResult.length > 0 && (
          <Map searchResult={searchResult} />
        )}
      </div>
      <p ref={responeRef}></p>
      <div>{searchField}</div>
      <div>{searchResult && displayResult}</div>
    </div>
  );
};

export default SearchLease;
