import { useState, useEffect } from "react";
import "../css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import texts from "../json/login.json";
import Cookies from "universal-cookie";
import { auth } from "../../lib/firebase";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import Envelope from "./Envelope";
import { useAtom } from "jotai";
import { userAtom } from "../../util/atom"; // A userAtom importálása

const Modal = ({ message, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <img src="src\Login\img\nope.png" className="modal-image" alt="Modal" />
      <p>{message}</p>
      <button onClick={onClose} className="modal-button">
        OK
      </button>
    </div>
  </div>
);

const cookies = new Cookies();

const Login = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("hu");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const Successlogin = () => {
    window.location.href = "/data";
  };

  useEffect(() => {
    const storedLanguage = cookies.get("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const interval = setInterval(() => {
      const currentLanguage = cookies.get("language");
      if (currentLanguage && currentLanguage !== language) {
        setLanguage(currentLanguage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [language]);

  const getText = (key) => {
    const keys = key.split(".");
    let textValue = texts[language];
    for (const k of keys) {
      if (textValue[k] === undefined) {
        return key;
      }
      textValue = textValue[k];
    }
    return textValue;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); // Set the user in the atom
        console.log("User logged in:", user); // Check the user object
        Successlogin();
      })
      .catch((error) => {
        setError("Hiba a bejelentkezés során, kérjük próbáld újra!");
        setShowModal(true);
      });
  };

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); // Set the user in the atom
        console.log("User logged in:", user); // Check the user object
      })
      .catch((error) => {
        setError("Hiba a bejelentkezés során, kérjük próbáld újra!");
        setShowModal(true);
      });
  };

  const handleGitHubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user); // Set the user in the atom
        console.log("User logged in:", user); // Check the user object
      })
      .catch((error) => {
        setError("Hiba a bejelentkezés során, kérjük próbáld újra!");
        setShowModal(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (isRegistering) {
      if (!passwordRegex.test(password)) {
        setError(
          "A jelszónak tartalmaznia kell legalább 8 karaktert, minimum 1 nagybetűt és 1 számot."
        );
        setShowModal(true);
        return;
      }

      if (password !== confirmPassword) {
        setError("A jelszavak nem egyeznek meg.");
        setShowModal(true);
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user); // Set the user in the atom
          console.log("User logged in:", user); // Check the user object
          setSuccessMessage("Sikeres regisztráció!");
          setRegistrationSuccess(true);
          sendEmailVerification(auth.currentUser).then(() => {});
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/email-already-in-use") {
            setError("Ez az email cím már használatban van");
          } else {
            setError(errorMessage);
            console.log(errorMessage);
            console.log(errorCode);
          }
          setShowModal(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user); // Set the user in the atom
          console.log("User logged in:", user); // Check the user object
          if (!user.emailVerified) {
            setError(
              "Az email cím még nincs megerősítve. Kérjük, ellenőrizze a beérkezett leveleket."
            );
            setShowModal(true);
          } else {
            setError("Sikeres bejelentkezés!");
          }
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/invalid-credential") {
            setError(
              "A hitelesítési adatok érvénytelenek. Kérjük, ellenőrizze a beírt adatokat."
            );
          } else if (errorCode === "auth/user-not-found") {
            setError(
              "Még nincs fiókod ezzel az email címmel. Kérjük, regisztrálj!"
            );
          } else if (errorCode === "auth/wrong-password") {
            setError("Helytelen jelszó!");
          } else {
            setError(errorMessage);
            console.log(errorMessage);
            console.log(errorCode);
          }
          setShowModal(true);
        });
    }
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setRegistrationSuccess(true);
        return;
      })
      .catch((error) => {
        if (!email.includes("@")) {
          setError("Kérjük, add meg a helyes email címed!");
          setShowModal(true);
          return;
        }
        setError(
          "Hiba történt a jelszó visszaállítás során, kérjük próbáld újra."
        );
        setShowModal(true);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-box">
          {registrationSuccess ? (
            <div className="success-message">
              <h4>Email elküldve!</h4>
              <Envelope />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1>
                {isRegistering
                  ? getText("register.title")
                  : getText("login.title")}
              </h1>
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder={getText("login.email")}
                  className="login-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={getText("login.password")}
                  className="login-input"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {isRegistering && (
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder={getText("register.confirmPassword")}
                    className="login-input"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <button
                    type="button"
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              )}
              <button type="submit" className="login-button">
                {isRegistering
                  ? getText("register.submit")
                  : getText("login.submit")}
              </button>
              <div className="login-buttons">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="login-button-google"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="login-button-facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </button>
                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  className="login-button-github"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </button>
              </div>
              <div className="register-link">
                <p>
                  {isRegistering
                    ? getText("register.hasAccount")
                    : getText("login.noAccount")}
                  <a href="#" onClick={toggleForm}>
                    {isRegistering
                      ? getText("register.loginHere")
                      : getText("login.registerHere")}
                  </a>
                </p>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="forgot-password-link"
                >
                  {isRegistering ? "" : getText("login.forgotPassword")}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      {showModal && (
        <Modal message={error} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Login;
function Successlogin() {
  throw new Error("Function not implemented.");
}
