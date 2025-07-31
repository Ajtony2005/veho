import React from "react";
import { useAtom } from "jotai"; // useAtom hook importálása
import { userAtom } from "../../util/atom"; // Az atom importálása
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";

const Data = () => {
  const [user, setUser] = useAtom(userAtom); // Jotai useAtom használata
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Hiba a kijelentkezés során:", error);
      });
  };

  return (
    <div className="data-container">
      <h1>User Data</h1>
      {user ? (
        <div>
          <p>
            <strong>User ID:</strong> {user.uid}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
          </p>
          {user.displayName && (
            <p>
              <strong>Display Name:</strong> {user.displayName}
            </p>
          )}
          {user.photoURL && (
            <div>
              <strong>Profile Picture:</strong>
              <br />
              <img src={user.photoURL} alt="Profile" width="100" />
            </div>
          )}
          {user.phoneNumber && (
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
          )}
          <p>
            <strong>Provider ID:</strong> {user.providerId}
          </p>
          <p>
            <strong>Account Created:</strong> {user.creationTime}
          </p>
          <p>
            <strong>Last Sign-in:</strong> {user.lastSignInTime}
          </p>

          {/* Kijelentkezési gomb */}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <p>Nincs elérhető felhasználói adat. Kérlek, jelentkezz be.</p>
      )}
    </div>
  );
};

export default Data;
