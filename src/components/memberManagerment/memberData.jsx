import React from "react";
import { Tabs } from "antd";
import MemberFileData from "./components/memberFileData";
import MemberStatusData from "./components/memberStatusData";
import UserFileCenter from "../systemManagerment/components/userFileCenter";
import UserStatusCenter from "../systemManagerment/components/userStatusCenter";
import ContentToolbar from "../base/contentToolbar";
const { TabPane } = Tabs;
class MemberFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberFileDetail: null,
      memberStatusDetail: null
    };
  }

  setMemberFileDetail = memberFileDetail => {
    this.setState({ memberFileDetail });
  };

  setMemberStatusDetail = memberStatusDetail => {
    this.setState({ memberStatusDetail });
  };

  removeDetail = () => {
    this.setState({
      memberFileDetail: null,
      memberStatusDetail: null
    })
  }

  render() {
    const { memberFileDetail, memberStatusDetail } = this.state;
    return (
      <div className="memberFileContainer">
        <ContentToolbar showBackBtn={!!memberFileDetail || !!memberStatusDetail} backClick={this.removeDetail}/>
        {!memberFileDetail && !memberStatusDetail && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="档案管理" key="1">
              <MemberFileData setMemberFileDetail={this.setMemberFileDetail}/>
            </TabPane>
            <TabPane tab="学籍管理" key="2">
              <MemberStatusData setMemberStatusDetail={this.setMemberStatusDetail}/>
            </TabPane>
          </Tabs>
        )}
        {memberFileDetail && <UserFileCenter/>}
        {memberStatusDetail && <UserStatusCenter/>}
      </div>
    );
  }
}

export default MemberFile;
