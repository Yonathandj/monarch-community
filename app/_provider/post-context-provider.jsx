"use client";

import { createContext } from "react";

export const PostContext = createContext(null);

export default function PostContextProvider({ children }) {
  const [unpublishedPost, setUnpublishedPost] = useState({});

  return (
    <PostContext.Provider value={{ unpublishedPost, setUnpublishedPost }}>
      {children}
    </PostContext.Provider>
  );
}
