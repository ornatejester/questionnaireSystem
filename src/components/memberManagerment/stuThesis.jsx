import React from "react";
import Toolbar from "../base/contentToolbar";
import TabTitle from "../base/tabTitle";
import { Tabs,Icon } from "antd";
import ThesisProgressDetail from "./components/thesisProgressDetail";
import ThesisReportDetail from "./components/thesisReportDetail";
import ThesisTaskBook from "./components/thesisTopicTask";
const { TabPane } = Tabs;
class StuDissertation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="thesisContainer">
        <Toolbar />
        <p style={{lineHeight:"30px"}}>注：任务书在2月28日之前可修改，3月1日后不可修改</p>
        <Tabs defaultActiveKey="1">
            <TabPane tab={<TabTitle><Icon type="book" />课题和任务书</TabTitle>} key="1">
              <ThesisTaskBook/>
            </TabPane>
            <TabPane tab={<TabTitle><Icon type="book" />开题报告</TabTitle>} key="2">
              <ThesisReportDetail/>
            </TabPane>
            <TabPane tab={<TabTitle><Icon type="book" />周进展</TabTitle>} key="3">
              <ThesisProgressDetail/>
            </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default StuDissertation;
