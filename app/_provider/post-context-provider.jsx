"use client";

import { createContext, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const [unpublishedPost, setUnpublishedPost] = useState({
    tags: [],
    title: "",
    headerImageURL: "",
    content: JSON.stringify([], null, 2),
  });

  return (
    <PostContext.Provider value={{ unpublishedPost, setUnpublishedPost }}>
      {children}
    </PostContext.Provider>
  );
}
