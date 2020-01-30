import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Test() {
  return (
    <div className='test'>
      <div>
        test
      </div>
      <Link to="/dashboard">GO</Link>
    </div>
  );
}

export default Test;
