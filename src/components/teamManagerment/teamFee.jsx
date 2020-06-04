import React from "react";
import Toolbar from "../base/contentToolbar";
import TeamFeeDetail from "./components/teamFeeDetail";
// import { teamFeeGroup } from "./utils/mock";
import { Card, Icon, Button } from "antd";
import { connect } from "react-redux";
import { setTeamFeeGroup } from "./redux/reducer";
import DataLodaing from "../base/dataLodaing";
import AddFeeModal from "./components/addFeeModal";
class TeamFee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      feeDetail: null,
    };
  }
  //页面加载完成时执行的操作
  componentDidMount() {
    this.props.setTeamFeeGroup(this.props.userConfig.id);
  }
  setFeeDetail = (feeDetail) => {
    this.setState({ feeDetail });
  };
  render() {
    const modalProps = {
      visible: this.state.modalVisible,
      showModal: () => {
        this.setState({
          modalVisible: true,
        });
      },
      handleCancel: (e) => {
        this.setState({
          modalVisible: false,
        });
      },
    };
    const { feeDetail } = this.state;
    return (
      <>
        <Toolbar backClick={()=>{this.setState({feeDetail: null})}}/>
        <AddFeeModal {...modalProps} />
        {feeDetail ? (
          <TeamFeeDetail feeDetail={feeDetail} />
        ) : this.props.teamFeeGroup ? (
          <div className="teamFeeContainer">
            <div className="teamFeeTitle">团队经费明示</div>
            <div style={{padding:10}}>
              <Button onClick={modalProps.showModal}>添加经费说明</Button>
            </div>
            <div className="cardGroup">
              {this.props.teamFeeGroup.map((teamFee, index) => (
                <Card
                  key={index}
                  title={
                    <span className="cardTitle">
                      <Icon type="appstore" />
                      {teamFee.fname}
                    </span>
                  }
                  extra={
                    <Button
                      type="primary"
                      onClick={() => {
                        this.setFeeDetail(teamFee);
                      }}
                    >
                      查看详情
                    </Button>
                  }
                >
                  <p>
                    <Icon type="account-book" />
                    金额:&nbsp;&nbsp;{teamFee.fee}
                  </p>
                  <p>
                    <Icon type="dashboard" />
                    年级:&nbsp;&nbsp;{teamFee.grade}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <DataLodaing />
        )}
      </>
    );
  }
}

export default connect(
  (store) => ({
    teamFeeGroup: store.team.teamFeeGroup,
    userConfig: store.login.userConfig,
  }),
  {
    setTeamFeeGroup,
  }
)(TeamFee);
