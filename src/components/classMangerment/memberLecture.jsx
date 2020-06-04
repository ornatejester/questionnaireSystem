import React from "react";
import Toolbar from "../base/contentToolbar";
import { Descriptions, Table, Button ,Select} from "antd";
// import { studentsLectureData } from "./utils/mock";
import LectureDetail from "./components/letureDetail";
import {connect} from "react-redux";
import {getStudentsLecture} from "./redux/reducer";
class MajorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lectureDetail: null
    };
  }
  // componentDidMount(){
  //   this.props.getStudentsLecture(this.props.userConfig,"2016");
  // }
  handleSelectGrade = gradeChoice => {
    this.props.getStudentsLecture(this.props.userConfig.id,gradeChoice);
  };

  setLectureDetail = lectureDetail => {
    this.setState({ lectureDetail });
  };

  render() {
    const gradeGroup = ["2016", "2017", "2018","2019","2020"];
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "专业",
        dataIndex: "major",
        key: "major"
      },
      {
        title: "要求课时",
        dataIndex: "total",
        key: "total"
      },
      {
        title: "完成类型",
        dataIndex: "form",
        key: "form"
      },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => (
          <Button
            onClick={() => {
              this.setLectureDetail(record);
            }}
          >
            查看详情
          </Button>
        )
      }
    ];
    return (
      <>
        <Toolbar clickBack={()=>{this.setLectureDetail(null);}}/>
        <div className="lectureContainer">
          <div className="divider">技术沙龙</div>
          {this.state.lectureDetail ? <LectureDetail {...this.state.lectureDetail}/> : 
          <>
          <Select placeholder="请选择年级" style={{width:130}} onChange={this.handleSelectGrade}>
            {gradeGroup.map(grade => (
              <Select.Option key={grade} value={grade}>
                {grade}
              </Select.Option>
            ))}
          </Select>
          <Table columns={columns} loading={this.props.isClassGetingData} dataSource={this.props.studentsLectureData} />
          </>
          }
        </div>
      </>
    );
  }
}

export default connect(store => ({
  studentsLectureData:store.sclass.studentsLectureData,
  isClassGetingData:store.sclass.isClassGetingData,
  userConfig:store.login.userConfig
}),{
  getStudentsLecture
})(MajorClass);