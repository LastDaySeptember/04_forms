import { useState } from "react";
import styles from "./App.module.css";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <>
      <form action="GET">
        <fieldset className={styles.fieldset}>
          <legend>Sign-up</legend>

          <div className={`${styles.divInput}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              placeholder="example@mail.com"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className={`${styles.divInput}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={() => {}}
            ></input>
          </div>
          <div className={`${styles.divInput}`}>
            <label htmlFor="passwordRepeat">Re-enter your password</label>
            <input
              type="password"
              name="passwordRepeat"
              value={passwordRepeat}
              id="passwordRepeat"
              onChange={() => {}}
            ></input>
          </div>
          <button type="submit" onClick={() => {}}>
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default App;
