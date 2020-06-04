import React from "react";
import { Descriptions, Button, Spin } from "antd";
import E from "wangeditor";
import { connect } from "react-redux";
import { setTopic } from "../redux/reducer";
import DataLoading from "../../base/dataLodaing"
import { studentsThesisTopic, studentThesisReport } from "../utils/mock";
class ThesisTaskBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.initEditor();
    if (!this.props.stuThesisTopic) {
      this.props.setTopic(studentsThesisTopic[0]);
    }
  }
  initEditor() {
    const elem = document.getElementById("TaskBookEditor");
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
    if (this.props.userConfig.role == 0) {
      editor.txt.html(studentThesisReport);
      editor.$textElem.attr("contenteditable", false);
    }
  }
  render() {
    return (
      <div className="TaskBookContainer">
        {this.props.stuThesisTopic ? (
          <div className="TaskBookTitle">
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
            <p>任务与要求</p>
          </div>
        ) : (
         <DataLoading/>
        )}

        <div className="TaskBookContent" id="TaskBookEditor"></div>
        {this.props.userConfig.role == 1 && (
          <div className="TaskBookFoot">
            <Button type="primary">保存</Button>
            <Button type="primary">退出</Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    stuThesisTopic: store.member.stuThesisTopic,
    userConfig: store.login.userConfig,
  }),
  {
    setTopic,
  }
)(ThesisTaskBook);
