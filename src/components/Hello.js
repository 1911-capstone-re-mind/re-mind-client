import React from "react";
import { Link } from "react-router-dom";

class Hello extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="center">
          <p>Your workplace wellness tracker.</p>
          <div>
            <Link to="/login">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Hello;
