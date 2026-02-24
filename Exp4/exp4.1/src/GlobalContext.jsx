import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user] = useState("Yuvraj Singh");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#f5f5f5" : "#121212";
  }, [theme]);

  return (
    <GlobalContext.Provider value={{ user, theme, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};