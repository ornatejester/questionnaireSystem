import React from "react";
import { Table, Button } from "antd";

import html2pdf from 'html2pdf.js';
const RowBox = props => {
  return (
    <div className="rowBox">
      <p>{props.className}</p>
      <p>{props.grade || props.teacher}</p>
      <p>{props.roomID}</p>
    </div>
  );
};

class ClassSchedule extends React.Component {
  exportPdf = () => {
    // 要导出的dom节点，注意如果使用class控制样式，一定css规则
      const element = document.getElementById('ClassScheduleContent');
      // 导出配置
      const opt = {
        margin: 1,
        filename: '学生档案信息',
        image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
        html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      if (element) {
        html2pdf().set(opt).from(element).save(); // 导出
      }
    }
  render() {
    const columns = [
      {
        title: "日期",
        dataIndex: "date",
        key: "date",
        render: (text, record) => <div style={{width:140}}>{text}</div>
      },
      {
        title: "星期一",
        dataIndex: "monday",
        key: "monday",
        width:230,
        render: (text, record) => <RowBox {...text} />
      },
      {
        title: "星期二",
        dataIndex: "Tuesday",
        key: "Tuesday",
        width:230,
        render: (text, record) => <RowBox {...text} />
      },
      {
        title: "星期三",
        dataIndex: "Wednesday",
        key: "Wednesday",
        width:230,
        render: (text, record) => <RowBox {...text} />
      },
      {
        title: "星期四",
        dataIndex: "Thursday",
        key: "Thursday",
        width:230,
        render: (text, record) => <RowBox {...text} />
      },
      {
        title: "星期五",
        dataIndex: "Friday",
        key: "Friday",
        width:230,
        render: (text, record) => <RowBox {...text} />
      }
    ];
    return (
      <>
        <div className="ClassScheduleContent" id="ClassScheduleContent">
          <Table
            columns={columns}
            pagination={false}
            dataSource={this.props.data}
            bordered={true}
          />
        </div>
        <Button style={{marginTop:15}} type="primary" onClick={this.exportPdf}>导出课程表</Button>
      </>
    );
  }
}

export default ClassSchedule;
