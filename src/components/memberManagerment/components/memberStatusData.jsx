import React from "react";
import { Select, Button, Icon,Table } from "antd";
// import {studentsFileMock} from  "../utils/mock";
import ExportJsonExcel from "js-export-excel";
import {connect} from "react-redux";
import {getStudentsStatus} from "../redux/reducer";
class MemberStatusData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gradeChoice: "",
    };
  }

  handleSelectGrade = gradeChoice => {
    this.setState({ gradeChoice});
  };

  handleSelectClass = classChoice => {
    this.setState({ classChoice });
  };

  handleSift = () => {
    this.props.getStudentsStatus(this.props.userConfig.id,this.state.gradeChoice);
  }

  exportData = () => {
    var option = {};
    const {gradeChoice} = this.state;
    option.fileName = `${gradeChoice}级档案信息`;
    option.datas = [
      {
        sheetData: this.props.studentsStatus,
        sheetName: "sheet",
        sheetFilter: ["name","averageGrade","averageTarget","majorCredit",
                        "minorCreditdouble","practiceCredit",
                          "generalMajorCredit","generalMinorCredit"],
        sheetHeader: ["姓名","平均成绩","平均绩点","专业课学分","选修课学分","实践学分",
                        "通识教育专业课学分","通识教育选修课学分"],
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
          width: 140,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '平均成绩',
          width: 140,
          dataIndex: 'averageGrade',
          key: 'averageGrade',
        },
        {
            title: '平均绩点',
            width: 140,
            dataIndex: 'averageTarget',
            key: 'averageTarget',
          },
          {
            title: '专业课学分',
            width: 140,
            dataIndex: 'majorCredit',
            key: 'majorCredit',
          },
          {
            title: '选修课学分',
            width: 140,
            dataIndex: 'minorCredit',
            key: 'minorCredit',
          },
          {
            title: '实践学分',
            width:140,
            dataIndex: 'practiceCredit',
            key: 'practiceCredit',
          },
          {
            title: '通识教育专业课学分',
            width:170,
            dataIndex: 'generalMajorCredit',
            key: 'generalMajorCredit'
          },
          {
            title: '通识教育选修课学分',
            width:170,
            dataIndex: 'generalMinorCredit',
            key: 'generalMinorCredit'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: () => <Button onClick={()=>{this.props.setMemberStatusDetail({})}}>查看详情</Button>,
          },
    ]
    return (
      <div className="MemberStatusData">
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
            <Table columns={columns} loading={this.props.isGetingData} dataSource={this.props.studentsStatus}/>
        </div>
        {this.props.studentsStatus.length!=0 && <Button onClick={this.exportData} type="primary">导出excel</Button>}
      </div>
    );
  }
}

export default connect(
  store => ({
    studentsStatus:store.member.studentsStatus,
    isGetingData:store.member.isGetingData,
    userConfig:store.login.userConfig
  }),{
    getStudentsStatus
  }
)(MemberStatusData);
