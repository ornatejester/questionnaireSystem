import React,{useEffect} from 'react';
import {Route,Switch,BrowserRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { IntlProvider } from "react-intl"; 
import { languageConfig } from "./config/index";
import {setAuth} from "./pages/login/redux/reducer";
// 引入页面
import Login from './pages/login';
import Home from './pages/home';
import { Button } from 'antd';
// 引入总样式文件
require('./scss/index.scss');

const PrivateRoute = ({ component,userConfig,path,...rest }) => {
  return (
    <Route
      {...rest} 
      render={props => (
        userConfig ? ( 
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

const PublicRoute = ({userConfig, component,path,...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        userConfig ? (
        <Redirect
          to={{
            pathname: "/home/systemIndex",
          }}
        />
      ) : (
        React.createElement(component, props)
      )
    )}
    />
  );
};

const App = (props) => {

  useEffect(()=>{
    let userConfig = sessionStorage.getItem('userConfig')?JSON.parse(sessionStorage.getItem('userConfig')):null;
    if(userConfig){
      props.setAuth(userConfig);
      sessionStorage.removeItem('userConfig',props.userConfig);
    }
  },[])

  return (
  <IntlProvider locale={props.localLanguage.value} messages={languageConfig[props.localLanguage.code]}>
    <BrowserRouter>
      <Switch>
        {/* 1级路由 */}
        <PrivateRoute path="/home" component={Home} {...props}/>
        <PublicRoute path="/login" component={Login} {...props}/>


        <Route path="/home" render={() => <Redirect to="/home/systemIndex" />} />
        <Route path="/" render={() => <Redirect to="/home/systemIndex" />} />
        <Redirect from="/*" to="/home/systemIndex" />
      </Switch>
    </BrowserRouter>
    </IntlProvider>
)};

export default connect(
  store => ({
    isAuthenticated: store.login.isAuthenticated,
    localLanguage:store.home.localLanguage,
    userConfig:store.login.userConfig
  }),{
    setAuth
  }
)(App);
