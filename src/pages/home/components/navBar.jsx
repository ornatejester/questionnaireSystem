import React from "react";
import { Dropdown, Button, Menu, Divider, Icon } from "antd";
import { connect } from "react-redux";
import { signOutUser } from "../../login/redux/reducer";
import {FormattedMessage} from "react-intl";
import SettingModal from "./settingModal";
import ChangePsModal from "../../login/components/psResetModal";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingModalVisible:false,
      changePsModalVisible:false
    };
  }
  handleClick = e => {
    console.log("click ", e);
  };
  render() {
    const settingModalProps = {
      visible:this.state.settingModalVisible,
      showModal: e => {
        this.setState({settingModalVisible:true})
      },
      handleCancel: e => {
        this.setState({settingModalVisible:false})
      },
      handleOK: e => {
        this.setState({settingModalVisible:false})
      },
    }
    const changePsModalProps = {
      visible:this.state.changePsModalVisible,
      showModal: e => {
        this.setState({changePsModalVisible:true})
      },
      handleCancel: e => {
        this.setState({changePsModalVisible:false})
      },
      handleOK: e => {
        this.setState({changePsModalVisible:false})
      },
    }
    const menu = (
      <Menu>
        <Menu.Item>
        <Icon type="setting" />
          <Button
            type="link"
            onClick={settingModalProps.showModal}
          >
            <FormattedMessage id="systemSetting"/>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Icon type="solution" />
          <Button
            type="link"
            onClick={changePsModalProps.showModal}
          >
            <FormattedMessage id="changeps"/>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Icon type="poweroff" />
          <Button type="link" onClick={this.props.signOutUser}>
          <FormattedMessage id="logout"/>
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <>
      <SettingModal {...settingModalProps}/>
      {this.state.changePsModalVisible && < ChangePsModal {...changePsModalProps}/>}
      <div className="NavBarContainer">
        <div className="NavBar">
          <div className="NavBarLogo">
            <img alt="图片出错" src="/images/title.png" />
            <span><FormattedMessage id="projectTitle"/></span>
          </div>
          <div className="NavBarBlank" />
          <div className="NavBarUser">              
            <span><Icon type="user" /> &nbsp;&nbsp;<FormattedMessage id="user"/>:{this.props.userConfig.name}</span>
            <Divider type="vertical" />
            <Dropdown overlay={menu}>
              <Button type="link" className="ant-dropdown-link">
                <Icon type="setting" />
                <FormattedMessage id="setting"/>
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      </>
    );
  }
}
export default connect(
  state => ({
    isAuthenticated: state.login.isAuthenticated,
    userConfig:state.login.userConfig
  }),
  {
    signOutUser
  }
)(NavBar);
