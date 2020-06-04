import React from "react";
import {studentsThesisTopic} from "../utils/mock";
import {Table,Button} from "antd";
import ThesisReportDetail from "./thesisReportDetail";
class ThesisReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentChoice:null,
    };
  }

  chooseStudent = student => {
      this.setState({studentChoice:student});
  }

  render() {
    const columns = [
        {
          title: '姓名',
          width: 260,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '论文题目',
          width:350,
          dataIndex: 'thesisTitle',
          key: 'thesisTitle',
        },
        {
            title: '完成形式',
            dataIndex: 'thesisType',
            key: 'thesisType',
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render:  (text, record) => 
              <Button onClick={()=>{this.chooseStudent(record)
            }}>审核开题报告</Button>,
          },
    ]
    return (
      this.state.studentChoice ?
      <ThesisReportDetail student={this.state.studentChoice}/>:
      <div className="reportContent">
          <Table columns={columns} dataSource={studentsThesisTopic}/>
      </div>
    );
  }
}

export default ThesisReport;
