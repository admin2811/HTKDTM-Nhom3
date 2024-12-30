/* eslint-disable react/prop-types */
import Brands from '../components/landing/Brand'
import Hero from '../components/landing/Hero'
import Overview from '../components/landing/Overview'
import Feature1 from '../components/landing/Feature1'
import Feature2 from '../components/landing/Feature2'
import Feature3 from '../components/landing/Feature3'
import Product from '../components/landing/Product'
import Pricing from '../components/landing/Pricing'
import Testimonials from '../components/landing/Testimonials'
import Cta from '../components/landing/Cta'
import Header from '../components/landing/Header'
import Footer from '../components/landing/Footer'
import { useLocation } from 'react-router-dom'
const Layout = ({ children }) => {
    const location = useLocation();
  
    // Chỉ hiển thị Header và Footer ở landing page (`/`)
    const showHeaderFooter = location.pathname === '/';
  
    return (
      <>
        {showHeaderFooter && <Header />}
        {children}
        {showHeaderFooter && <Footer />}
      </>
    );
  };
const LandingPage = () => {
  return (
    <Layout>
        <div>
            <Hero />
            <Overview />
            <Brands />
            <Feature1 />
            <Feature2 />
            <Feature3 />
            <Product />
            <Pricing />
            <Testimonials />
            <Cta />
        </div>
    </Layout>
    
  )
}

export default LandingPage