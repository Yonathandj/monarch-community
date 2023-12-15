"use client";

import { useParams } from "next/navigation";
const { createContext, useEffect, useState } = require("react");

export const UpdatePostContext = createContext(null);

export default function UpdatePostContextProvider({ children }) {
  const { id: postId } = useParams();

  const [initialHeaderImageURL, setInitialHeaderImageURL] = useState("");
  const [loadingFetchPublishedPost, setLoadingFetchPublishedPost] =
    useState(false);
  const [updatedPublishedPost, setUpdatedPublishedPost] = useState({
    tags: [],
    title: "",
    headerImageURL: "",
    content: JSON.stringify([], null, 2),
  });

  useEffect(() => {
    setLoadingFetchPublishedPost(true);
    const getPublishedPostData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/published-post?by=${postId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const { data } = await response.json();

        setUpdatedPublishedPost(data);
        setInitialHeaderImageURL(data.headerImageURL);

        setLoadingFetchPublishedPost(false);
      } else {
        setLoadingFetchPublishedPost(false);
        return;
      }
    };
    if (postId) {
      getPublishedPostData();
    }
  }, [postId]);

  return (
    <UpdatePostContext.Provider
      value={{
        initialHeaderImageURL,
        loadingFetchPublishedPost,
        updatedPublishedPost,
        setUpdatedPublishedPost,
      }}
    >
      {children}
    </UpdatePostContext.Provider>
  );
}
