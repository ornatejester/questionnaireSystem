import React from "react";
import { Icon, Button ,Divider} from "antd";

export default function InforDetail(props) {
  const { title, description ,time} = props.inforObj;
  return (
    <div className="InforDetailContainer">
      <div className="InforDetailTitle"><Icon type="form" />{title}</div>
      <div className="InforDetailTime"><Icon type="dashboard" />{time}</div>
      <Divider />
      <div className="InforDetailContent">{description}</div>
    </div>
  );
}
