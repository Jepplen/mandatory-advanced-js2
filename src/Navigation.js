import React from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
          <div className="headerLink"><Link className="link" to="/">Home</Link></div>
          <div className="headerLink"><Link className="link" to="/addpage">Add Movie</Link></div>
      </div>
    );
  }
}

export default Navigation;
