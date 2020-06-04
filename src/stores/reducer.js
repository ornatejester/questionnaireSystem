import { combineReducers } from 'redux';

import login from '../pages/login/redux/reducer';
import home from '../pages/home/redux/reducer';
import system from "../components/systemManagerment/redux/reducer";
import member from "../components/memberManagerment/redux/reducer";
import sclass from "../components/classMangerment/redux/reducer";
import team from "../components/teamManagerment/redux/reducer";
export default combineReducers({
    home,
    login,
    system,
    member,
    sclass,
    team,
});