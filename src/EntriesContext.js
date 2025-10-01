import { createContext, useContext, useState, useEffect } from "react";

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("incomeEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("incomeEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  const [transfers, setTransfers] = useState(() => {
    const saved = localStorage.getItem("transferEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transferEntries", JSON.stringify(transfers));
  }, [transfers]);

  const addTransfer = (newTransfer) => {
    setTransfers((prev) => [...prev, newTransfer]);
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        addEntry,
        transfers,
        addTransfer,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
}

export const useEntries = () => useContext(EntriesContext);
