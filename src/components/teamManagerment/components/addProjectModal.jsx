import React, { useState } from "react";
import { Modal, Button, Select, Input, Form,message } from "antd";
import { setTeamProjectGroup } from "../redux/reducer";
import {connect} from "react-redux";
import {uuid} from "../utils/utils";
import axios from "axios";
import config from "../../../config/index";
import {withRouter} from "react-router-dom";
function AddProjectModal(props) {
  const gradeGroup = ["2016", "2017", "2018", "2019", "2020"];
  const techGroup = [
    "html",
    "css",
    "js",
    "react",
    "vue",
    "java",
    "python",
    "php",
    "c",
    "c++",
  ];
  const [gradeArr, setGradeArr] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDes, setProjectDes] = useState("");
  const [techArr, setTechArr] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(!err){
      axios({
        method:"post",
        url:`${config.apiUrl}/teamproject/addTeamproject`,
        params:{
          tid:props.userConfig.id,
          grade:values.grade.join("/"),
          pname:values.name,
          description:values.description,
          technology:values.technology.join("/"),
          pid:uuid()
        }
      })
      .then((res) => {
        if (res) {
          message.info("添加成功");
          props.handleCancel();
        } else {
          message.error("系统错误！");
        }
      })
      .catch((err) => {
        message.error("系统错误！");
        console.log(err);
      });
    }
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <div>
      <Modal
        title="添加项目"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
        width={500}
        wrapClassName="addProjectModal"
      >
        <div className="inforContainer">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item label={"请选择年级"}>
              {getFieldDecorator("grade", {
                rules: [{ required: true, message: "请选择年级" }],
              })(
                <Select
                  mode="multiple"
                  onChange={(value) => {
                    setGradeArr(value);
                  }}
                >
                  {gradeGroup.map((each, index) => (
                    <Select.Option key={each} value={each}>
                      {each}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={"请选择技术栈"}>
              {getFieldDecorator("technology", {
                rules: [{ required: true, message: "请选择技术栈" }],
                validateTrigger: "onBlur",
              })(
                <Select
                  mode="multiple"
                  onChange={(value) => {
                    setTechArr(value);
                  }}
                >
                  {techGroup.map((each, index) => (
                    <Select.Option key={each} value={each}>
                      {each}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={"请输入项目名"}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入项目名" }],
                validateTrigger: "onBlur",
              })(
                <Input
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <Form.Item label={"请输入项目描述"}>
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "请输入项目描述" }],
                validateTrigger: "onBlur",
              })(
                <Input.TextArea
                  rows={3}
                  onChange={(e) => {
                    setProjectDes(e.target.value);
                  }}
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <div className="BtnGroup">
              <Button onClick={props.handleCancel}>取消</Button>
              <Button htmlType="submit">确定</Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

const AddForm = Form.create({ name: "FormInfor" })(AddProjectModal);
export default withRouter(connect(store => ({
  userConfig: store.login.userConfig,
}),{
  setTeamProjectGroup
})(AddForm));
