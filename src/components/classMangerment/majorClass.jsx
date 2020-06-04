import React from "react";
import Toolbar from "../base/contentToolbar";
import ClassSchedule from "./components/classSchedule";
import { studentClassSchedule, teacherClassSchedule } from "./utils/mock";
import { connect } from "react-redux";

class MajorClass extends React.Component {
  render() {
    return (
      <div className="MajorClassContainer">
        <Toolbar />
        {this.props.userConfig.role == 0 ? (
          <ClassSchedule data={studentClassSchedule} />
        ) : (
          <ClassSchedule data={teacherClassSchedule} />
        )}
      </div>
    );
  }
}
export default connect(
  (store) => ({
    userConfig: store.login.userConfig,
  }),
  {}
)(MajorClass);
