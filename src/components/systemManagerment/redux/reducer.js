import axios from 'axios';
import config from "../../../config/index";
import { message } from 'antd';
const initialState = {
    userStatusInfor:null,
    userFileInfor:null,
};
  
const SET_USERSTATUSINFOR = "SET_USERSTATUSINFOR";
const SET_USERFILEINFOR = "SET_USERFILEINFOR";

export const getUserStatusInfor = id => dispatch => {
    axios.get(`${config.apiUrl}/enrollment/single?sid=${id}`).then(
        res => {
            if(res && res.data.status == "success"){
                dispatch({
                    type:SET_USERSTATUSINFOR,
                    userStatusInfor:res.data.data
                })
            }else{
                message.error("系统错误！");
            }
        }
    ).catch(err => {
        message.error("系统错误！");
        console.log(err);
    })
}

export const getUserFileInfor = id => dispatch => {
    axios.get(`${config.apiUrl}/student/single?sid=${id}`).then(
        res => {
            if(res && res.data.status == "success"){
                dispatch({
                    type:SET_USERFILEINFOR,
                    userFileInfor:res.data.data
                })
            }else{
                message.error("系统错误！");
            }
        }
    ).catch(err => {
        message.error("系统错误！");
        console.log(err);
    })
}
  
export default function SystemReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USERSTATUSINFOR:
        return {
          ...state,
          userStatusInfor:action.userStatusInfor
        };
      case SET_USERFILEINFOR:
        return {
          ...state,
          userFileInfor:action.userFileInfor
        };
      default:
        return state;
    }
  }
  