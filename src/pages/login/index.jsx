import React from "react";
import { Form, Icon, Input, Spin, Button } from "antd";
import { connect } from "react-redux";
import { loginUser } from "./redux/reducer";
import Footer from "../../components/base/Footer";
import VCode from "./components/vCode";
import PSresetModal from "./components/psResetModal";
import teamFee from "../../components/teamManagerment/teamFee";
class NormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (values.vCode.toLowerCase() == this.props.vCodeMsg.toLowerCase()) {
        this.props.loginUser(values.userName, values.password, values.vCode);
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
    const { isLoading } = this.props;
    const modalProps = {
      visible:this.state.modalVisible,
      showModal:()=>{
        this.setState({modalVisible:true});
      },
      handleCancel:()=>{
        this.setState({modalVisible:false});
      },
      handleOK:()=>{
        this.setState({modalVisible:false});
      }
    }
    return (
      <>
      {this.state.modalVisible && <PSresetModal {...modalProps}/>}
        <div className="TestLoginContainer">
          <div className="ContainerTop">
            <div className="ContainerTopTitle">
              <div className="title">
                <p>四川师范大学研究生管理系统</p>
                <p>Graduate Management Information System</p>
              </div>
              <div className="FlexBlank" />
            </div>
          </div>
          <div className="LoginContainer">
            <div className="LoginForm">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("userName", {
                    rules: [{ required: true, message: "请输入用户名" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="用户名"
                      autoComplete="off"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "请输入密码" }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="密码"
                      autoComplete="off"
                    />
                  )}
                </Form.Item>
                <div className="vCodeContent">
                  <VCode />
                  <Form.Item>
                    {getFieldDecorator("vCode", {
                      rules: [
                        { required: true, message: "请输入验证码" },
                        {
                          validator: this.vCodeValidFunction
                        }
                      ],
                      validateTrigger: "onSubmit"
                    })(<Input placeholder="请输入验证码" autoComplete="off"/>)}
                  </Form.Item>
                </div>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {isLoading === true ? (
                      <span>
                        <Spin />
                        正在登录...
                      </span>
                    ) : (
                      <span>登录</span>
                    )}
                  </Button>
                </Form.Item>
              </Form>
              <span className="changePsSpan" onClick={modalProps.showModal}>忘记密码？</span>
            </div>
            <div className="LoginRule">
              <div className="LoginRuleContent">
                <p>注意事项</p>
                <p>教师登录用户名为工号</p>
                <p>学生登录用户名为学号，初始密码为身份证后6位</p>
                <p>若有疑问，请联系管理员QQ:1454030137</p>
                <div className="NavList">
                  <a href="http://yjsc.sicnu.edu.cn/">研究生院</a>
                  <a href="http://www.sicnu.edu.cn/">学校官网</a>
                  <a href="http://xb.sicnu.edu.cn/p/31/">官方邮箱</a>
                  <span>帮助</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(NormLogin);

export default connect(
  state => ({
    isLoading: state.login.isLoading,
    isAuthenticated: state.login.isAuthenticated,
    error: state.login.error,
    vCodeMsg: state.login.vCodeMsg
  }),
  { loginUser }
)(Login);
