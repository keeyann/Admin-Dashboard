"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DashboardContextType = {
  editingProduct: any | null;
  setEditingProduct: (product: any | null) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  return (
    <DashboardContext.Provider value={{ editingProduct, setEditingProduct }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
};