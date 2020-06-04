import React from "react";
// import Footer from "../base/Footer";
import { Descriptions,Button,Spin } from "antd";
// import {userStatusInfor} from "../utils/mock";
import html2pdf from 'html2pdf.js';
import {connect} from "react-redux";
import {getUserStatusInfor} from "../redux/reducer";
class UserStatusCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.props.getUserStatusInfor("2016110401");
  }
  exportPdf = () => {
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
      const element = document.getElementById('pdfStatusDom');
      // 导出配置
      const opt = {
        margin: 1,
        filename: '学生学籍信息',
        image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
        html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      if (element) {
        html2pdf().set(opt).from(element).save(); // 导出
      }
    }
  render() {
    const {userStatusInfor} = this.props
    return (
      <div>
        {
          userStatusInfor?
          <div id="pdfStatusDom">
          <Descriptions title="学生学籍信息" bordered>
          <Descriptions.Item label="学生姓名" span={3}>{userStatusInfor.name}</Descriptions.Item>
          <Descriptions.Item label="历年平均成绩" span={2}>{userStatusInfor.averageGrade}</Descriptions.Item>
          <Descriptions.Item label="历年平均绩点" span={2}>{userStatusInfor.averageTarget}</Descriptions.Item>
          <Descriptions.Item label="最低学分要求" span={3}>170</Descriptions.Item>
          <Descriptions.Item label="专业课学分" span={2}>{userStatusInfor.majorCredit}</Descriptions.Item>
          <Descriptions.Item label="选修课学分" span={2}>{userStatusInfor.minorCredit}</Descriptions.Item>
          <Descriptions.Item label="通识教育专业课学分" span={2}>{userStatusInfor.generalMajorCredit}</Descriptions.Item>
          <Descriptions.Item label="通识教育选修课学分" span={2}>{userStatusInfor.generalMinorCredit}</Descriptions.Item>
          <Descriptions.Item label="社会实践学分"span={3}>{userStatusInfor.practiceCredit}</Descriptions.Item>
        </Descriptions>
        </div>:
        <div style={{width:"100%",height:400,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Spin size="large" />
        </div>
        }
        
        <Button onClick={this.exportPdf} style={{marginTop:10}}>导出pdf文件</Button>
      </div>
    );
  }
}

export default connect(store => ({
  userStatusInfor:store.system.userStatusInfor
}),{
  getUserStatusInfor
})(UserStatusCenter);
