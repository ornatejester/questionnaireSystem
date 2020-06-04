import axios from "axios";
import config from "../../../config/index";
import { message } from "antd";
const initialState = {
  studentsFile: [],
  studentsStatus: [],
  isGetingData: false,
  stuThesisProgress: null,
  stuThesisReport: null,
  stuThesisTopic: null,
};

const SET_STUDENTSFILE = "SET_STUDENTSFILE";
const SET_STUDENTSSTATUS = "SET_STUDENTSSTATUS";
const SET_ISGETINGDATA = "SET_ISGETINGDATA";

const SET_PROGRESS = "SET_PROGRESS";
const SET_REPORT = "SET_REPORT";
const SET_TOPIC = "SET_TOPIC";

export const setProgress = (stuThesisProgress) => (dispatch) => {
  dispatch({
    type: SET_PROGRESS,
    stuThesisProgress,
  });
};

export const setReport = (stuThesisReport) => (dispatch) => {
  dispatch({
    type: SET_REPORT,
    stuThesisReport,
  });
};

export const setTopic = (stuThesisTopic) => (dispatch) => {
  dispatch({
    type: SET_TOPIC,
    stuThesisTopic,
  });
};

export const getStudentsFile = (id, grade) => (dispatch) => {
  dispatch({
    type: SET_ISGETINGDATA,
  });
  axios
    .get(`${config.apiUrl}/student/all?tid=${id}&grade=${grade}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUDENTSFILE,
          studentsFile: res.data,
        });
      } else {
        message.error("系统错误！");
      }
    })
    .catch((err) => {
      message.error("系统错误！");
      console.log(err);
    });
};

export const getStudentsStatus = (id, grade) => (dispatch) => {
  dispatch({
    type: SET_ISGETINGDATA,
  });
  axios
    .get(`${config.apiUrl}/enrollment/all?tid=${id}&grade=${grade}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUDENTSSTATUS,
          studentsStatus: res.data,
        });
      } else {
        message.error("系统错误！");
      }
    })
    .catch((err) => {
      message.error("系统错误！");
      console.log(err);
    });
};

export default function MemberReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTSFILE:
      return {
        ...state,
        studentsFile: action.studentsFile,
        isGetingData: false,
      };
    case SET_STUDENTSSTATUS:
      return {
        ...state,
        studentsStatus: action.studentsStatus,
        isGetingData: false,
      };
    case SET_ISGETINGDATA:
      return {
        ...state,
        isGetingData: true,
      };
    case SET_PROGRESS:
      return {
        ...state,
        stuThesisProgress: action.stuThesisProgress,
      };
    case SET_REPORT:
      return {
        ...state,
        stuThesisReport: action.stuThesisReport,
      };
    case SET_TOPIC:
      return {
        ...state,
        stuThesisTopic: action.stuThesisTopic,
      };
    default:
      return state;
  }
}
