import Navbar from "./common/navbar/Navabar";
import Sidebar from "./common/sidebar/Sidebar";
import "./home.css"


const Home = () => {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
        <Navbar />
        <h1>Home</h1>
    </div>
    </div>
  );
};

export default Home;