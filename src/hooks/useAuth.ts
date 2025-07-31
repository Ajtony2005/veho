import { useEffect } from "react";
import { useAtom } from "jotai";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { userAtom } from "../store/userAtom";

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]);

  return user;
}
