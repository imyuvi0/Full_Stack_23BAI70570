import { useState } from "react";

function Login({ setToken, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.text();

    if (res.ok) {
      setMessage("Login successful ✅");
      setIsError(false);

      localStorage.setItem("token", data);

      setTimeout(() => {
        setToken(data);
      }, 1000);

    } else {
      setMessage("Invalid credentials ❌");
      setIsError(true);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      {message && (
        <p className={`text-center mb-2 ${isError ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <input
        className="w-full border rounded-lg p-2 mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded mb-3"
        onClick={login}
      >
        Login
      </button>

      <button
        className="w-full border py-2 rounded"
        onClick={goToRegister}
      >
        Create Account
      </button>
    </div>
  );
}

export default Login;