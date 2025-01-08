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
import Home from './components/dashboard/home/Home'
import Course from './components/dashboard/Course'
import PrivateRoute from './components/PrivateRoute'
// import PasswordResetRequest from './pages/ForgotPassword'
import LessonHtmlcss from './components/dashboard/course/Lesson'
import Quiz from './components/dashboard/quizz/Quizz'
import FrontendDetails from './components/dashboard/popularRoute/FrontendDetails'
import BackendDetails from './components/dashboard/popularRoute/BackendDetails'
import RoutePerson from './components/dashboard/routePerson/RoutePerson'
import AICreateRoute from './components/dashboard/routePerson/routerAI/AICreateRoute'
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
      path: '/routePersonal',
      element: <RoutePerson />,
      errorElement: <div>Trang không tìm thấy</div>,
    },    
    {
      path: '/routePersonal/AICreateRoute/:id',
      element: <AICreateRoute />,
      errorElement: <div>Trang không tìm thấy</div>,
    },
    // {
    //   path: '/forgot_password',
    //   element: <PasswordResetRequest />,
    //   errorElement: <div>Trang không tìm thấy</div>
    // },
    {
      path:'/dashboard',
      element: <PrivateRoute><Dashboard /></PrivateRoute>,
      errorElement: <div>Trang không tìm thấy</div>,
      children:[
        {index: true, element: <Home />},
        {path: "road", element: <Course />},
        {path: "course/:id", element: <LessonHtmlcss />},
        {path: "quizz/:id", element: <Quiz />},
        {path: "road/frontend-details", element: <FrontendDetails />},
        {path: "road/backend-details", element: <BackendDetails />},
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
