import "./Header.css";

const Header = () => {
  const handleClick = () => {
    alert("Cliicked");
  };
  return (
    <>
      <header className="header">Lease-Orb</header>
      <nav className="nav-section">
        <ul className="nav-items">
          <li onClick={handleClick}>
            Listed Lease<i className="far fa-building"></i>
          </li>
          <li onClick={handleClick}>
            Interested In<i className="fas fa-luggage-cart"></i>
          </li>
          <li onClick={handleClick}>
            Messages<i className="fas fa-envelope-open-text"></i>
          </li>
          <li onClick={handleClick}>
            LogOut<i className="fas fa-sign-out-alt"></i>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
