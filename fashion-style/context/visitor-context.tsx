"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface VisitorContextType {
  visitorCount: number;
  isNewVisitor: boolean;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

const STORAGE_KEY = "fashion-style-visitors";

export function VisitorProvider({ children }: { children: ReactNode }) {
  const [visitorCount, setVisitorCount] = useState(150);
  const [isNewVisitor, setIsNewVisitor] = useState(false);

  useEffect(() => {
    const lastVisit = localStorage.getItem("fashion-last-visit");
    const today = new Date().toDateString();
    const isNew = lastVisit !== today;
    setIsNewVisitor(isNew);

    if (isNew) {
      localStorage.setItem("fashion-last-visit", today);
      const stored = localStorage.getItem(STORAGE_KEY);
      const total = stored ? parseInt(stored) + 1 : 151;
      localStorage.setItem(STORAGE_KEY, String(total));
      setVisitorCount(total);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setVisitorCount(parseInt(stored));
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