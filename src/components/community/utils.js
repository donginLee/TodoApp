import React, { useContext, useCallback } from "react";
import { PostsContext } from "./PostsProvider.js";

export const usePosts = () => {
  const { posts } = useContext(PostsContext);
  return posts;
};

export const useSetPosts = (obj) => {
  const { posts, setPosts } = useContext(PostsContext);
  setPosts({ ...posts, obj });
  return;
};
