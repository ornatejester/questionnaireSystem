import React from "react";
// import Footer from "../base/Footer";
import { Carousel, Tabs, Card, Button } from "antd";
import InforCard from "./components/inforCard";
import InforDetail from "./components/inforDetail";
import Toolbar from "../base/contentToolbar";
import { newsGroups } from "./utils/mock";
class SystemIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inforObj: null
    };
  }

  chooseInforKey = inforObj => {
    this.setState({ inforObj });
  };

  render() {
    return (
      <>
        <Toolbar showBackBtn = {!!this.state.inforObj} backClick={()=>{this.chooseInforKey(null)}}/>
        {this.state.inforObj ? (
          <InforDetail
            chooseInforKey={this.chooseInforKey}
            inforObj={this.state.inforObj}
          />
        ) : (
          <div className="systemIndexContainer">
            {newsGroups.map(inforGroup => (
              <InforCard
                chooseInforKey={this.chooseInforKey}
                inforGroup={inforGroup}
                key={inforGroup.category}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default SystemIndex;
