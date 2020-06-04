import React from "react";
import { studentThesisProgress, studentsThesisTopic } from "../utils/mock";
import { Descriptions, Button, Spin } from "antd";
import E from "wangeditor";
import { connect } from "react-redux";
import { setProgress, setTopic } from "../redux/reducer";
import DataLoading from "../../base/dataLodaing"
class ThesisProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (!this.props.stuThesisProgress) {
      this.props.setProgress(studentThesisProgress);
      this.props.setTopic(studentsThesisTopic[0]);
    }
    if(this.props.userConfig.role == 0){
      this.initEditor();
    }
  }
  initEditor() {
    const elem = document.getElementById("editorContent");
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
  }
  render() {
    return (
      <div className="ThesisProgressContainer">
        {this.props.stuThesisTopic ? (
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
        ) : (
          <DataLoading/>
        )}
        {this.props.stuThesisTopic ? (
          <div className="progressDone">
            <Descriptions title="已填写周进展" bordered>
              {studentThesisProgress.map((item, index) => (
                <Descriptions.Item key={index} label={item.time} span={3}>
                  {item.progress}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>
        ) : (
          <DataLoading/>
        )}
        <div className="editorContainer" id="editorContent"></div>
        {this.props.userConfig.role == 0 && 
          <Button type="primary">
            提交本周进展
          </Button>}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    stuThesisProgress: store.member.stuThesisProgress,
    stuThesisTopic: store.member.stuThesisTopic,
    userConfig:store.login.userConfig
  }),
  {
    setProgress,
    setTopic,
  }
)(ThesisProgress);
