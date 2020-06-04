import React from "react";
import { Descriptions, Button, Spin, message } from "antd";
import E from "wangeditor";
import { connect } from "react-redux";
import { setReport, setTopic } from "../redux/reducer";
import { studentThesisReport, studentsThesisTopic } from "../utils/mock";
import DataLoading from "../../base/dataLodaing"
class ThesisReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (!this.props.stuThesisTopic) {
      this.props.setReport(studentThesisReport);
      this.props.setTopic(studentsThesisTopic[0]);
    }
    this.initEditor();
  }
  initEditor() {
    const elem = document.getElementById("ReportEditor");
    const editor = new E(elem);

    this.editor = editor;

    editor.customConfig.zIndex = 100;
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "italic", // 斜体
      "underline", // 下划线
      "foreColor", // 文字颜色
      "list", // 列表
      "justify", // 对齐方式
      "undo", // 撤销
      "redo", // 重复
    ];
    editor.customConfig.lang = {
      设置标题: "Title",
      字号: "Size",
      文字颜色: "Color",
      设置列表: "List",
      有序列表: "",
      无序列表: "",
      对齐方式: "Align",
      靠左: "",
      居中: "",
      靠右: "",
      正文: "p",
      链接文字: "link text",
      链接: "link",
      上传图片: "Upload",
      网络图片: "Web",
      图片link: "image url",
      插入视频: "Video",
      格式如: "format",
      上传: "Upload",
      创建: "init",
    };
    editor.create();
    if (this.props.userConfig.role == 1) {
      editor.txt.html(studentThesisReport);
      editor.$textElem.attr("contenteditable", false);
    }
  }

  checkoutReport = () => {
    message.info("审核成功");
  }

  render() {
    return (
      <div className="TaskBookContainer">
        <div className="TaskBookTitle">
          {this.props.stuThesisTopic ? (
            <>
              <Descriptions title="学生选题信息" bordered>
                <Descriptions.Item label="学生姓名" span={3}>
                  {this.props.stuThesisTopic.name}
                </Descriptions.Item>
                <Descriptions.Item label="选题" span={3}>
                  {this.props.stuThesisTopic.thesisTitle}
                </Descriptions.Item>
                <Descriptions.Item label="完成形式" span={3}>
                  {this.props.stuThesisTopic.thesisType}
                </Descriptions.Item>
              </Descriptions>
              <p>--建议使用IE浏览器,若IE浏览器访问出现异常，请启用IE浏览器的兼容性视图，启用兼容性说明</p>
              <p>学生开题报告</p>
            </>
          ) : (
            <DataLoading/>
          )}
        </div>
        <div className="TaskBookContent" id="ReportEditor"></div>
        {this.props.userConfig.role == 1 ? (
          <div className="TaskBookFoot">
            <Button type="primary" onClick={this.checkoutReport}>通过</Button>
            <Button type="primary" onClick={this.checkoutReport}>不通过</Button>
            <Button type="primary">退出</Button>
          </div>
        ) : (
          <div className="TaskBookFoot">
            <Button type="primary">提交</Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    stuThesisReport: store.member.stuThesisReport,
    stuThesisTopic: store.member.stuThesisTopic,
    userConfig: store.login.userConfig,
  }),
  {
    setReport,
    setTopic,
  }
)(ThesisReportDetail);
