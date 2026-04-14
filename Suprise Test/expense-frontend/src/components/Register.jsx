import { useState } from "react";

function Register({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const register = async () => {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setMessage("Registered successfully ✅");
      setIsError(false);

      setTimeout(() => {
        goToLogin();
      }, 1500);

    } else {
      setMessage("Registration failed ❌");
      setIsError(true);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

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
        className="w-full bg-green-500 text-white py-2 rounded mb-3"
        onClick={register}
      >
        Register
      </button>

      <button
        className="w-full border py-2 rounded"
        onClick={goToLogin}
      >
        Back to Login
      </button>
    </div>
  );
}

export default Register;