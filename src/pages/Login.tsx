import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { Circle, Facebook, Github, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { auth } from "../lib/firebase";
import { languageAtom } from "../store/languageAtom";
import { userAtom } from "../store/userAtom";
import Modal from "../components/Modal";
import Envelope from "../components/Envelope";

// Szövegek a login.json alapján
const texts = {
  hu: {
    login: {
      title: "Bejelentkezés",
      email: "Email",
      password: "Jelszó",
      submit: "Bejelentkezés",
      noAccount: "Nincs még fiókod? ",
      registerHere: "Regisztrálj itt",
      forgotPassword: "Elfelejtetted a jelszavad?",
    },
    register: {
      title: "Regisztráció",
      confirmPassword: "Jelszó megerősítése",
      submit: "Regisztráció",
      hasAccount: "Már van fiókod? ",
      loginHere: "Jelentkezz be itt",
    },
    errors: {
      passwordMismatch: "A jelszavak nem egyeznek meg.",
      invalidPassword:
        "A jelszónak tartalmaznia kell legalább 8 karaktert, minimum 1 nagybetűt és 1 számot.",
      emailInUse: "Ez az email cím már használatban van.",
      invalidCredentials:
        "A hitelesítési adatok érvénytelenek. Kérjük, ellenőrizze a beírt adatokat.",
      userNotFound:
        "Még nincs fiókod ezzel az email címmel. Kérjük, regisztrálj!",
      wrongPassword: "Helytelen jelszó!",
      emailNotVerified:
        "Az email cím még nincs megerősítve. Kérjük, ellenőrizze a beérkezett leveleket.",
      invalidEmail: "Kérjük, add meg a helyes email címed!",
      authError: "Hiba a bejelentkezés során, kérjük próbáld újra.",
      resetError:
        "Hiba történt a jelszó visszaállítás során, kérjük próbáld újra.",
    },
    success: {
      register: "Sikeres regisztráció! Kérjük, ellenőrizd az email címedet.",
      reset: "Email elküldve a jelszó visszaállításához!",
    },
  },
  en: {
    login: {
      title: "Sign In",
      email: "Email",
      password: "Password",
      submit: "Sign In",
      noAccount: "Don't have an account? ",
      registerHere: "Register here",
      forgotPassword: "Forgot your password?",
    },
    register: {
      title: "Register",
      confirmPassword: "Confirm Password",
      submit: "Register",
      hasAccount: "Already have an account? ",
      loginHere: "Sign in here",
    },
    errors: {
      passwordMismatch: "The passwords do not match.",
      invalidPassword:
        "The password must contain at least 8 characters, including 1 uppercase letter and 1 number.",
      emailInUse: "This email address is already in use.",
      invalidCredentials:
        "The credentials are invalid. Please check the entered information.",
      userNotFound: "No account found with this email. Please register!",
      wrongPassword: "Incorrect password!",
      emailNotVerified:
        "The email address is not yet verified. Please check your inbox.",
      invalidEmail: "Please enter a valid email address!",
      authError: "An error occurred during sign-in. Please try again.",
      resetError: "An error occurred during password reset. Please try again.",
    },
    success: {
      register: "Registration successful! Please verify your email address.",
      reset: "Email sent for password reset!",
    },
  },
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [language] = useAtom(languageAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  // Kezeljük a redirect eredményt
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setUser(result.user);
          navigate("/");
        }
      } catch (error: any) {
        setError(texts[language].errors.authError);
        setShowModal(true);
      }
    };
    handleRedirectResult();
  }, [navigate, setUser, language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (isRegistering) {
      if (!passwordRegex.test(password)) {
        setError(texts[language].errors.invalidPassword);
        setShowModal(true);
        return;
      }
      if (password !== confirmPassword) {
        setError(texts[language].errors.passwordMismatch);
        setShowModal(true);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        await sendEmailVerification(userCredential.user);
        setSuccessMessage(texts[language].success.register);
        setRegistrationSuccess(true);
      } catch (error: any) {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setError(texts[language].errors.emailInUse);
        } else {
          setError(error.message);
        }
        setShowModal(true);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        if (!userCredential.user.emailVerified) {
          setError(texts[language].errors.emailNotVerified);
          setShowModal(true);
        } else {
          navigate("/");
        }
      } catch (error: any) {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setError(texts[language].errors.invalidCredentials);
        } else if (errorCode === "auth/user-not-found") {
          setError(texts[language].errors.userNotFound);
        } else if (errorCode === "auth/wrong-password") {
          setError(texts[language].errors.wrongPassword);
        } else {
          setError(error.message);
        }
        setShowModal(true);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      setError(texts[language].errors.authError);
      setShowModal(true);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      setError(texts[language].errors.authError);
      setShowModal(true);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      setError(texts[language].errors.authError);
      setShowModal(true);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.includes("@")) {
      setError(texts[language].errors.invalidEmail);
      setShowModal(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(texts[language].success.reset);
      setRegistrationSuccess(true);
    } catch (error: any) {
      setError(texts[language].errors.resetError);
      setShowModal(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {isRegistering
              ? texts[language].register.title
              : texts[language].login.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {registrationSuccess ? (
            <div className="flex flex-col items-center gap-4">
              <Envelope />
              <p className="text-green-500">{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">{texts[language].login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={texts[language].login.email}
                  className="mt-1"
                  required
                />
              </div>
              <div className="relative">
                <Label htmlFor="password">
                  {texts[language].login.password}
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={texts[language].login.password}
                  className="mt-1 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-9"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {isRegistering && (
                <div className="relative">
                  <Label htmlFor="confirmPassword">
                    {texts[language].register.confirmPassword}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={texts[language].register.confirmPassword}
                    className="mt-1 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-9"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
              >
                {isRegistering
                  ? texts[language].register.submit
                  : texts[language].login.submit}
              </Button>
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGoogleLogin}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <Circle className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleFacebookLogin}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGitHubLogin}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                <p>
                  {isRegistering
                    ? texts[language].register.hasAccount
                    : texts[language].login.noAccount}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-indigo-500 hover:underline"
                  >
                    {isRegistering
                      ? texts[language].register.loginHere
                      : texts[language].login.registerHere}
                  </button>
                </p>
                {!isRegistering && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-indigo-500 hover:underline"
                  >
                    {texts[language].login.forgotPassword}
                  </button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      {showModal && (
        <Modal message={error} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Login;
