import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/user.json");
      const users = await response.json();

      const user = users.find((bruger) => bruger.username === username);

      if (user && user.password === password) {
        setLoginError(null);
        alert("Login succesfuldt!");
      } else {
        setLoginError("Forkert brugernavn eller adgangskode.");
      }
    } catch (error) {
      console.error("Fejl ved login", error);
      setLoginError("Noget gik galt.");
    }
  };

  return (
    <>
      <section>
        <form onSubmit={handleLogin}>
          <div>
            <label>Brugernavn</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Adgangskode:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log ind</button>
        </form>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </section>
    </>
  );
}

export default App;
