import React, { useState } from "react";
import AddPostModal from "./AddPostModal.js";
import { FaPlus } from "react-icons/fa";

export default function AddPost({ id }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: "0px",
          left: "0px",
          borderRadius: "0px",
          background: "rgba(0,0,0,0.4)",
          display: clicked ? "block" : "none",
          transition: "0.3s",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",

          boxSizing: "border-box",

          backgroundColor: !clicked
            ? hovered
              ? "rgba(230,0,0)"
              : "red"
            : hovered
              ? "grey"
              : "lightgrey",
          bottom: "40px",
          right: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "pointer", // 마우스를 올리면 커서 모양 변경
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={() => setHovered(false)}
        onMouseUp={() => setHovered(true)}
        onClick={() => {
          setClicked((prev) => !prev);
        }}
      >
        <FaPlus
          color="white"
          size="20px"
          style={{
            transition: "0.1s",
            transform: clicked ? "rotate(-45deg)" : "none",
          }}
        ></FaPlus>
      </div>
      {clicked ? <AddPostModal setClicked={setClicked}></AddPostModal> : null}
    </>
  );
}
