import React, { useEffect } from "react";
import { Descriptions, List, Icon, Progress, Spin, Input, Button,message } from "antd";
import { connect } from "react-redux";
import { getLectureDetail } from "../redux/reducer";
import DataLoading from "../../base/dataLodaing";
import config from "../../../config/index";
import axios from "axios";
import { useState } from "react";
const EvaluateBox = (props) => {
  const [msg,setMsg] = useState("");
  const handleClick = () => {
    axios({
      method:"post",
      url:`${config.apiUrl}/leture/evaluate`,
      params:{
        sid:props.id,
        title:props.item.title,
        evaluate:msg
      }
    })
    .then((res) => {
      if (res) {
        message.info("评价成功");
      } else {
        message.error("系统错误！");
      }
    })
    .catch((err) => {
      message.error("系统错误！");
      console.log(err);
    });
  }
  return (
    <>
      <Input value={msg} onChange={e=>setMsg(e.target.value)}/>
      <Button onClick={handleClick}>评价</Button>
    </>
  );
};
function LetureDetail(props) {
  const s_id = props.sid || props.userConfig.id;
  useEffect(() => {
    props.getLectureDetail(s_id);
  }, []);
  return props.studentLectureDetail ? (
    <div className="lectureContent">
      <Descriptions title="技术沙龙详情" bordered>
        <Descriptions.Item label="学生姓名" p={3}>
          {props.studentLectureDetail[0].name}
        </Descriptions.Item>
        <Descriptions.Item label="要求课时" p={3}>
          {props.studentLectureDetail[0].total}
        </Descriptions.Item>
        <Descriptions.Item label="已完成课时" p={3}>
          {props.studentLectureDetail.length}
        </Descriptions.Item>
        <Descriptions.Item label="专业" p={3}>
          {props.studentLectureDetail[0].major}
        </Descriptions.Item>
      </Descriptions>
      <div className="ProgressBox">
        <p>完成进度</p>
        <Progress
          percent={
            (props.studentLectureDetail.length /
              props.studentLectureDetail[0].total) *
            100
          }
          size="small"
        />
        <p>讲课详情</p>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={props.studentLectureDetail}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <p className="listTitle">
                  <Icon type="dashboard" />
                  时间:{item.timenodes.substr(0, 10)}
                </p>
              }
              description={
                <>
                  <div className="listContent">
                    <Icon type="read" />
                    课题:{item.title}
                  </div>
                  <div className="listContent">
                    <Icon type="read" />
                    与会人员:{item.member || "2016级软件工程学生"}
                  </div>
                  <div className="listContent">
                    <Icon type="read" />
                    评价:
                    {item.evaluate ? (
                      item.evaluate
                    ) : (
                      <EvaluateBox
                        item={item}
                        name={props.studentLectureDetail[0].name}
                        id={s_id}
                      />
                    )}
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  ) : (
    <DataLoading />
  );
}

export default connect(
  (store) => ({
    isClassGetingData: store.sclass.isClassGetingData,
    studentLectureDetail: store.sclass.studentLectureDetail,
    userConfig: store.login.userConfig,
  }),
  {
    getLectureDetail,
  }
)(LetureDetail);
