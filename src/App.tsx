import { useAtom } from "jotai"; // useAtom hook importálása
import { userAtom } from "./util/atom"; // az atom importálása
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Navigate a redirecthez
import Login from "./Login/tsx/login";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "./Data/tsx/Data";
import "./App.css"; // Alkalmazás stílusok importálása

function App() {
  const [user] = useAtom(userAtom);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/data"
          // element={user ? <Data /> : <Navigate to="/login" replace />}
          element={<Data />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
