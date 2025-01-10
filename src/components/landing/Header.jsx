import React, { useState, useEffect } from 'react';
// Import data
import { header } from './data';
// Import icons
import { HiMenuAlt4, HiOutlineX } from 'react-icons/hi';
// Import components
import MobileNav from './MobileNav';
import Nav from './Nav';
//import Logo from '../../assets/img/header/logo';  // Import logo component

const Header = () => {
  // Mobile nav state
  const [mobileNav, setMobileNav] = useState(false);
  // Header state
  const [isActive, setIsActive] = useState(false);
  // Destructure header data
  const { btnText } = header;

  // Scroll event
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? 'lg:top-0 bg-white shadow-2xl' : 'lg:top-[60px]'
      } py-6 lg:py-4 fixed w-full transition-all z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Replace img with Logo component */}
        <a href="#" data-aos="fade-down" data-aos-delay="1000">
          {/* <Logo /> */}
        </a>
        {/* Nav - initially hidden, show on desktop mode */}
        <div className="hidden lg:flex" data-aos="fade-down" data-aos-delay="1200">
          <Nav />
        </div>
        {/* Button - initially hidden, show */}
        <button className="btn btn-sm btn-outline hidden lg:flex" data-aos="fade-down" data-aos-delay="1400">
          {btnText}
        </button>
        {/* Button - Nav trigger btn - hidden on desktop, show on mobile */}
        <button className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-accent" />
          ) : (
            <HiMenuAlt4 className="text-3xl text-accent" />
          )}
        </button>
        <div
          className={`${
            mobileNav ? 'left-0' : '-left-full'
          } fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
