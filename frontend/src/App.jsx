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
import Home from './components/dashboard/Home'
import Course from './components/dashboard/Course'
import PrivateRoute from './components/PrivateRoute'
import PasswordResetRequest from './pages/ForgotPassword'

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
      path: '/forgot_password',
      element: <PasswordResetRequest />,
      errorElement: <div>Trang không tìm thấy</div>
    },
    {
      path:'/dashboard',
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      errorElement: <div>Trang không tìm thấy</div>,
      children:[
        {index: true, element: <Home />},
        {path: "road", element: <Course />}
        // {path:"/course", element: <Course/>}
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
