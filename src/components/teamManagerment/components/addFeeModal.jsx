import React, { useState } from "react";
import { Modal, Button, Select, Input, Form, message } from "antd";
import { setTeamFeeGroup } from "../redux/reducer";
import { connect } from "react-redux";
import { uuid } from "../utils/utils";
import axios from "axios";
import config from "../../../config/index";
function AddProjectModal(props) {
  const gradeGroup = ["2016", "2017", "2018", "2019", "2020"];
  const typeGroup = ["竞赛奖金", "学校补贴", "研究经费", "外包收入"];
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if(!err){
        axios({
          method: "post",
          url: `${config.apiUrl}/fee/addFee`,
          params: {
            ...values,
            tid: props.userConfig.id,
            fid: uuid(),
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
                <Select>
                  {gradeGroup.map((each, index) => (
                    <Select.Option key={each} value={each}>
                      {each}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={"请选择类型"}>
              {getFieldDecorator("ftype", {
                rules: [{ required: true, message: "请选择类型" }],
                validateTrigger: "onBlur",
              })(
                <Select>
                  {typeGroup.map((each, index) => (
                    <Select.Option key={each} value={each}>
                      {each}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={"请输入费用名称"}>
              {getFieldDecorator("fname", {
                rules: [{ required: true, message: "请输入费用名称" }],
                validateTrigger: "onBlur",
              })(<Input autoComplete="off"/>)}
            </Form.Item>
            <Form.Item label={"请输入费用金额"}>
              {getFieldDecorator("fee", {
                rules: [{ required: true, message: "请输入费用金额" }],
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

const AddForm = Form.create({ name: "FormInfor" })(AddProjectModal);
export default connect(
  (store) => ({
    userConfig: store.login.userConfig,
  }),
  {
    setTeamFeeGroup,
  }
)(AddForm);
