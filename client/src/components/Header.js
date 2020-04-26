import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";

class Header extends Component {
  renderLog() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          // <Link to="/auth/google" className="right hide-on-med-and-down">
          //   Login With Google
          // </Link>
          <a href="/auth/google" className="right hide-on-med-and-down">
            Login With Google
          </a>
        );
      default:
        return (
          // <Link to="/api/logout" className="right ">
          //   Logout
          // </Link>
          [
            <li key="1">
              <Payments />
            </li>,
            <li key="2" style={{ margin: "0 10px" }}>
              Credits:{this.props.auth.credits}
            </li>,
            <li key="3">
              <a href="/api/logout" className="right ">
                Logout
              </a>
            </li>,
          ]
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="" className="left brand-logo">
            Emaily
          </Link>

          <ul className="right">
            <li>{this.renderLog()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToPrpos = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToPrpos)(Header);
