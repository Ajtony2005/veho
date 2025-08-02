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
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { Facebook, Github, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { auth } from "../lib/firebase";
import { languageAtom } from "../store/languageAtom";
import { userAtom } from "../store/userAtom";
import { useUserRepository } from "../repository/UserRepository";
import { FaGoogle } from "react-icons/fa";

// Enhanced texts with account linking messages
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
      invalidCredentials: "A hitelesítési adatok érvénytelenek.",
      userNotFound:
        "Még nincs fiókod ezzel az email címmel. Kérjük, regisztrálj!",
      wrongPassword: "Helytelen jelszó!",
      emailNotVerified:
        "Az email cím még nincs megerősítve. Kérjük, ellenőrizze a beérkezett leveleket.",
      invalidEmail: "Kérjük, add meg a helyes email címed!",
      authError: "Hiba a bejelentkezés során, kérjük próbáld újra.",
      resetError:
        "Hiba történt a jelszó visszaállítás során, kérjük próbáld újra.",
      popupBlocked:
        "A felugró ablak blokkolva van. Kérjük engedélyezd a felugró ablakokat.",
      popupClosed: "A bejelentkezési ablak bezárult. Kérjük próbáld újra.",
    },
    success: {
      register: "Sikeres regisztráció! Kérjük, ellenőrizd az email címedet.",
      login: "Sikeres bejelentkezés! Átirányítás...",
      reset: "Email elküldve a jelszó visszaállításához!",
      accountLinked:
        "Fiók sikeresen összekapcsolva! Most már több módon is bejelentkezhetsz.",
    },
    accountLinking: {
      existingAccount: "Már van fiókod ezzel az email címmel",
      linking: "Fiók összekapcsolása...",
      linkedSuccessfully: "Fiók sikeresen összekapcsolva",
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
      invalidCredentials: "The credentials are invalid.",
      userNotFound: "No account found with this email. Please register!",
      wrongPassword: "Incorrect password!",
      emailNotVerified:
        "The email address is not yet verified. Please check your inbox.",
      invalidEmail: "Please enter a valid email address!",
      authError: "An error occurred during sign-in. Please try again.",
      resetError: "An error occurred during password reset. Please try again.",
      popupBlocked: "Popup blocked. Please allow popups for this site.",
      popupClosed: "Sign-in window was closed. Please try again.",
    },
    success: {
      register: "Registration successful! Please verify your email address.",
      login: "Login successful! Redirecting...",
      reset: "Email sent for password reset!",
      accountLinked:
        "Account successfully linked! You can now sign in with multiple methods.",
    },
    accountLinking: {
      existingAccount: "You already have an account with this email",
      linking: "Linking account...",
      linkedSuccessfully: "Account successfully linked",
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
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [language] = useAtom(languageAtom);
  const [user, setUser] = useAtom(userAtom);
  const [linkingProvider, setLinkingProvider] = useState<string | null>(null);
  const [pendingCredential, setPendingCredential] = useState<any>(null);
  const navigate = useNavigate();
  const { handleUserAuthentication, extractEmailFromProvider } =
    useUserRepository();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const userData = await handleUserAuthentication(
            result.user,
            "redirect"
          );
          setUser(userData);
          setSuccessMessage(texts[language].success.login);
          setTimeout(() => navigate("/"), 1500);
        }
      } catch (error: any) {
        setError(texts[language].errors.authError);
        setIsLoading(false);
      }
    };
    handleRedirectResult();
  }, [navigate, setUser, language, handleUserAuthentication]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (isRegistering) {
      if (!passwordRegex.test(password)) {
        setError(texts[language].errors.invalidPassword);
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError(texts[language].errors.passwordMismatch);
        setIsLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);

        // Handle user authentication with account linking
        const userData = await handleUserAuthentication(
          userCredential.user,
          "email"
        );
        setUser(userData);

        setSuccessMessage(texts[language].success.register);
        setIsLoading(false);
      } catch (error: any) {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setError(texts[language].errors.emailInUse);
        } else if (errorCode === "auth/invalid-email") {
          setError(texts[language].errors.invalidEmail);
        } else {
          setError(texts[language].errors.authError);
        }
        setIsLoading(false);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (!userCredential.user.emailVerified) {
          setError(texts[language].errors.emailNotVerified);
          setIsLoading(false);
        } else {
          // Handle user authentication with account linking
          const userData = await handleUserAuthentication(
            userCredential.user,
            "email"
          );
          setUser(userData);

          setSuccessMessage(texts[language].success.login);
          setTimeout(() => navigate("/"), 1500);
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
          setError(texts[language].errors.authError);
        }
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setError("");
      setSocialLoading(provider);

      let authProvider;
      switch (provider) {
        case "Google":
          authProvider = new GoogleAuthProvider();
          authProvider.addScope("profile");
          authProvider.addScope("email");
          authProvider.setCustomParameters({
            prompt: "select_account",
          });
          break;
        case "Facebook":
          authProvider = new FacebookAuthProvider();
          authProvider.addScope("email");
          authProvider.addScope("public_profile");
          break;
        case "GitHub":
          authProvider = new GithubAuthProvider();
          authProvider.addScope("user:email");
          authProvider.addScope("read:user");
          break;
        default:
          throw new Error("Érvénytelen provider");
      }

      // Popup authentikáció használata
      const result = await signInWithPopup(auth, authProvider);

      if (result.user) {
        console.log("Social login result:", {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
          providerData: result.user.providerData,
        });

        // Extract email using enhanced method
        const extractedEmail = await extractEmailFromProvider(result, provider);

        console.log(`Extracted email from ${provider}:`, extractedEmail);

        // Create user object with extracted email
        const userWithEmail = {
          ...result.user,
          email: extractedEmail || result.user.email,
        };

        // Handle user authentication with account linking
        try {
          const userData = await handleUserAuthentication(
            userWithEmail as any,
            provider.toLowerCase(),
            {
              provider: provider.toLowerCase(),
              lastLoginAt: new Date().toISOString(),
              email: extractedEmail || result.user.email,
            }
          );

          setUser(userData);

          // Show appropriate success message
          if (userData.providers && userData.providers.length > 1) {
            setSuccessMessage(texts[language].success.accountLinked);
          } else {
            setSuccessMessage(texts[language].success.login);
          }

          setTimeout(() => navigate("/"), 1500);
        } catch (firestoreError) {
          console.warn(
            "Firestore operation failed, but login succeeded:",
            firestoreError
          );

          // Fallback: set user directly and continue
          setUser(userWithEmail as any);
          setSuccessMessage(texts[language].success.login);
          setTimeout(() => navigate("/"), 1500);
        }
      }
    } catch (error: any) {
      console.error("Social login error:", error);

      const errorCode = error.code;
      if (errorCode === "auth/popup-blocked") {
        setError(texts[language].errors.popupBlocked);
      } else if (errorCode === "auth/popup-closed-by-user") {
        setError(texts[language].errors.popupClosed);
      } else if (errorCode === "auth/cancelled-popup-request") {
        setError("");
      } else if (errorCode === "auth/unauthorized-domain") {
        setError(
          "Unauthorized domain. Please check your Firebase configuration."
        );
      } else if (
        errorCode === "auth/account-exists-with-different-credential"
      ) {
        // Store the credential for later linking
        setPendingCredential(error.credential);
        setLinkingProvider(provider);

        const existingEmail = error.customData?.email || error.email;
        setError(
          language === "hu"
            ? `Már létezik fiók ezzel az email címmel (${existingEmail}). Jelentkezz be először a másik módszerrel, majd a Profilban kapcsolhatod össze a fiókokat.`
            : `An account already exists with this email (${existingEmail}). Please sign in with your existing method first, then link accounts in your Profile.`
        );
      } else {
        setError(texts[language].errors.authError);
      }
    } finally {
      setSocialLoading(null);
    }
  };
  const handleForgotPassword = async () => {
    if (!email.includes("@")) {
      setError(texts[language].errors.invalidEmail);
      return;
    }
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(texts[language].success.reset);
      setIsLoading(false);
    } catch (error: any) {
      setError(texts[language].errors.resetError);
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setSuccessMessage("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Subtle animated background elements for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main container with glassmorphism */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-sm"></div>
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/80 to-primary-600/80 rounded-full mb-4 shadow-lg backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isRegistering
                ? texts[language].register.title
                : texts[language].login.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-600 mx-auto rounded-full"></div>
          </div>

          {/* Success/Error Messages */}
          {(error || successMessage) && (
            <div
              className={`mb-6 p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                error
                  ? "bg-destructive/20 border-destructive/30 text-red-200"
                  : "bg-secondary/20 border-secondary/30 text-green-200"
              }`}
            >
              <p className="text-sm text-center font-medium">
                {error || successMessage}
              </p>
            </div>
          )}

          {successMessage && !error ? (
            <div className="flex flex-col items-center gap-6 py-8">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary/80 to-accent/80 rounded-full flex items-center justify-center animate-pulse backdrop-blur-sm">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <p className="text-white/90 text-center leading-relaxed">
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label className="text-white/90 text-sm font-medium">
                  {texts[language].login.email}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={texts[language].login.email}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-primary/60 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label className="text-white/90 text-sm font-medium">
                  {texts[language].login.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={texts[language].login.password}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-primary/60 transition-all duration-300 backdrop-blur-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/90 hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field (Register only) */}
              {isRegistering && (
                <div className="space-y-2 transition-all duration-300">
                  <Label className="text-white/90 text-sm font-medium">
                    {texts[language].register.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={texts[language].register.confirmPassword}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:border-primary/60 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/90 hover:bg-white/10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary/80 to-primary-600/80 hover:from-primary-600/90 hover:to-primary-700/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : isRegistering ? (
                  texts[language].register.submit
                ) : (
                  texts[language].login.submit
                )}
              </Button>

              {/* Social Login */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/70">
                    {language === "hu"
                      ? "vagy folytasd ezzel"
                      : "or continue with"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === "Google" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <FaGoogle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === "Facebook" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={socialLoading !== null}
                >
                  {socialLoading === "GitHub" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  )}
                </Button>
              </div>

              {/* Forgot Password */}
              {!isRegistering && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-primary hover:text-primary-600 text-sm transition-colors duration-300"
                  >
                    {texts[language].login.forgotPassword}
                  </button>
                </div>
              )}

              {/* Toggle Form */}
              <div className="text-center pt-4 border-t border-white/30">
                <span className="text-white/70 text-sm">
                  {isRegistering
                    ? texts[language].register.hasAccount
                    : texts[language].login.noAccount}
                </span>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-primary hover:text-primary-600 text-sm font-medium ml-1 transition-colors duration-300"
                >
                  {isRegistering
                    ? texts[language].register.loginHere
                    : texts[language].login.registerHere}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
