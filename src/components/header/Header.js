import { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import ListedLease from "../nav/ListedLease";
import InterestedIn from "../nav/InterestedIn";
import Messages from "../nav/Messages";

const Header = ({
  user,
  logOut,
  deleteLeaseFromDataBase,
  withdrawInterest,
  replyMessage,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState(null);
  const [messageDetails, setMessageDetails] = useState({ ...user });

  useEffect(() => {
    const refreshMessages = async () => {
      await axios
        .get(`http://localhost:5000/api/users/${user.username}/messages`)
        .then(({ data }) => {
          setMessageDetails({ ...user, data });
        })
        .catch((err) => console.log(err.response));
    };

    let refreshInterval = setInterval(() => {
      refreshMessages();
    }, 3000);

    return () => clearInterval(refreshInterval);
  });

  const handleClick = (task) => {
    switch (task) {
      case "listedLease":
        setCurrentNav(
          <ListedLease
            user={user}
            closeNav={closeNav}
            deleteLeaseFromDataBase={deleteLeaseFromDataBase}
          />
        );
        setIsNavOpen(true);
        break;
      case "interestedIn":
        setCurrentNav(
          <InterestedIn
            user={user}
            closeNav={closeNav}
            withdrawInterest={withdrawInterest}
          />
        );
        setIsNavOpen(true);
        break;
      case "messages":
        setCurrentNav(
          <Messages
            user={messageDetails}
            // userMessages={user.messages}
            closeNav={closeNav}
            replyMessage={replyMessage}
          />
        );
        setIsNavOpen(true);
        break;
      case "logOut":
        logOut();
        setIsNavOpen(true);
        break;
      default:
        break;
    }
  };

  // CLOSE NAV BAR
  const closeNav = () => {
    setIsNavOpen(false);
    setCurrentNav(null);
  };

  return (
    <>
      <header className="header">Lease-Orb</header>
      <nav className="nav-section">
        <ul className="nav-items">
          <li onClick={() => handleClick("listedLease")}>
            <span className="nav-bar-text">Listed Lease</span>
            <i className="far fa-building"></i>
          </li>
          <li onClick={() => handleClick("interestedIn")}>
            <span className="nav-bar-text">Interested In</span>
            <i className="fas fa-luggage-cart"></i>
          </li>
          <li onClick={() => handleClick("messages")}>
            <span className="nav-bar-text">Messages</span>
            <i className="fas fa-envelope-open-text"></i>
          </li>
          <li onClick={() => handleClick("logOut")}>
            <span className="nav-bar-text">LogOut</span>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </nav>
      {isNavOpen && currentNav}
    </>
  );
};

export default Header;
