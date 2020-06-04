import React from "react";
import {Divider} from 'antd';
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
      return (
        <>
          <div className="FooterContainer">
            <Divider type="horizontal"/>
              <span>版权所有:dyy399956</span>
          </div>
        </>
      )
  }
}

export default Footer;