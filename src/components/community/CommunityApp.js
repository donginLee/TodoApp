import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import Post from "./Post.js";
import { PostsContext } from "./PostsProvider.js";
import Loading from "./Loading.js";
import "./scroll.css";
import { FaPlus } from "react-icons/fa6";
import AddPost from "./AddPost.js";
import SignInOrUp from "./SignInOrUp.js";
export default function CommunityApp() {
  const padding = "10px";
  const header = "10%";
  const limit = 10;
  const { posts, setPosts, postId, userId, setUserId, signedIn, setSignedIn } =
    useContext(PostsContext);
  const [start, setStart] = useState(postId - limit);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // 토큰 유효성 검사 (원하는 경우 서버에 확인 요청)
      setSignedIn(true);
    }
  }, [setSignedIn]);
  const fetchPosts = useCallback(async (p, s) => {
    console.log("run");
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const allPosts = response.data;

      const processedPosts = allPosts.slice(s, s + limit).reverse();
      console.log("reverse", processedPosts);
      const newPosts = processedPosts.map((element) => ({
        ...element,
        onEdit: false,
      }));
      // console.log(newPosts);
      setPosts([...p, ...newPosts]);
      // console.log(s);
      setStart((prev) => prev - limit);
      // console.log(s - limit);
      setLoading(false); // Set loading to false after data fetching completes
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false); // Make sure to set loading to false in case of error too
    }
  }, []);
  // useEffect(() => {
  //   console.log("바뀜:", start);
  // }, [start]);
  useEffect(() => {
    fetchPosts(posts, start);
    setLoading(false);
  }, []); // 최초 렌더링 시에만 실행되도록

  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout");
      setSignedIn(false);
      setUserId(""); // 로그아웃 시 사용자 ID 초기화
      console.log("SignOut successful");
    } catch (error) {
      console.error("SignOut error:", error);
    }
  };
  const handleScroll = async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop + clientHeight > scrollHeight - 1) {
      // 스크롤이 맨 아래로 도달하면 새로운 데이터를 가져옴
      await setLoading(true);
      await setTimeout(async () => {
        setLoading(true);
        await fetchPosts(posts, start);
        setLoading(false);
      }, 1334);
    }
  };
  return (
    <div
      style={{
        padding: padding,
        height: "100vh",
        boxSizing: "border-box",
        backgroundColor: "rgba(255,0,0,0.1)",
        // border: "2px solid red",
        display: "flex",
        border: "none",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          // border: "2px solid green",
          backgroundColor: "white",
          borderRadius: "30px",
          boxSizing: "border-box",
          height: `calc(100vh - ${padding} - ${padding}`,
        }}
      >
        <div
          style={{
            // border: "3px solid black",
            borderRadius: "30px 30px 0 0 ",
            border: "5px solid red",
            borderBottom: "0px",
            boxSizing: "border-box",
            height: header,
            textAlign: "center",
            alignContent: "center",
            fontSize: "30px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            style={{
              height: "90%",
              marginLeft: "20px",
            }}
            src={`${process.env.PUBLIC_URL}/assets/todoLogo.jpg`}
            alt="Todo Logo"
          />

          {signedIn ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{ fontSize: "16px", color: "lightgrey" }}
              >{`USER : ${userId}`}</div>
              <button
                onClick={handleSignOut}
                style={{ width: "50px", height: "15px", marginRight: "0" }}
              >
                SignOut
              </button>
            </div>
          ) : (
            <SignInOrUp />
          )}
        </div>
        <div
          style={{
            // border: "3px solid blue",
            border: "5px solid red",
            borderTop: "0px",
            borderRadius: "0 0 30px 30px ",
            boxSizing: "border-box",
            overflowY: "scroll",
            height: `calc(100% - ${header})`,
            scrollbarColor: "white",
          }}
          className="custom-scrollbar-container"
          onScroll={(e) => {
            handleScroll(e);
          }} // 스크롤 이벤트 핸들러 추가
        >
          {posts.map((post) => (
            <Post key={post.id} item={post} />
          ))}
          {loading ? <Loading></Loading> : null}
        </div>
      </div>
      <AddPost id="13"></AddPost>
    </div>
  );
}
