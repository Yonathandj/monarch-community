"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useEffect, useRef, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const { userId } = useAuth();

  const firstRender = useRef(true);
  const [unpublishedPost, setUnpublishedPost] = useState({
    tags: [],
    title: "",
    headerImageURL: "",
    content: JSON.stringify([], null, 2),
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (userId) {
        const addNewPost = setTimeout(() => {
          fetch("http://localhost:3000/api/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, unpublishedPost }),
          });
        }, 2000);
        return () => {
          clearTimeout(addNewPost);
        };
      }
    }
  }, [userId, unpublishedPost]);

  return (
    <PostContext.Provider value={{ unpublishedPost, setUnpublishedPost }}>
      {children}
    </PostContext.Provider>
  );
}
