import request from "../../../request/index";
import axios from "axios";
import config from "../../../config/index";
import menuConfig from "../utils/authenticate";
import { message } from "antd";
export const initialState = {
  isLoading: false,
  vCodeMsg: "",
  changePSLoading: false,
  userConfig: null,
  menuList: null,
};

// 初始变量   

// 预定义指令

//  调用指令的函数

//  执行调用指令的函数（提交新的变量） =====>  Reduer函数中(根据指令做相应动作，改变初始变量)

//动作action 用唯一字符串标识
export const START_LOGIN = "Login/START_LOGIN";
export const LOGIN_SUCCESS = "Login/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "Login/LOGIN_FAILURE";
export const RESET_ERROR = "Login/RESET_ERROR";
export const LOGIN_USER = "Login/LOGIN_USER";
export const SIGN_OUT_SUCCESS = "Login/SIGN_OUT_SUCCESS";

export const START_CHANGE_PS = "START_CHANGE_PS";
export const CHANGE_PS_SUCCESS = "CHANGE_PS_SUCCESS";
export const CHANGE_PS_FAIL = "CHANGE_PS_FAIL";

export const SET_VCODE_MSG = "SET_VCODE_MSG";

export const SET_AUTH = "SET_AUTH";

export const setVcodeMsg = (msg) => {
  return {
    type: SET_VCODE_MSG,
    msg,
  };
};

export const startLogin = () => ({
  type: START_LOGIN,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const startChangePS = () => {
  return {
    type: START_CHANGE_PS,
  };
};

export const changePSSuccess = () => {
  return {
    type: CHANGE_PS_SUCCESS,
  };
};

export const changePSFail = () => {
  return {
    type: CHANGE_PS_FAIL,
  };
};

export const setAuth = (userConfig) => (dispatch) => {
  const menuList = menuConfig[userConfig.role];
  dispatch({
    type: SET_AUTH,
    userConfig,
    menuList,
  });
};

//定义方法，用于提交动作
export const loginUser = (login, password) => (dispatch) => {
  dispatch(startLogin());
  if (!!login && !!password) {
    // 联调登录接口
    // axios.post(`${config.apiUrl}/user/login?id=${login}&password=${password}`)
    // .then(res=>{
    //   if(res && res.data.status == "success"){
    //     dispatch(loginSuccess());
    //     const userConfig = res.data.data;
    //     const menuList = menuConfig[userConfig.role];
    //       dispatch({
    //         type: SET_AUTH,
    //         userConfig,
    //         menuList,
    //       });
    //   }else if(res && res.data.status == "密码错误"){
    //     message.error("密码错误");
    //     dispatch(loginFailure());
    //   }else if(res && res.data.status == "用户不存在"){
    //     message.error("用户不存在");
    //     dispatch(loginFailure());
    //   }else{
    //     message.error("系统错误");
    //     dispatch(loginFailure());
    //   }
    // }).catch(err => {
    //   dispatch(loginFailure());
    //   console.log(err);
    // })
    const userConfig = {
      role: 0,
      name: "欧杰喜欢dyy",
      id:"2016110433"
    };
    setTimeout(() => {
      // localStorage.setItem("id_token", login);
      dispatch(loginSuccess());
      const menuList = menuConfig[userConfig.role];
      dispatch({
        type: SET_AUTH,
        userConfig,
        menuList,
      });
    }, 1000);
  } else {
    dispatch(loginFailure());
  }
};

export const signOutUser = () => (dispatch) => {
  window.onunload = null;
  dispatch(signOutSuccess());
};

export const changePS = (id, idNumber, password,callback) => (dispatch) => {
  dispatch(startChangePS());
  // 联调修改密码接口
  axios
    .post(
      `${config.apiUrl}/user/alterpw?id=${id}&idNumber=${idNumber}&password=${password}`
    )
    .then((res) => {
      if (res && res.data.status == "修改成功") {
        message.info("修改密码成功");
        dispatch(changePSSuccess());
        callback();
      } else if (res && res.data.status == "用户不存在") {
        message.error("用户不存在");
        dispatch(changePSFail());
      } else if (res && res.data.status == "身份证号输入有误") {
        message.error("身份证号输入有误");
        dispatch(changePSFail());
      } else {
        message.error("系统错误");
        dispatch(changePSFail());
      }
    })
    .catch((err) => {
      message.error("系统错误");
      dispatch(changePSFail());
      console.log(err);
    });
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case RESET_ERROR:
      return {
        error: false,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        userConfig: null,
      };
    case SET_VCODE_MSG:
      return {
        ...state,
        vCodeMsg: action.msg,
      };
    case START_CHANGE_PS:
      return {
        ...state,
        changePSLoading: true,
      };
    case CHANGE_PS_SUCCESS: {
      return {
        ...state,
        changePSLoading: false,
      };
    }
    case CHANGE_PS_FAIL: {
      return {
        ...state,
        changePSLoading: false,
      };
    }
    case SET_AUTH:
      window.onunload = function () {
        sessionStorage.setItem("userConfig", JSON.stringify(action.userConfig));
      };
      return {
        ...state,
        userConfig: action.userConfig,
        menuList: action.menuList,
      };
    default:
      return state;
  }
}
