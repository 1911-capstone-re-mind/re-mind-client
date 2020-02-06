import React from "react";
import { Link } from "react-router-dom";

class Hello extends React.Component {
  render() {
    return <Link to="/login">Hi! Login.</Link>;
  }
}

export default Hello;
