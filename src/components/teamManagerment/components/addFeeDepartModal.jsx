import React, { useState } from "react";
import { Modal, Button, Select, Input, Form, message } from "antd";
import { setTeamFeeGroup } from "../redux/reducer";
import { connect } from "react-redux";
import { setProjectDivision } from "../redux/reducer";
import { uuid } from "../utils/utils";
import axios from "axios";
import config from "../../../config/index";
function AddDivisionModal(props) {
  const handleSubmit = (e) => {
    const { fid, fname } = props;
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(!err){
      axios({
        method: "post",
        url: `${config.apiUrl}/depart/addFeeDepart`,
        params: {
          ...values,
          fid,
          fname,
        },
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
        title="添加学生分配详情"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
        width={500}
        wrapClassName="AddDivisionModal"
      >
        <div className="inforContainer">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item label={"请输入学生学号"}>
              {getFieldDecorator("sid", {
                rules: [{ required: true, message: "请输入学生学号" }],
                validateTrigger: "onBlur",
              })(<Input autoComplete="off"/>)}
            </Form.Item>
            <Form.Item label={"请输入学生分配金额"}>
              {getFieldDecorator("feedepart", {
                rules: [{ required: true, message: "请输入学生分配金额" }],
                validateTrigger: "onBlur",
              })(<Input autoComplete="off"/>)}
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

const AddForm = Form.create({ name: "FormInfor" })(AddDivisionModal);
export default connect(
  (store) => ({
    userConfig: store.login.userConfig,
  }),
  {
    setProjectDivision,
  }
)(AddForm);
