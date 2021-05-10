import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import LogIn from "./components/log-in/LogIn";
import HomePage from "./components/HomePage";
import DisplayReviews from "./components/reviews/DisplayReviews";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);

  // LOGIN <---> SIGN UP
  const authenticateUser = async (action, userCredentials) => {
    const route =
      action === "login"
        ? "http://localhost:5000/api/auth/sign-in"
        : "http://localhost:5000/api/users/sign-up";

    await axios
      .post(route, userCredentials)
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data);
          setError(null);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setError(err.response.data);
        setTimeout(clearError, 3000);
      });
  };

  // FETCH REVIEWS WHEN COMPONENT MOUNTS
  useEffect(() => {
    // FETCH REVIEWS
    const fetchReviews = async () => {
      axios.get("http://localhost:5000/api/reviews").then(({ data }) => {
        setReviews(data);
      });
    };

    fetchReviews();
  }, []);

  // ADD REVIEW
  const addReview = async (review) => {
    await axios
      .post(
        `http://localhost:5000/api/reviews/add_review/${user.username}`,
        review
      )
      .then((res) => setReviews(res.data));
  };

  //SILENT REFRESH EVERY 5 SECONDS
  // const refreshUserData = async () => {
  //   // await axios
  //   //   .get(`http://localhost:5000/api/users/${user.username}`)
  //   //   .then(({ data }) => {
  //   //     console.log(`Silent Refresh`);
  //   //     setUser(data);
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   console.log(`Refresh`);
  //   setTimeout(refreshUserData(), 10000);
  // };

  // //refreshUserData();

  // CLEAR ERROR
  const clearError = () => {
    setError(null);
  };

  // SUBMIT LEASE
  const submitLease = async (lease) => {
    await axios
      .post(
        `http://localhost:5000/api/users/${user.username}/list-lease`,
        lease
      )
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // INDICATE INTEREST IN LEASE
  const indicateInterest = (updatedUser) => {
    setUser(updatedUser);
  };

  // WITHDRAW INTEREST IN LEASE
  const withdrawInterest = (updatedUser) => {
    setUser(updatedUser);
  };

  // DELETE LISTED LEASE
  const deleteLeaseFromDataBase = async () => {
    await axios
      .delete(
        `http://localhost:5000/api/users/${user.username}/delist-lease/${user.listedLease[0]._id}`
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  // REPLY TO A MESSAGE
  const replyMessage = async (id, recipient, text) => {
    await axios
      .post(
        `http://localhost:5000/api/users/${user.username}/reply-message/${id}/${recipient}`,
        { text }
      )
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  // LOG OUT
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="app-main">
      {/* {isLoggedIn || <h3 className="logo-text">lease-orb</h3>} */}
      {isLoggedIn || <LogIn auth={authenticateUser} error={error} />}
      {isLoggedIn || <DisplayReviews reviews={reviews} />}
      {isLoggedIn && (
        <HomePage
          user={user}
          submitLease={submitLease}
          logOut={logOut}
          deleteLeaseFromDataBase={deleteLeaseFromDataBase}
          indicateInterest={indicateInterest}
          withdrawInterest={withdrawInterest}
          replyMessage={replyMessage}
          addReview={addReview}
          reviews={reviews}
        />
      )}
    </div>
  );
};

export default App;
