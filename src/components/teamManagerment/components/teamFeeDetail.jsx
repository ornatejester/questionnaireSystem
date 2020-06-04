import React from "react";
import { Descriptions, Collapse, Empty,Button } from "antd";
import { connect } from "react-redux";
import { setFeeDetail } from "../redux/reducer";
import DataLodaing from "../../base/dataLodaing";
import AddDivisionModal from "./addFeeDepartModal";
class TeamFeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.setFeeDetail(this.props.feeDetail.fid);
  }
  render() {
    const modalProps = {
      visible: this.state.modalVisible,
      showModal: () => {
        this.setState({
          modalVisible: true,
        });
      },
      handleCancel: (e) => {
        this.setState({
          modalVisible: false,
        });
      },
    };
    const { fname, fee, grade,fid,ftype } = this.props.feeDetail;
    return (
      <div className="teamFeeDetail">
        <Descriptions title="费用详情" bordered>
          <Descriptions.Item label="名称" span={3}>
            {fname}
          </Descriptions.Item>
          <Descriptions.Item label="总共" span={3}>
            {fee}
          </Descriptions.Item>
          <Descriptions.Item label="年级" span={2}>
            {grade}
          </Descriptions.Item>
          <Descriptions.Item label="类型" span={2}>
            {ftype}
          </Descriptions.Item>
        </Descriptions>
        <AddDivisionModal {...modalProps} fname={fname} fid={fid}/>
        <div className="feeDetailTitle">详情</div>
        <Button onClick={modalProps.showModal} style={{margin:6}}>添加经费分配信息</Button>
        {this.props.feeDepart ? (
          this.props.feeDepart.length == 0 ? (
            <Empty />
          ) : (
            <div className="cardGroup" key={Math.random()}>
              <Collapse accordion>
                {this.props.feeDepart.map((item, index) => (
                  <Collapse.Panel
                    key={index}
                    header={<span>学生学号:{item.sid}</span>}
                  >
                    <p>名称:{item.fname}</p>
                    <p>金额:{item.feedepart}</p>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </div>
          )
        ) : (
          <DataLodaing />
        )}
      </div>
    );
  }
}

export default connect(
  (store) => ({
    feeDepart: store.team.feeDepart,
  }),
  {
    setFeeDetail,
  }
)(TeamFeeDetail);
