"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useEffect, useRef, useState } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const { userId } = useAuth();

  const firstRender = useRef(true);

  const [loadingPostUnpublishedPost, setLoadingPostUnpublishedPost] =
    useState(false);
  const [loadingPostHeaderImageURL, setLoadingPostHeaderImageURL] =
    useState(false);
  const [unpublishedPost, setUnpublishedPost] = useState({
    tags: [],
    title: "",
    headerImageURL: "",
    content: JSON.stringify([], null, 2),
  });

  useEffect(() => {
    setLoadingPostUnpublishedPost(true);
    const getUnpublishedPostData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/unpublished-post?by=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );
      if (response.ok) {
        const { data } = await response.json();
        setUnpublishedPost(data);
        setLoadingPostUnpublishedPost(false);
      } else {
        setLoadingPostUnpublishedPost(false);
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
      if (userId && !loadingPostUnpublishedPost) {
        const addNewPost = setTimeout(() => {
          fetch("http://localhost:3000/api/posts/unpublished-post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, unpublishedPost }),
          });
        }, 1000);
        return () => {
          clearTimeout(addNewPost);
        };
      }
    }
  }, [userId, unpublishedPost, loadingPostUnpublishedPost]);

  return (
    <PostContext.Provider
      value={{
        userId,
        unpublishedPost,
        setUnpublishedPost,
        setLoadingPostHeaderImageURL,
        loadingPostHeaderImageURL,
        loadingPostUnpublishedPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
