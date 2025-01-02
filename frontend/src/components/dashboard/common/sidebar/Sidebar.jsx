import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Nhóm 3</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Course</span>
          </li>
          </Link>
          <Link to="/dashboard/road" style={{ textDecoration: "none" }}>
            <li>
              <EditRoadOutlinedIcon className="icon" />
              <span>Road</span>
            </li>
          </Link>
          <Link to="/post" style={{ textDecoration: "none" }}>
            <li>
              <FeedOutlinedIcon className="icon" />
              <span>Community</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
            <li>
              <ForumIcon className="icon" />
              <span>Chat bot</span>
            </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
      </div>
    </div>
  );
};

export default Sidebar;