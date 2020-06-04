import React from "react";
import { Select, Button, Icon,Table } from "antd";
// import {studentsFileMock} from  "../utils/mock";
import ExportJsonExcel from "js-export-excel";
import {connect} from "react-redux";
import {getStudentsFile} from "../redux/reducer";
class MemberFileData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gradeChoice: "",
    };
  }

  handleSelectGrade = gradeChoice => {
    this.setState({ gradeChoice});
  };

  handleSift = () => {
    this.props.getStudentsFile(this.props.userConfig.id,this.state.gradeChoice);
  }

  exportData = () => {
    var option = {};
    const {gradeChoice} = this.state;
    option.fileName = `${gradeChoice}级档案信息`;
    option.datas = [
      {
        sheetData: this.props.studentsFile,
        sheetName: "sheet",
        sheetFilter: ["name","sex","birthday","nation","major","political",
                        "nativePlace","email","phoneNumber","school"],
        sheetHeader: ["姓名","性别","出生日期","民族","专业","政治面貌",
                        "籍贯","邮箱","电话","毕业高中"],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  };

  render() {
    const gradeGroup = ["2016", "2017", "2018","2019","2020"];
    const columns = [
        {
          title: '姓名',
          width: 150,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '出生日期',
          width: 240,
          dataIndex: 'birthday',
          key: 'birthday',
          render: (record) => record.substr(0,10),
        },
        {
            title: '民族',
            width: 150,
            dataIndex: 'nation',
            key: 'nation',
          },
          {
            title: '专业',
            width: 150,
            dataIndex: 'major',
            key: 'major',
          },
          {
            title: '政治面貌',
            width: 150,
            dataIndex: 'political',
            key: 'political',
          },
          {
            title: '出生地',
            dataIndex: 'nativePlace',
            key: 'nativePlace',
          },
          {
            title: '操作',
            key: 'operation',
            width: 200,
            render: () => <Button onClick={()=>{this.props.setMemberFileDetail({})}}>查看详情</Button>,
          },
    ]
    return (
      
      <div className="MemberFileData">
        <div className="selectsBox">
          <Select placeholder="请选择年级" onChange={this.handleSelectGrade}>
            {gradeGroup.map(grade => (
              <Select.Option key={grade} value={grade}>
                {grade}
              </Select.Option>
            ))}
          </Select>
          {this.state.gradeChoice && <>
              <Button type="primary" onClick={this.handleSift}>筛选</Button> 
          </>}
        </div>
        <div className="tableBox">
            <Table columns={columns} loading={this.props.isGetingData} dataSource={this.props.studentsFile}/>
        </div>
        {this.props.studentsFile.length!=0 && <Button onClick={this.exportData} type="primary">导出excel</Button>}
      </div>
    );
  }
}

export default connect(
  store => ({
    studentsFile:store.member.studentsFile,
    isGetingData:store.member.isGetingData,
    userConfig:store.login.userConfig
  }),{
    getStudentsFile
  }
)(MemberFileData);
