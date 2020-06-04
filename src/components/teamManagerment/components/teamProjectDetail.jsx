import React from "react";
import { Timeline, Descriptions, Icon, Tag ,Button} from "antd";
import { connect } from "react-redux";
import { setProjectDivision } from "../redux/reducer";
import DataLodaing from "../../base/dataLodaing";
import AddDivisionModal from "./addDivisionModal";
class TeamProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
    };
  }
  componentDidMount() {
    this.props.setProjectDivision(this.props.project.pid);
  }
  render() {
    const { pname, grade, technology, description } = this.props.project;
    const colorGroup = ["red", "volcano", "orange", "gold", "lime", "green"];
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
    return (
      <div className="teamProjectDetailContent">
        <div className="contentHeader">
          <div className="projectTitle">
            <Descriptions title="项目详情:" bordered>
              <Descriptions.Item label="项目名称" span={3}>
                {pname}
              </Descriptions.Item>
              <Descriptions.Item label="年级" span={2}>
                {grade}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="timeLine">
            <Timeline>
              <Timeline.Item>可行性研究 2019-10-12</Timeline.Item>
              <Timeline.Item>需求分析 2019-11-11</Timeline.Item>
              <Timeline.Item>原型设计 2019-12-11</Timeline.Item>
              <Timeline.Item>编码 2020-1-1</Timeline.Item>
              <Timeline.Item>整合 2020-2-1</Timeline.Item>
              <Timeline.Item>测试 2020-3-1</Timeline.Item>
            </Timeline>
          </div>
          <div className="tagGroup">
            <p>技术栈：</p>
            {technology.split("/").map((tec, index) => (
              <Tag
                key={index}
                color={colorGroup[(Math.random().toFixed(2) * 100) % 6]}
              >
                {tec}
              </Tag>
            ))}
          </div>
          <div className="description">
            <p>项目介绍:</p>
            <div className="descriptionContent">{description}</div>
          </div>
          <AddDivisionModal {...modalProps} pid={this.props.project.pid}/>
          <Button onClick={modalProps.showModal} style={{margin:6}}>添加人员分工</Button>
          {this.props.projectDivision ? (
            <div className="distribution" key={Math.random()}>
              <Descriptions title="分工:" bordered>
                {this.props.projectDivision.map((item, i) => (
                  <Descriptions.Item key={i} label={item.sname} span={3}>
                    {item.job}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          ) : (
            <DataLodaing />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (store) => ({
    projectDivision: store.team.projectDivision,
  }),
  {
    setProjectDivision,
  }
)(TeamProjectDetail);
