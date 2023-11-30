"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useEffect, useRef, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const { userId } = useAuth();

  const firstRender = useRef(true);

  const [loading, setLoading] = useState(false);
  const [unpublishedPost, setUnpublishedPost] = useState({
    tags: [],
    title: "",
    headerImageURL: "",
    content: JSON.stringify([], null, 2),
  });

  useEffect(() => {
    setLoading(true);
    const getUnpublishedPostData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/unpublished-post?by=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
      if (response.ok) {
        const { data } = await response.json();
        setUnpublishedPost(data);
        setLoading(false);
      } else {
        setLoading(false);
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
      if (userId && !loading) {
        const addNewPost = setTimeout(() => {
          fetch("http://localhost:3000/api/posts/unpublished-post", {
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
  }, [loading, userId, unpublishedPost]);

  return (
    <PostContext.Provider
      value={{
        loading,
        unpublishedPost,
        setUnpublishedPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
