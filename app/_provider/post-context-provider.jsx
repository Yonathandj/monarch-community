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
    const getUnpublishedPostData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/unpublished-post?by=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        setUnpublishedPost(data);
      } else {
        return;
      }
    };
    if (userId) {
      getUnpublishedPostData();
    }
  }, [userId]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      if (userId) {
        const addNewPost = setTimeout(() => {
          fetch("http://localhost:3000/api/posts/unpublished-post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, unpublishedPost }),
          });
        }, 3000);
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
