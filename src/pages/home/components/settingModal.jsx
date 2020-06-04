import React from "react";
import { Modal, Button, Select } from "antd";
import {connect} from "react-redux";
import {setLocalLanguage} from "../redux/reducer";
import {colorGroup,languageGroup} from "../utils/type";
class SettingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        colorChoice:"#276E51",
        languageChoice:"zh",
    };
  }
  handleColorChange = (value) => {
    this.setState({colorChoice:value});
  };
  handleLanguageChange = (value) => {
    this.setState({languageChoice:value});
  }
  handleConfirm = () => {
    document.getElementsByTagName('body')[0].style.setProperty('--color-theme',this.state.colorChoice);
    const language = languageGroup.filter(item => item.value == this.state.languageChoice)[0];
    this.props.setLocalLanguage(language);
    this.props.handleOK();
  }
  render() {
    return (
      <Modal
        title={<span>系统设置</span>}
        visible={this.props.visible}
        centered
        closable={false}
        footer={null}
        bodyStyle={{ padding: 0 }}
        wrapClassName="settingModal"
      >
        <div className="normalModalContainer">
          <div className="normalModalContent">
            <div className="settingItem">
              <p>切换主题</p>
              <div className="selectBox">
              <Select
                defaultValue="#276E51"
                style={{ width: 120 }}
                onChange={this.handleColorChange}
              >
                {colorGroup.map((color, index) => (
                  <Select.Option key={index} value={color.value}>
                    {color.label}
                  </Select.Option>
                ))}
              </Select>
              <div className="showColorBox" style={{backgroundColor:this.state.colorChoice}}/>
              </div>
            </div>
            <div className="settingItem">
              <p>切换语言</p>
              <div className="selectBox">
              <Select
                defaultValue="zh"
                style={{ width: 120 }}
                onChange={this.handleLanguageChange}
              >
                {languageGroup.map((language, index) => (
                  <Select.Option key={index} value={language.value}>
                    {language.label}
                  </Select.Option>
                ))}
              </Select>
              </div>
            </div>
          </div>
          <div className="normalBtnGroup">
            <Button onClick={this.props.handleCancel}>取消</Button>
            <Button onClick={this.handleConfirm}>确定</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(store => ({}),{setLocalLanguage})(SettingModal);
