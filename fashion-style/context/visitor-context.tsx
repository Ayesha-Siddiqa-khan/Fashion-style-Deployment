"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface VisitorContextType {
  visitorCount: number;
  isNewVisitor: boolean;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("fashion-last-visit");
    const count = parseInt(localStorage.getItem("fashion-visitor-count") || "0", 10);

    if (lastVisit !== today) {
      setVisitorCount(count + 1);
      setIsNewVisitor(true);
      localStorage.setItem("fashion-visitor-count", String(count + 1));
      localStorage.setItem("fashion-last-visit", today);
    } else {
      setVisitorCount(count);
      setIsNewVisitor(false);
    }
  }, []);

  return (
    <VisitorContext.Provider value={{ visitorCount, isNewVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitors() {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error("useVisitors must be used within VisitorProvider");
  }
  return context;
}