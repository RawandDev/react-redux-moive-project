import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { login } from "../../store/reducers/authSlice";
import { auth } from "../../firebase/firebase";
import "./LogoutButton.css";
import "./Buttons.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state);
  const history = useHistory();

  console.log("authState: ", authState);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return subscribe;
  }, []);

  console.log("currentUser login:", currentUser);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // login with firebase
  function loginWithFirebase() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(login({ email, password }));
        history.push("/");
        console.log("login user:", user);
      })
      .catch((error) => {
        console.log("login error:", error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginWithFirebase();
    // loginAuth();
  }

  //   console.log(error);

  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        // color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentUser ? (
        <div>
          <h1 style={{ color: "white" }}>
            {t("user_loggedin")} {currentUser.email}
          </h1>
          <button
            type="button"
            onClick={() => auth.signOut()}
            className="logout"
          >
            {t("logout")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "white" }}>{t("login_with_your_account")}</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              margin: "auto",
            }}
          >
            <input
              style={{
                margin: "10px 0",
                padding: "5px",
                borderRadius: "5px",
              }}
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={handleEmailChange}
            />
            <input
              style={{
                marginBottom: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" className="fill">
              {t("login")}
            </button>
          </div>
          <p style={{ color: "white" }}>
            {t("need_an_account")} <Link to="/signup">{t("signup")}</Link>
          </p>
          {/* user email: {currentUser && currentUser.email} */}
        </form>
      )}
    </div>
  );
}

export default Login;
