import React from "react";
import { connect } from "react-redux";
import { setStuProjectGroup } from "./redux/reducer";
import { Descriptions, Card, Tag, Icon } from "antd";
import DataLoading from "../base/dataLodaing";
import Toolbar from "../base/contentToolbar";
class MemberFee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.setStuProjectGroup(this.props.userConfig.id);
  }
  render() {
    const colorGroup = ["red", "volcano", "orange", "gold", "lime", "green"];
    return (
      <>
        <Toolbar />
        <div className="memberFeeContainer">
          <div className="memberFeeTitle">学生参与项目信息</div>
          <div className="memberFeeContent">
            <Descriptions title="用户信息" bordered>
              <Descriptions.Item label="姓名" span={3}>
                {this.props.userConfig.name}
              </Descriptions.Item>
              <Descriptions.Item label="角色" span={2}>
                {this.props.userConfig.role}
              </Descriptions.Item>
            </Descriptions>
            {this.props.stuProjectGroup ? (
              <div className="projectCardGroup">
                {this.props.stuProjectGroup.map((item, i) => (
                  <Card
                    key={i}
                    title={
                      <span className="cardTitle">
                        <Icon type="appstore" />
                        {item.p_name}
                      </span>
                    }
                  >
                    <p>
                      标签:&nbsp;&nbsp;
                      {item.technology.split("/").map((tec, index) => (
                        <Tag
                          key={index}
                          color={
                            colorGroup[(Math.random().toFixed(2) * 100) % 6]
                          }
                        >
                          {tec}
                        </Tag>
                      ))}
                    </p>
                    <p>{item.description}</p>
                  </Card>
                ))}
              </div>
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
    stuProjectGroup: store.team.stuProjectGroup,
  }),
  { setStuProjectGroup }
)(MemberFee);
