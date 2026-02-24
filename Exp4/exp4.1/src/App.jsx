import { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./GlobalContext";
import Navbar from "./Navbar";
import Home from "../src/Home";

function AppContent() {
  const { theme } = useContext(GlobalContext);

  return (
    <div
      style={{
        width: "400px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: theme === "light" ? "#ffffff" : "#1f1f1f",
        color: theme === "light" ? "#000000" : "#ffffff",
        boxShadow:
          theme === "light"
            ? "0 8px 20px rgba(0, 0, 0, 0.2)"
            : "0 8px 20px rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Navbar />
      <Home />
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;