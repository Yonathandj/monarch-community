"use client";

import { createContext, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const [post, setPost] = useState({
    headerImage: "",
    title: "",
    tags: [],
    content: "",
  });
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
