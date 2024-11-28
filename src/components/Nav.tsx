import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Nav: React.FC = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className='nav'>
      <ul>
        <li className='nav-item'>
          <Link to="/" className='nav-link'>
          Candidate Search
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/saved" className='nav-link'>
          Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
