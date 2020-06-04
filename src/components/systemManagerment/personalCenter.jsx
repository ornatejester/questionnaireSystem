import React from "react";
// import Footer from "../base/Footer";
import {Tabs} from "antd";
import UserStatusCenter from "./components/userStatusCenter";
import UserFileCenter from "./components/userFileCenter";
import Toolbar from "../base/contentToolbar";
const { TabPane } = Tabs;
class PersonalCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="personalCenterContainer">
        <Toolbar/>
         <Tabs defaultActiveKey="1">
          <TabPane tab="学籍管理" key="1">
            <UserStatusCenter/>
          </TabPane>
          <TabPane tab="档案管理" key="2">
            <UserFileCenter/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PersonalCenter;
