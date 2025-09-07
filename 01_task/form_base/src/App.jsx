import { useRef } from "react";
import styles from "./App.module.css";
import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
// const passwordRegex = /^\w*$/; //testing

export const App = () => {
  const fieldSchema = yup.object().shape({
    email: yup
      .string()
      .required("Add your email address, please")
      .max(30, "Email is too long")
      .matches(
        emailRegex,
        "Wrong email address. Must include @ and domain like .com"
      ),

    password: yup
      .string()
      .required("Add your password, please")
      .min(8, "Password should be more than 7 symbols")
      .max(20, "Password should be less than 20 symbols")
      .matches(
        passwordRegex,
        "Password should contain at least 8 characters, uppercase, lowercase, number, special character"
      ),
    passwordRepeat: yup
      .string()
      .required("Confirm your password, please")
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    resolver: yupResolver(fieldSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const passwordRepeatError = errors.passwordRepeat?.message;

  const buttonSubmit = useRef(null);

  const sendFormData = ({ email, password }) => {
    console.log({ email, password });
  };

  // main submit functions
  // const submitForm = (event) => {
  //   event.preventDefault();
  //   sendFormData(formData);
  //   setFormData({ email: "", password: "" });
  //   setPasswordRepeat("");
  // };

  // utility functions
  // function isSimilarSteps(passwordMain, passwordforCheck) {
  //   if (passwordforCheck.length > passwordMain.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < passwordforCheck.length; i++) {
  //     if (passwordforCheck[i] != passwordMain[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // function checkFormValidity() {
  //   const formIsValid =
  //     !!formData.email &&
  //     !!formData.password &&
  //     !!passwordRepeat &&
  //     formData.password.length === passwordRepeat.length &&
  //     !emailError &&
  //     !passwordError &&
  //     !passwordRepeatError;

  //   return formIsValid;
  // }

  // function setButtonFocus() {
  //   if (checkFormValidity() && buttonSubmit.current) {
  //     buttonSubmit.current.focus();
  //   }
  // }

  // setTimeout(() => {
  //   setButtonFocus();
  // }, 0);

  return (
    <>
      <form onSubmit={handleSubmit(sendFormData)}>
        <fieldset className={styles.fieldset}>
          <legend>Sign-up</legend>

          <div className={`${styles.divInput}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              name="email"
              placeholder="example@mail.com"
              id="email"
            ></input>

            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>

          <div className={`${styles.divInput}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              {...register("password")}
              id="password"
            ></input>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>

          <div className={`${styles.divInput}`}>
            <label htmlFor="passwordRepeat">Re-enter your password</label>
            <input
              type="password"
              name="passwordRepeat"
              {...register("passwordRepeat")}
              id="passwordRepeat"
            ></input>
            {passwordRepeatError && (
              <p className={styles.error}>{passwordRepeatError}</p>
            )}
          </div>
          <button type="submit" disabled={false} ref={buttonSubmit}>
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
};
