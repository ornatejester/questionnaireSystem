import axios from "axios";
import config from "../../../config/index";
import { message } from "antd";
const initialState = {
  studentsLectureData: [],
  isClassGetingData: false,
  studentLectureDetail: null,
};

const SET_STUDENTSLECTURE = "SET_STUDENTSLECTURE";
const SET_STUDENTSLECTUREDETAIL = "SET_STUDENTSLECTUREDETAIL";
const SET_ISCLASSGETINGDATA = "SET_ISCLASSGETINGDATA";

export const getStudentsLecture = (id, grade) => (dispatch) => {
  dispatch({
    type: SET_ISCLASSGETINGDATA,
  });
  axios
    .get(`${config.apiUrl}/lecture/all?tid=${id}&grade=${grade}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUDENTSLECTURE,
          studentsLectureData: res.data,
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
export const getLectureDetail = (id) => (dispatch) => {
  dispatch({
    type: SET_ISCLASSGETINGDATA,
  });
  axios
    .get(`${config.apiUrl}/lecture/single?sid=${id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUDENTSLECTUREDETAIL,
          studentLectureDetail: res.data,
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

export default function ClassReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDENTSLECTURE:
      return {
        ...state,
        studentsLectureData: action.studentsLectureData,
        isClassGetingData: false,
      };
    case SET_STUDENTSLECTUREDETAIL:
      return {
        ...state,
        studentLectureDetail: action.studentLectureDetail,
        isClassGetingData: false,
      };
    case SET_ISCLASSGETINGDATA:
      return {
        ...state,
        isClassGetingData: true,
      };
    default:
      return state;
  }
}
