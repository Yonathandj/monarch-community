"use client";

import { createContext, useState } from "react";

export const postContext = createContext(null);

export default function PostContextProvider({ children }) {
  const [post, setPost] = useState({});
  return (
    <postContext.Provider value={{ post, setPost }}>
      {children}
    </postContext.Provider>
  );
}
