import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const Navbar = () => {
  const { user, theme, toggleTheme } = useContext(GlobalContext);

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: theme === "light" ? "#f4f4f4" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        borderRadius: "8px",
        marginBottom: "15px",
      }}
    >
      <h3>Hello, {user}</h3>
      <p style={{ margin: "5px 0 10px 0" }}>
        To Switch Theme :
      </p>
      <button onClick={toggleTheme}>Switch Theme</button>
    </div>
  );
};

export default Navbar;