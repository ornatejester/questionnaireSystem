import React from "react";
import { connect } from "react-redux";
import { signOutUser } from "../login/redux/reducer";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import Content from './components/content';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
      <div className="HomeContainer">
          <NavBar />
          <SideBar />
          <Content/>
      </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.login.isAuthenticated
  }),
  {
    signOutUser
  }
)(Home);
