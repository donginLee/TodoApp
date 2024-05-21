import React from "react";
export default function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <img
        style={{ width: "100px", transform: "translateX()" }}
        src={`${process.env.PUBLIC_URL}/assets/loading.gif`}
      ></img>
    </div>
  );
}
