import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import authStore from "./stores/authStore";
import { observer } from "mobx-react";

// Logo
import logo from "./assets/theindex.svg";

class Sidebar extends Component {
  options = () => {
    if (authStore.user) {
      return <button onClick={authStore.Logout}>Logou</button>;
    } else {
      return (
        <div>
          <Link to="/Signup/">
            <button>Signup</button>
          </Link>
          <Link to="/Login/">
            <button>Login</button>
          </Link>
        </div>
      );
    }
  };
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
          {this.options()}
        </section>
      </div>
    );
  }
}

export default observer(Sidebar);
