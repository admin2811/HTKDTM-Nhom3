import './App.css'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Dashboard from './pages/Dashboard'
import Home from './components/dashboard/Home/Home'
import CourseCard from './components/dashboard/Home/CourseCard'
import Community from './components/dashboard/Community/Community'
import Profile from './components/dashboard/Profile/Profile'
import Road from './components/dashboard/Road/Road'

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <div>Trang không tìm thấy</div> 
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <div>Trang không tìm thấy</div> 
    },
    {
      path: '/register',
      element: <Register />,
      errorElement: <div>Trang không tìm thấy</div> 
    },
    {
      path:'/dashboard',
      element: <Dashboard />,
      errorElement: <div>Trang không tìm thấy</div>,
      children:[
        {index: true, element: <Home />},
        {path: "road", element: <Road />},
        {path:"community", element: <Community/>},
        {path:"profile", element: <Profile/>},
      ]
    }
  ])

  
  return (
    <ErrorBoundary>
        <main className=" bg-white text-dark">
          <RouterProvider router={router} />
        </main>
    </ErrorBoundary>
  )
}

export default App
