import React from "react";
import { Icon, Button, Tooltip } from "antd";
import { withRouter } from "react-router-dom";
function ContentToolbar(props) {
  const { showBackBtn = false, backClick = () => {}, history ,location} = props;

  return (
    <div className="inforDetailNav">
      {showBackBtn && (
        <div className="backBtn">
          <Button type="link" onClick={backClick}>
            <Icon type="left" />
            返回
          </Button>
        </div>
      )}
      <div className="flexBlank" />
      <div className="systemBtnGroup">
        <Tooltip title="返回">
          <Icon onClick={()=>{history.push(location.pathname)}} type="arrow-left" />
        </Tooltip>
        <Tooltip title="首页">
          <Icon onClick={()=>{window.location.href = "home/systemIndex"}} type="home" />
        </Tooltip>
        <Tooltip title="刷新">
          <Icon onClick={()=>{window.location.href = location.pathname}} type="redo" />
        </Tooltip>
      </div>
    </div>
  );
}

export default withRouter(ContentToolbar);
