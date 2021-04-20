import "./Main.css";

const Main = ({ username }) => {
  return (
    <div className="main">
      <p>Welcome {username}, what would you like to do today?</p>
      <button className="btn">List A Lease</button>
      <button className="btn">Search Available Leases</button>
    </div>
  );
};

export default Main;
