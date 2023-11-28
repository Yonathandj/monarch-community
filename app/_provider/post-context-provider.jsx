"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const { userId } = useAuth();

  const [unpublishedPost, setUnpublishedPost] = useState({
    startWriting: false,
    data: {
      tags: [],
      title: "",
      headerImageURL: "",
      content: JSON.stringify([], null, 2),
    },
  });

  useEffect(() => {
    if (userId && unpublishedPost.startWriting) {
      const addNewPost = setTimeout(() => {
        fetch("http://localhost:3000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: unpublishedPost.data, userId }),
        });
      }, 2000);
      return () => clearTimeout(addNewPost);
    }
  }, [userId, unpublishedPost]);

  return (
    <PostContext.Provider value={{ unpublishedPost, setUnpublishedPost }}>
      {children}
    </PostContext.Provider>
  );
}
