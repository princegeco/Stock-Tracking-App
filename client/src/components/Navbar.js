import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return ( 
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top sticky-top"> {/* navbar-dark makes text light */}
      <div className='container'>
        <Link className="navbar-brand hover" to="/">Home</Link>
        <Link className="navbar-brand hover" to="/about">About</Link>
        <Link className="navbar-brand hover" to="/more">More</Link>
      </div>
    </nav>
  );
};

export default Navbar;