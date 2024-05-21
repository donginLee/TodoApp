import React, { useContext, useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoTrashBin, IoTrashBinOutline } from "react-icons/io5";
import { IoTrashBinSharp } from "react-icons/io5";
import { PostsContext } from "./PostsProvider";

import axios from "axios";
export default function Post({ item }) {
  let totalHeight = "140px";
  let extraHeight = "120px";

  let infoHeight = "30px";
  let padding = "15px";
  let iconSize = "30px";
  let doneSize = "40px";
  let fontSize = "20px";

  const [editHover, setEditHover] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [trashHover, setTrashHover] = useState(false);
  const [postHover, setPostHover] = useState(false);
  const [onDetail, setOnDetail] = useState(false);
  const [input, setInput] = useState("");
  const { posts, setPosts } = useContext(PostsContext);
  const ref = useRef();
  useEffect(() => {
    if (!(ref.current === undefined || null) && startEdit) {
      ref.current.setSelectionRange(
        ref.current.value.length,
        ref.current.value.length
      );
      ref.current.focus();
    }
  }, [startEdit]);
  const changeCompleted = (id) => {
    setPosts(
      posts.map((ele, idx) => {
        if (ele.id === id) {
          ele.completed = !ele.completed;
        }
        return ele;
      })
    );
  };

  const onDelete = (id) => {
    setPosts(
      posts.filter((ele) => {
        return ele.id !== id;
      })
    );
    console.log("삭제됐을걸");
  };
  const onEdit = (id, content) => {
    if (
      !(ref.current === undefined || ref.current === null) &&
      content === "" &&
      startEdit
    ) {
      alert("내용을 작성해주세요.");
      setStartEdit(true);
      ref.current.focus();
      return;
    } else if (
      !(ref.current === undefined || ref.current === null) &&
      ref.current.scrollHeight >
        2 * parseFloat(window.getComputedStyle(ref.current).lineHeight) &&
      startEdit
    ) {
      console.log(input, item.title);
      alert("내용이 너무 깁니다. 두 줄 이하로 작성해 주세요.");
      ref.current.focus();
      // setInput(item.title);
      return;
    } else {
      setPosts(
        posts.map((ele) => {
          if (ele.id !== id) return ele;
          else {
            return {
              ...ele,
              onEdit: false,
              title: content,
            };
          }
        })
      );
      setInput("");
      setStartEdit(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: onDetail
          ? `calc(${totalHeight} + ${extraHeight}`
          : `${totalHeight}`,
        border: "5px dashed rgb(255,240,240)",
        padding: `${padding}`,
        boxSizing: "border-box",
      }}
      onClick={() => {
        if (!startEdit) setOnDetail((prev) => !prev);
      }}
    >
      <div
        style={{
          // border: "3px solid yellow",
          boxSizing: "border-box",
          height: `${infoHeight}`,
          color: "grey",
        }}
        onMouseEnter={() => {
          setPostHover(true);
        }}
        onMouseLeave={() => {
          setPostHover(false);
        }}
      >
        <span>
          post : {item.id} by {item.userId}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          height: "50px",
          boxSizing: "border-box",
          // border: "2px solid purple",
        }}
      >
        <div
          style={{
            width: `calc(100% - ${iconSize} - ${iconSize})`,
            display: "flex",
            height: "100%",
            boxSizing: "border-box",
            // border: "3px solid violet",
            margin: "0px",
            padding: "0px",
            boxSizing: "border-box",
            alignContent: "center",
          }}
        >
          <div
            style={{
              width: `${iconSize}`,
              height: `${iconSize}`,
              margin: "auto 0",
              // backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {item.completed ? (
              <FaCheckCircle
                style={{ color: "rgba(255,0,0)", width: "80%", height: "80%" }}
                onClick={(event) => {
                  changeCompleted(item.id);
                  event.stopPropagation();
                }}
              />
            ) : (
              <FaRegCheckCircle
                style={{
                  color: "rgba(255,0,0,0.5)",
                  width: "80%",
                  height: "80%",
                }}
                onClick={(event) => {
                  changeCompleted(item.id);
                  event.stopPropagation();
                }}
              />
            )}
          </div>

          {startEdit ? (
            <textarea
              ref={ref}
              style={{
                width: `calc(100% - ${iconSize})`,
                border: "none",
                outline: "none",
                margin: "auto 0",
                boxSizing: "border-box",
                color: "grey",
                // marginLeft: "15px",
                fontSize: `${fontSize}`,
                fontFamily: "sans-serif",
                fontWeight: "800",
                height: "auto",
                padding: "0px",
                lineHeight: "1.2",
                paddingLeft: "15px",
                alignContent: "center",
              }}
              value={input}
              onClick={(e) => {
                // console.log("1:", e.target.style.lineHeight);
                setOnDetail(false);
                e.stopPropagation();
              }}
              onChange={(e) => {
                console.log(
                  parseFloat(window.getComputedStyle(ref.current).lineHeight)
                );
                setInput(e.target.value);
              }}
            />
          ) : (
            <p
              style={{
                boxSizing: "border-box",
                width: `calc(100% - ${iconSize})`,
                fontFamily: "sans-serif",
                fontSize: `${fontSize}`,
                fontWeight: "800",
                padding: "0px",
                paddingLeft: "15px",
                height: "auto",
                textOverflow: "ellipsis",
                lineHeight: "1.2",
                // border: "5px solid pink",
                alignContent: "center",
              }}
            >
              {item.title}
            </p>
          )}
        </div>
        <div
          style={{
            // border: "3px solid pink",
            width: "100px",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              // border: "2px solid black",
              width: `${iconSize}`,
              height: `${iconSize}`,
              boxSizing: "border-box",
            }}
          >
            {editHover && !startEdit ? (
              <MdEdit
                style={{ color: "red", width: "100%", height: "100%" }}
                onMouseLeave={() => {
                  setEditHover(false);
                }}
                onClick={(event) => {
                  onEdit(item.id, input);
                  setStartEdit(true);
                  setInput(item.title);
                  setOnDetail(false);
                  event.stopPropagation();
                }}
              />
            ) : !startEdit ? (
              <MdOutlineEdit
                style={{
                  color: "rgba(255,0,0,0.5)",
                  width: "100%",
                  height: "100%",
                }}
                onMouseEnter={() => {
                  console.log("호버함");
                  setEditHover(true);
                }}
                onMouseLeave={() => {
                  setEditHover(false);
                }}
                onClick={(event) => {
                  setEditHover(false);
                  event.stopPropagation();
                }}
              />
            ) : (
              <FaCheck
                style={{
                  color: `${editHover ? "rgba(255,0,0)" : "rgba(255,0,0,0.5)"}`,
                  width: "100%",
                  height: "100%",
                }}
                onMouseEnter={() => {
                  setEditHover(true);
                }}
                onMouseLeave={() => {
                  setEditHover(false);
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  console.log(input);
                  onEdit(item.id, input);
                }}
              />
            )}
          </div>
          <div
            style={{
              // border: "2px solid grey",
              width: `${iconSize}`,
              height: `${iconSize}`,
              boxSizing: "border-box",
            }}
          >
            {trashHover ? (
              <IoTrashBin
                style={{ color: "red", width: "100%", height: "100%" }}
                onMouseEnter={() => {
                  setTrashHover(true);
                }}
                onMouseLeave={() => {
                  setTrashHover(false);
                }}
                onClick={() => {
                  onDelete(item.id);
                }}
              />
            ) : (
              <IoTrashBinOutline
                style={{
                  color: "rgba(255,0,0,0.5)",
                  width: "100%",
                  height: "100%",
                }}
                onMouseEnter={() => {
                  setTrashHover(true);
                }}
                onClick={() => {
                  setTrashHover(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {onDetail ? (
        <div
          style={{
            border: "10px solid red",
            borderRadius: "20px",
            height: "140px",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {item.body}
        </div>
      ) : null}
    </div>
  );
}
