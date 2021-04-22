import "./Main.css";
import Map from "../map/Map";

const Main = ({ user }) => {
  return (
    <div className="main">
      <p>Welcome {user.username}, what would you like to do today?</p>
      <button className="btn">List A Lease</button>
      <button className="btn">Search Available Leases</button>
      <Map />
    </div>
  );
};

export default Main;
