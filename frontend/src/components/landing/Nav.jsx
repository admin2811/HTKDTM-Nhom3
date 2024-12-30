import React from 'react';
import { nav } from './data';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-x-10">
        {nav.map((item, index) => {
          const { href, name } = item;
          return (
            <li key={index}>
              <Link 
                to={href} 
                className="hover:text-accent transition">
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
