import { useState } from "react";
import "./Header.css";
import ListedLease from "../nav/ListedLease";
import InterestedIn from "../nav/InterestedIn";
import Messages from "../nav/Messages";

const Header = ({
  user,
  logOut,
  deleteLeaseFromDataBase,
  withdrawInterest,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentNav, setCurrentNav] = useState(null);

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
        setCurrentNav(<Messages user={user} closeNav={closeNav} />);
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
            Listed Lease<i className="far fa-building"></i>
          </li>
          <li onClick={() => handleClick("interestedIn")}>
            Interested In<i className="fas fa-luggage-cart"></i>
          </li>
          <li onClick={() => handleClick("messages")}>
            Messages<i className="fas fa-envelope-open-text"></i>
          </li>
          <li onClick={() => handleClick("logOut")}>
            LogOut<i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </nav>
      {isNavOpen && currentNav}
    </>
  );
};

export default Header;
