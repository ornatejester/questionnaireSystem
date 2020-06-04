import axios from "axios";
import config from "../../../config/index";
import { message } from "antd";
const initialState = {
  teamFeeGroup: null,
  teamProjectGroup: null,
  stuProjectGroup: null,
  stuFeeGroup: null,
  projectDivision: null,
  projectDetail: null,
  feeDepart: null,
};

const SET_TEAMFEEGROUP = "SET_TEAMFEEGROUP";
const SET_TEAMPROJECTGROUP = "SET_TEAMPROJECTGROUP";
const SET_STUPROJECTGRUOP = "SET_STUPROJECTGRUOP";
const SET_PROJECTDIVISION = "SET_PROJECTDIVISION";
const SET_PROJECTDETAIL = "SET_PROJECTDETAIL";
const SET_STUFEEGROUP = "SET_STUFEEGROUP";
const SET_FEEDEPART = "SET_FEEDEPART";

//查询团队所有费用
export const setTeamFeeGroup = (t_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/fee/team?tid=${t_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_TEAMFEEGROUP,
          teamFeeGroup: res.data,
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
//查询团队所有项目
export const setTeamProjectGroup = (t_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/project/team?tid=${t_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_TEAMPROJECTGROUP,
          teamProjectGroup: res.data,
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
//查询学生参与项目
export const setStuProjectGroup = (s_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/project/member?sid=${s_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUPROJECTGRUOP,
          stuProjectGroup: res.data,
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
//查询某个项目分工
export const setProjectDivision = (p_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/project/division?pid=${p_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_PROJECTDIVISION,
          projectDivision: res.data,
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
//查询单个项目
export const setProjectDetail = (p_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/project/single?pid=${p_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_PROJECTDETAIL,
          projectDetail: res.data,
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
//查询学生参与的经费分工
export const setStuFeeGroup = (s_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/fee/member?sid=${s_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_STUFEEGROUP,
          stuFeeGroup: res.data,
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
//查询某个事务经费
export const setFeeDetail = (f_id) => (dispatch) => {
  axios
    .get(`${config.apiUrl}/fee/depart?fid=${f_id}`)
    .then((res) => {
      if (res) {
        dispatch({
          type: SET_FEEDEPART,
          feeDepart: res.data,
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

export default function TeamReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEAMFEEGROUP:
      return {
        ...state,
        teamFeeGroup: action.teamFeeGroup,
      };
    case SET_TEAMPROJECTGROUP:
      return {
        ...state,
        teamProjectGroup: action.teamProjectGroup,
      };
    case SET_STUPROJECTGRUOP:
      return {
        ...state,
        stuProjectGroup: action.stuProjectGroup,
      };
    case SET_PROJECTDIVISION:
      return {
        ...state,
        projectDivision: action.projectDivision,
      };
    case SET_PROJECTDETAIL:
      return {
        ...state,
        projectDetail: action.projectDetail,
      };
    case SET_STUFEEGROUP:
      return {
        ...state,
        stuFeeGroup: action.stuFeeGroup,
      };
    case SET_FEEDEPART:
      return {
        ...state,
        feeDepart: action.feeDepart,
      };
    default:
      return state;
  }
}
