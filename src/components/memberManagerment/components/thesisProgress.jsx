import React from "react";
import {studentsThesisTopic} from "../utils/mock";
import {Table,Button} from "antd";
import ThesisProgressDetail from "./thesisProgressDetail";
class ThesisDetail extends React.Component {
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
            }}>查看周进展</Button>,
          },
    ]
    return (
      this.state.studentChoice ?
      <ThesisProgressDetail student={this.state.studentChoice}/>:
      <div className="reportContent">
          <Table columns={columns} dataSource={studentsThesisTopic}/>
      </div>
    );
  }
}

export default ThesisDetail;
