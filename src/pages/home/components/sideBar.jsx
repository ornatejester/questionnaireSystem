import React from "react";
import { Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setSiderbarStatus } from "../redux/reducer";
import { FormattedMessage } from "react-intl";
const { SubMenu } = Menu;

class SideBar extends React.Component {
  handleClick = (e) => {
    this.props.history.push(e.key);
  };
  render() {
    const { isSiderbarOpen, setSiderbarStatus, menuList } = this.props;
    return (
      <div
        className="SideBarContainer"
        style={!isSiderbarOpen ? { width: 160 } : {}}
      >
        <Menu
          onClick={this.handleClick}
          style={!isSiderbarOpen ? { width: "100.5%" } : {}}
          inlineCollapsed={isSiderbarOpen}
          defaultSelectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={["menu1", "menu2", "menu3", "menu4"]}
          mode="inline"
        >
          {menuList.map((item) => (
            <SubMenu
              key={item.subMenuName}
              title={
                <span>
                  <Icon type="ordered-list" />
                  <span>
                    <FormattedMessage id={item.subMenuName} />
                  </span>
                </span>
              }
            >
              {item.list.map((menu) => (
                <Menu.Item key={menu.route}>
                  <Icon type={menu.icon} theme="twoTone" />
                  <FormattedMessage id={menu.name} />
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
        <div className="setSiderbarStatus" onClick={setSiderbarStatus}>
          {!isSiderbarOpen ? (
            <Icon type="arrow-left" />
          ) : (
            <Icon type="arrow-right" />
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(
    (store) => ({
      isSiderbarOpen: store.home.isSiderbarOpen,
      menuList: store.login.menuList,
    }),
    { setSiderbarStatus }
  )(SideBar)
);
