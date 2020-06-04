import React from "react";
import {Spin} from "antd";
export default function DataLodaing() {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
