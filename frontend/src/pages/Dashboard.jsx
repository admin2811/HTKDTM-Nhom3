import '../components/dashboard/home.css'
import Sidebar from '../components/dashboard/common/sidebar/Sidebar'
import Navbar from '../components/dashboard/common/navbar/Navabar'
import { Outlet } from "react-router-dom"
const Dashboard = () => {
  return (
    <div className="home">
        <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard