import "./Main.css";

const Main = ({ user }) => {
  return (
    <div className="main">
      <p>Welcome {user.username}, what would you like to do today?</p>
      <button className="btn">List A Lease</button>
      <button className="btn">Search Available Leases</button>
    </div>
  );
};

export default Main;
