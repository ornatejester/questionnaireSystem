import React from "react"
// ## 1 React框架

// React组件化 =====》

// 1,函数组件  
function Button (props) {
​	return <div>这是按钮</div>
}

const Button = (props) => {
return <div>这是按钮</div>
}

//2,class组件
class Button extends React.Component {
    render() {
      return <div>这是按钮</div>
    }
}
