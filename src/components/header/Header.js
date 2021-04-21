import "./Header.css";
import ListedLease from "../nav/ListedLease";

const Header = ({ user }) => {
  const handleClick = (task) => {
    switch (task) {
      case "listedLease":
        <ListedLease user={user} />;
        alert(`Clicked ${task}`);
        break;
      default:
        break;
    }
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
      <ListedLease user={user} />
    </>
  );
};

export default Header;
