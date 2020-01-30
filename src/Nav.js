import React from 'react';
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className='nav'>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/test">test</Link>
    </div>
  );
}

export default Nav;
