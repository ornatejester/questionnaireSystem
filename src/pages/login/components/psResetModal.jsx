import React from "react";
import { Modal, Form, Icon, Input, Button, Checkbox, Spin } from "antd";
import VCode from "./vCode";
import {changePS} from "../redux/reducer";
import { connect } from "react-redux";

class PSResettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.vCode.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
        this.props.changePS(values.id,values.idNumber,values.password,this.props.handleOK);
      }
    });
  };
  vCodeValidFunction = (rule, value, callback) => {
    if (value.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
      callback();
    } else {
      callback("验证码错误");
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<span>修改密码</span>}
        visible={this.props.visible}
        footer={null}
        closable={false}
        width={540}
        wrapClassName="psResettingModal"
        centered
      >
        <div className="formInfoModalContainer">
          <div className="formContainer">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item
                label={
                  <span>
                    <Icon type="user" />
                    &nbsp;用户id
                  </span>
                }
              >
                {getFieldDecorator("id", {
                  rules: [{ required: true, message: "请输入用户id" }],
                  validateTrigger: "onBlur",
                })(<Input placeholder="请输入用户id" maxLength={20} autoComplete="off"/>)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <Icon type="solution" />
                    &nbsp;身份证号码
                  </span>
                }
              >
                {getFieldDecorator("idNumber", {
                  rules: [{ required: true, message: "请输入身份证号码" }],
                })(<Input placeholder="请输入身份证号码" autoComplete="off"/>)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <Icon type="lock" />
                    &nbsp;新密码
                  </span>
                }
              >
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "请输入新密码" }],
                })(<Input placeholder="请输入新密码" autoComplete="off"/>)}
              </Form.Item>
              <div className="vCodeContent">
                <VCode />
                <Form.Item>
                  {getFieldDecorator("vCode", {
                    rules: [
                      { required: true, message: "请输入验证码" },
                      {
                        validator: this.vCodeValidFunction,
                      },
                    ],
                    validateTrigger: "onSubmit",
                  })(<Input placeholder="请输入验证码" autoComplete="off"/>)}
                </Form.Item>
              </div>
              <Form.Item>
                <div className="buttonGroup">
                  <Button
                    onClick={this.props.handleCancel}
                    className="login-form-button-cancel"
                  >
                    取消
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button-create"
                    disabled={this.props.changePSLoading}
                  >
                    {this.props.changePSLoading ? (
                      <>
                        <Spin />
                        正在修改
                      </>
                    ) : (
                      "修改"
                    )}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}
const PSResetting = Form.create({ name: "PSResettingModal" })(PSResettingModal);

export default connect(
  (store) => ({
    vCodeMsg: store.login.vCodeMsg,
    changePSLoading: store.login.changePSLoading,
  }),
  {changePS}
)(PSResetting);
