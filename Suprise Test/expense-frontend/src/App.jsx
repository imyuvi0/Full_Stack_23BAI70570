import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("login"); // 🔥 control pages

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">

      {!token ? (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">

          {page === "login" ? (
            <Login setToken={setToken} goToRegister={() => setPage("register")} />
          ) : (
            <Register goToLogin={() => setPage("login")} />
          )}

        </div>
      ) : (
        <Dashboard setToken={setToken} />
      )}

    </div>
  );
}

export default App;