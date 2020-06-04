import React from "react";
// import Footer from "../base/Footer";
import { Descriptions, Button,Spin } from "antd";
// import {userFileInfor} from "../utils/mock";
import html2pdf from 'html2pdf.js';
import {connect} from "react-redux";
import {getUserFileInfor} from "../redux/reducer";
class UserFileCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.props.getUserFileInfor("2016110401");
  }
  exportPdf = () => {
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
      const element = document.getElementById('pdfFileDom');
      // 导出配置
      const opt = {
        margin: 1,
        filename: '学生档案信息',
        image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
        html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      if (element) {
        html2pdf().set(opt).from(element).save(); // 导出
      }
    }
  render() {
    const {userFileInfor} = this.props;
    return (
      <>
        {
          userFileInfor?
          <div id="pdfFileDom">
          <Descriptions title="学生档案信息" bordered>
          <Descriptions.Item label="学生姓名" span={3}>{userFileInfor.name}</Descriptions.Item>
          <Descriptions.Item label="性别" span={2}>{userFileInfor.sex}</Descriptions.Item>
          <Descriptions.Item label="出生日期" span={2}>{userFileInfor.birthday.substr(0,10)}</Descriptions.Item>
          <Descriptions.Item label="民族" span={2}>{userFileInfor.nation}</Descriptions.Item>
          <Descriptions.Item label="政治面貌" span={2}>{userFileInfor.political}</Descriptions.Item>
          <Descriptions.Item label="出身地" span={3}>{userFileInfor.nativePlace}</Descriptions.Item>
          <Descriptions.Item label="邮箱" span={3}>{userFileInfor.email}</Descriptions.Item>
          <Descriptions.Item label="电话" span={3}>{userFileInfor.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="毕业学校"span={3}>{userFileInfor.school}</Descriptions.Item>
        </Descriptions>
        </div>
        :
        <div style={{width:"100%",height:400,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Spin size="large" />
        </div>
        }
        
        <p style={{lineHeight:'25px'}}>注:信息变更请联系辅导员</p>
        <Button onClick={this.exportPdf}>导出pdf文件</Button>
      </>
    );
  }
}

export default connect(
  store => ({
    userFileInfor:store.system.userFileInfor
  }),{
    getUserFileInfor
  }
)(UserFileCenter);
