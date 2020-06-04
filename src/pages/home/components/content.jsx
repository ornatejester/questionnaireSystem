import React from "react";
import { Route} from "react-router-dom";
import {connect} from "react-redux";
class Content extends React.Component {
  render() {
    let createRoutes = [];
    this.props.menuList.map(item => {
      createRoutes=[...createRoutes,...item.list];
    });
    return (
        <div className="ContentContainer" 
            style={!this.props.isSiderbarOpen?
              {marginLeft: 170}:
              {marginLeft: 90}}>
          <div className="Content">
            {/* 动态生成二级路由 */}
            {createRoutes.map(route => 
              <Route path={route.route} key={route.route} component={route.component} />
            )}
          </div>
        </div>
    );
  }
}
export default connect(store=>({
  isSiderbarOpen:store.home.isSiderbarOpen,
  menuList:store.login.menuList
}),{})(Content);
