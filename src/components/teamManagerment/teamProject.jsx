import React from "react";
import Toolbar from "../base/contentToolbar";
import { Descriptions, Card, Button, Tag, Icon } from "antd";
// import { teamProjectGroup } from "./utils/mock";
import TeamProjectDetail from "./components/teamProjectDetail";
import { connect } from "react-redux";
import { setTeamProjectGroup } from "./redux/reducer";
import DataLoading from "../base/dataLodaing";
import AddProjectModal from "./components/addProjectModal";
class TeamProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: null,
      modalVisible:false
    };
  }

  setProjectDetail = (projectDetail) => {
    this.setState({ projectDetail });
  };

  componentDidMount() {
    this.props.setTeamProjectGroup(this.props.userConfig.id);
  }

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
    const colorGroup = ["red", "volcano", "orange", "gold", "lime", "green"];
    return (
      <>
        <Toolbar backClick={()=>{this.setState({projectDetail:null})}}/>
        <AddProjectModal {...modalProps}/>
        {this.state.projectDetail ? (
          <TeamProjectDetail project={this.state.projectDetail} />
        ) : this.props.teamProjectGroup ? (
          <div className="teamProjectContainer">
            <Descriptions title="团队信息" bordered>
              <Descriptions.Item label="学院" span={3}>
                计算机科学学院
              </Descriptions.Item>
              <Descriptions.Item label="老师" span={3}>
                {this.props.userConfig.name}
              </Descriptions.Item>
              <Descriptions.Item label="开发方向" span={3}>
                Web应用
              </Descriptions.Item>
            </Descriptions>
            <div className="projectListTitle">项目信息</div>
            <div style={{padding:10}}>
              <Button onClick={modalProps.showModal}>添加项目说明</Button>
            </div>
            {this.props.teamProjectGroup.map((teamProject, i) => (
              <Card
                key={i}
                title={
                  <span className="cardTitle">
                    <Icon type="appstore" />
                    {teamProject.pname}
                  </span>
                }
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setProjectDetail(teamProject);
                    }}
                  >
                    查看详情
                  </Button>
                }
              >
                <p>研发团队:&nbsp;&nbsp;{teamProject.grade}级</p>
                <p>
                  标签:&nbsp;&nbsp;
                  {teamProject.technology.split("/").map((tec, index) => (
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
              </Card>
            ))}
          </div>
        ) : (
          <DataLoading />
        )}
      </>
    );
  }
}

export default connect(
  (store) => ({
    userConfig: store.login.userConfig,
    teamProjectGroup: store.team.teamProjectGroup,
  }),
  {
    setTeamProjectGroup,
  }
)(TeamProject);
