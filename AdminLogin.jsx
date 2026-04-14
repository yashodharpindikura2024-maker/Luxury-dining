import { useState } from "react";

function AdminLogin({ route }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "admin123") {
      route("admin-panel");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="entry-page">
      <div className="entry-content">
        <h1>Admin Login</h1>

        <input
          className="search-bar"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <br /><br />

        <input
          className="search-bar"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <br /><br />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <br /><br />

        <button
          className="secondary-btn"
          onClick={() => route("entry")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;