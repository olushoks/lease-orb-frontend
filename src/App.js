import { useState } from "react";
import axios from "axios";
import "./App.css";
import LogIn from "./components/log-in/LogIn";
import HomePage from "./components/HomePage";
// import Map from "./components/map/Map";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

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

  // LOG OUT
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {isLoggedIn || <LogIn auth={authenticateUser} error={error} />}
      {isLoggedIn && (
        <HomePage
          user={user}
          submitLease={submitLease}
          logOut={logOut}
          deleteLeaseFromDataBase={deleteLeaseFromDataBase}
          indicateInterest={indicateInterest}
          withdrawInterest={withdrawInterest}
        />
      )}
    </>
  );
};

export default App;
