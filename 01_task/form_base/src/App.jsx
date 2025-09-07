import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";
import "./App.css";

// const initialState = { email: "", password: "" };

// export const useStore = () => {
//   const [state, setState] = useState(initialState);

//   return {
//     getState: () => state,
//     updateState: (fieldName, newValue) => {
//       setState({ ...state, [fieldName]: newValue });
//     },
//   };
// };

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
// const passwordRegex = /^\w*$/; //testing

function App() {
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordRepeatError, setPasswordRepeatError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const buttonSubmit = useRef(null);

  // main submit functions
  const submitForm = (event) => {
    event.preventDefault();
    sendFormData(formData);
    setFormData({ email: "", password: "" });
    setPasswordRepeat("");
  };

  const sendFormData = (data) => {
    console.log(data);
  };

  // utility functions
  function isSimilarSteps(passwordMain, passwordforCheck) {
    if (passwordforCheck.length > passwordMain.length) {
      return false;
    }

    for (let i = 0; i < passwordforCheck.length; i++) {
      if (passwordforCheck[i] != passwordMain[i]) {
        return false;
      }
    }
    return true;
  }

  function checkFormValidity() {
    const formIsValid =
      !!formData.email &&
      !!formData.password &&
      !!passwordRepeat &&
      formData.password.length === passwordRepeat.length &&
      !emailError &&
      !passwordError &&
      !passwordRepeatError;

    return formIsValid;
  }

  function setButtonFocus() {
    if (checkFormValidity() && buttonSubmit.current) {
      buttonSubmit.current.focus();
    }
  }

  // input validations
  const onEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmailError(null);
    setFormData({ ...formData, email: emailValue });

    if (emailValue.length > 30) {
      setEmailError("Email is too long");
    }
    checkFormValidity();
  };

  const onEmailBlur = (event) => {
    const emailValue = event.target.value;

    if (!emailRegex.test(emailValue)) {
      setEmailError("Wrong email address. Must include @ and domain like .com");
    }
    checkFormValidity();
  };

  // checking password
  const onPasswordChange = (event) => {
    const passwordValue = event.target.value;
    setFormData({ ...formData, password: passwordValue });

    setPasswordError(null);

    if (passwordValue.length > 20) {
      setPasswordError("Password should be less than 20 symbols");
    }

    checkFormValidity();
  };

  const onPasswordBlur = (event) => {
    const passwordValue = event.target.value;

    if (passwordValue.length < 7) {
      setPasswordError("Password should be more than 7 symbols");
    } else if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        "Password should contain at least 8 characters, uppercase, lowercase, number, special character"
      );
    }
    checkFormValidity();
  };

  // checking password repeated
  const onPasswordRepeatChange = (event) => {
    const passwordRepeatValue = event.target.value;
    setPasswordRepeat(passwordRepeatValue);
    setPasswordRepeatError(null);
    const { password: passwordValue } = formData;

    let isSimilarPassword = false;

    isSimilarPassword = isSimilarSteps(passwordValue, passwordRepeatValue);

    if (isSimilarPassword) {
      setPasswordRepeatError(null);
    } else {
      setPasswordRepeatError("Passwords are not similar");
    }

    checkFormValidity();
    setButtonFocus();
  };

  setTimeout(() => {
    setButtonFocus();
  }, 0);

  return (
    <>
      <form action="GET" onSubmit={submitForm}>
        <fieldset className={styles.fieldset}>
          <legend>Sign-up</legend>

          <div className={`${styles.divInput}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              placeholder="example@mail.com"
              id="email"
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            ></input>

            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={`${styles.divInput}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              id="password"
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
            ></input>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>

          <div className={`${styles.divInput}`}>
            <label htmlFor="passwordRepeat">Re-enter your password</label>
            <input
              type="password"
              name="passwordRepeat"
              value={passwordRepeat}
              id="passwordRepeat"
              onChange={onPasswordRepeatChange}
            ></input>
            {passwordRepeatError && (
              <p className={styles.error}>{passwordRepeatError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!checkFormValidity()}
            ref={buttonSubmit}
          >
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default App;
