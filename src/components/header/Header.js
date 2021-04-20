import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        Lease-Orb
        {/* <p className="header-logo">Lease-Orb</p> */}
      </header>
      <nav className="nav-section">
        <ul className="nav-items">
          <li>Listed Lease</li>
          <li>Interested In</li>
          <li>Messages</li>
          <li>LogOut</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
