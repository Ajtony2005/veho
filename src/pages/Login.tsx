import { useState } from "react";
import { useAtom } from "jotai";
import {
  Circle,
  Facebook,
  Github,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { languageAtom } from "../store/languageAtom";

// Texts
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
      invalidCredentials: "A hitelesítési adatok érvénytelenek.",
      invalidEmail: "Kérjük, add meg a helyes email címed!",
    },
    success: {
      register: "Sikeres regisztráció! Üdvözlünk!",
      login: "Sikeres bejelentkezés! Átirányítás...",
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
      invalidCredentials: "The credentials are invalid.",
      invalidEmail: "Please enter a valid email address!",
    },
    success: {
      register: "Registration successful! Welcome!",
      login: "Login successful! Redirecting...",
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
  const [isLoading, setIsLoading] = useState(false);
  const [language] = useAtom(languageAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
      setSuccessMessage(texts[language].success.register);
    } else {
      if (email && password) {
        setSuccessMessage(texts[language].success.login);
        console.log("Login attempt:", { email, password });
      } else {
        setError(texts[language].errors.invalidCredentials);
      }
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
  };

  const handleForgotPassword = () => {
    if (!email.includes("@")) {
      setError(texts[language].errors.invalidEmail);
      return;
    }
    setSuccessMessage(texts[language].success.reset);
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
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <Circle className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  onClick={() => handleSocialLogin("GitHub")}
                >
                  <Github className="w-4 h-4" />
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
