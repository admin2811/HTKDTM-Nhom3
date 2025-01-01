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
import FrontendDetails from './components/popularRoute/FrontendDetails'
import BackendDetails from './components/popularRoute/BackendDetails'
import CourseHTML from './components/courses/CourseHTML'
import CourseJava from './components/courses/CourseJava'
import CourseFou from './components/courses/CourseFou'
import LessonHtmlcss from './components/lessons/LessonHtmlcss'
import LessonJava from './components/lessons/LessonJava'
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
        {path: "road", element: <Course />},
        {path: "course/courseHTML", element: <CourseHTML />},
        {path: "course/courseJava", element: <CourseJava />},
        {path: "course/CourseFou", element: <CourseFou />},
        {path: "course/courseHTML/lesson-htmlcss", element: <LessonHtmlcss />},
        {path: "course/courseJava/lesson-java", element: <LessonJava />},
        {path: "road/frontend-details", element: <FrontendDetails />},
        {path: "road/backend-details", element: <BackendDetails />}
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
