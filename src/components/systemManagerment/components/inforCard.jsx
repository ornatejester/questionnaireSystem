import React from "react";
import { Card, Button, Icon } from "antd";

const InforCardTitle = props => {
  return (
    <span className="InforCardTitle">
      <Icon type="file-search" />
      {props.children}
    </span>
  );
};

export default function InforCard(props) {
  return (
    <div className="cardContainer">
      <Card
        title={<InforCardTitle>{props.inforGroup.category}</InforCardTitle>}
        extra={<a href="#"><Icon type="search" />&nbsp;查看更多</a>}
      >
        {props.inforGroup.inforList.map(infor => (
          <div key={infor.key} className="introBox">
            <span className="introContent">
              {infor.title}
              <Button type="link" onClick={()=>{props.chooseInforKey(infor)}}>查看详情</Button>
            </span>
            <span className="introTime"><Icon type="dashboard"/>&nbsp;{infor.time}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
