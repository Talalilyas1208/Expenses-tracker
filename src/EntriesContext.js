// EntriesContext.js
import React, { createContext, useContext, useState } from "react";

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState([]);

  // define addEntry helper
  const addEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  return (
    <EntriesContext.Provider value={{ entries, setEntries, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}

// custom hook
export const useEntries = () => useContext(EntriesContext);
