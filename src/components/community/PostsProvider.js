import React, { createContext, useState } from "react";

const PostsContext = createContext();
const PostsProvider = ({ children }) => {
  const sessionString = window.sessionStorage.getItem("posts");
  const sessionArr = sessionString ? JSON.parse(sessionString) : null;
  const [posts, setPosts] = useState(sessionArr || []);
  const [postId, setPostId] = useState(100);
  const [signedIn, setSignedIn] = useState(false); //true: 로그인 됨, false: 로그인 안됨
  const [userId, setUserId] = useState(false);
  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        postId,
        setPostId,
        signedIn,
        setSignedIn,
        userId,
        setUserId,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export { PostsProvider, PostsContext };
