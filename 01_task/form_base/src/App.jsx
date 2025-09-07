import { useState, useRef, useEffect } from "react";
import styles from "./App.module.css";
import "./App.css";
import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])$/;
const passwordRegex = /^\w*$/; //testing

const emailChangeSchema = yup.string().max(30, "Email is too long");

const emailBlurSchema = yup
  .string()
  .required("Add your email address, please")
  .matches(
    emailRegex,
    "Wrong email address. Must include @ and domain like .com"
  );

const passwordChangeSchema = yup
  .string()
  .max(20, "Password should be less than 20 symbols");

const passwordBlurSchema = yup
  .string()
  .required("Add your password, please")
  .min(8, "Password should be more than 7 symbols")
  .matches(
    passwordRegex,
    "Password should contain at least 8 characters, uppercase, lowercase, number, special character"
  );

const passwordRepeateBlurSchema = yup
  .string()
  .required("Please re-write your password");

const validateAndGetErrorMessage = (schema, value) => {
  let errorMessage = null;

  try {
    schema.validateSync(value);
  } catch ({ errors }) {
    errorMessage = errors
      .reduce((message, error) => message + error + "\n", "")
      .trim();
  }

  return errorMessage;
};

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

    const newError = validateAndGetErrorMessage(emailChangeSchema, emailValue);
    setEmailError(newError);
  };

  const onEmailBlur = (event) => {
    const emailValue = event.target.value;

    const newError = validateAndGetErrorMessage(emailBlurSchema, emailValue);
    setEmailError(newError);
  };

  // checking password
  const onPasswordChange = (event) => {
    const passwordValue = event.target.value;
    setFormData({ ...formData, password: passwordValue });

    setPasswordError(null);

    const newPasswordError = validateAndGetErrorMessage(
      passwordChangeSchema,
      passwordValue
    );
    setPasswordError(newPasswordError);
  };

  const onPasswordBlur = (event) => {
    const passwordValue = event.target.value;

    const newPasswordError = validateAndGetErrorMessage(
      passwordBlurSchema,
      passwordValue
    );
    setPasswordError(newPasswordError);
    checkFormValidity();
  };

  // checking password repeated
  const onPasswordRepeatChange = (event) => {
    const passwordRepeatValue = event.target.value;
    setPasswordRepeat(passwordRepeatValue);
    const { password: passwordValue } = formData;
    setPasswordRepeatError(null);
    let isSimilarPassword = false;

    isSimilarPassword = isSimilarSteps(passwordValue, passwordRepeatValue);

    if (isSimilarPassword) {
      setPasswordRepeatError(null);
    } else {
      setPasswordRepeatError("Passwords are not similar");
    }

    checkFormValidity();
  };

  const onPasswordRepeatBlur = (event) => {
    const passwordRepeatValue = event.target.value;
    const { password: passwordValue } = formData;

    let isSimilarPassword = false;

    isSimilarPassword = isSimilarSteps(passwordValue, passwordRepeatValue);

    if (isSimilarPassword) {
      setPasswordRepeatError(null);
    } else {
      setPasswordRepeatError("Passwords are not similar");
    }

    checkFormValidity();
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
              onBlur={onPasswordRepeatBlur}
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
