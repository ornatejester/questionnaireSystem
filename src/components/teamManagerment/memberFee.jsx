import React from "react";
import { connect } from "react-redux";
import { setStuFeeGroup } from "./redux/reducer";
import { Descriptions } from "antd";
import DataLoading from "../base/dataLodaing";
import Toolbar from "../base/contentToolbar";
class MemberFee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setStuFeeGroup(this.props.userConfig.id);
  }
  render() {
    return (
      <>
      <Toolbar/>
      <div className="memberFeeContainer">
        <div className="memberFeeTitle">学生参与经费信息</div>
        <div className="memberFeeContent">
          <Descriptions title="用户信息" bordered>
            <Descriptions.Item label="姓名" span={3}>
              {this.props.userConfig.name}
            </Descriptions.Item>
            <Descriptions.Item label="角色" span={2}>
              {this.props.userConfig.role}
            </Descriptions.Item>
          </Descriptions>
          {this.props.stuFeeGroup ? (
            <Descriptions title="经费详情" bordered>
              {this.props.stuFeeGroup.map((stuFee, index) => (
                <Descriptions.Item label={stuFee.fname} key={index} span={3}>
                  {stuFee.feedepart}
                </Descriptions.Item>
              ))}
            </Descriptions>
          ) : (
            <DataLoading />
          )}
        </div>
      </div>
      </>
    );
  }
}
export default connect(
  (store) => ({
    userConfig: store.login.userConfig,
    stuFeeGroup: store.team.stuFeeGroup,
  }),
  { setStuFeeGroup }
)(MemberFee);
