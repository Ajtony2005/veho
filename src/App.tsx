import { useAtom } from "jotai";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userAtom } from "./store/userAtom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Data from "./pages/Data";
import Ideas from "./pages/Ideas";
import ShareIdea from "./pages/ShareIdea";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Header from "./components/Header";
import Settings from "./pages/Settings";

function App() {
  const [user] = useAtom(userAtom);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic gradient background with animated elements */}
      <div className="fixed inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"></div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/6 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Moving particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      </div>

      {/* Main app content */}
      <div className="relative z-10">
        <BrowserRouter>
          {/* Header with backdrop blur */}
          <div className="relative z-50">
            <Header />
          </div>

          {/* Main content area */}
          <main className="relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/share-idea" element={<ShareIdea />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/data"
                element={user ? <Data /> : <Navigate to="/login" replace />}
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 right-8 z-40 pointer-events-none">
        <div className="w-2 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
          <div className="w-full h-1/3 bg-gradient-to-b from-primary to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
