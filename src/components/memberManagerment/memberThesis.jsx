import React from "react";
import Toolbar from "../base/contentToolbar";
import TabTitle from "../base/tabTitle";
import ThesisTopic from "./components/thesisTopic";
import ThesisReport from "./components/thesisReport";
import ThesisProgress from "./components/thesisProgress";
import { Tabs,Icon } from "antd";
const { TabPane } = Tabs;
class Dissertation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="thesisContainer">
        <Toolbar />
        <p style={{lineHeight:"30px"}}>注：任务书在2月30日之前可修改，3月1日后不可修改</p>
        <Tabs defaultActiveKey="1">
            <TabPane tab={<TabTitle><Icon type="book" />课题和任务书</TabTitle>} key="1">
              <ThesisTopic/>
            </TabPane>
            <TabPane tab={<TabTitle><Icon type="book" />开题报告</TabTitle>} key="2">
              <ThesisReport/>
            </TabPane>
            <TabPane tab={<TabTitle><Icon type="book" />周进展</TabTitle>} key="3">
              <ThesisProgress/>
            </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dissertation;
