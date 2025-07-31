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
import "./styles/App.css";

function App() {
  const [user] = useAtom(userAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/share-idea" element={<ShareIdea />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/data"
          element={user ? <Data /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
