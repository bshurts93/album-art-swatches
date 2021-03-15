import React from "react";
import { Link } from "react-router-dom";
const NotFoundView = () => {
  return (
    <React.Fragment>
      Page not found. Goto <Link to="/search">Home Page</Link>
    </React.Fragment>
  );
};
export default NotFoundView;
