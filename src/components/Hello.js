import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Hello = () => {
  return <Link to="/login">Hi! Login.</Link>;
};

export default Hello;
