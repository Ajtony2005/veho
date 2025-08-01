import { useAtom } from "jotai";
import { auth, db } from "../lib/firebase";
import { userAtom } from "../store/userAtom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import {
  User as FirebaseUser,
  updateProfile,
  deleteUser as deleteFirebaseUser,
} from "firebase/auth";
import { User } from "../Data/User";

export const useUserRepository = () => {
  const [user, setUser] = useAtom(userAtom);

  // Felhasználó adatainak lekérdezése az auth-ból
  const getUser = async (): Promise<User | null> => {
    if (!auth.currentUser) return null;
    setUser(auth.currentUser);
    return auth.currentUser as User;
  };

  // Felhasználói profil frissítése (pl. displayName)
  const updateUserProfile = async (displayName: string): Promise<void> => {
    if (!auth.currentUser) throw new Error("Nincs bejelentkezett felhasználó");
    try {
      await updateProfile(auth.currentUser, { displayName });
      setUser({ ...auth.currentUser, displayName } as User);
      // Frissítjük a Firestore-ban is
      await updateUserDataInFirestore({ displayName });
    } catch (error: any) {
      throw new Error(`Hiba a profil frissítése során: ${error.message}`);
    }
  };

  // Felhasználói adatok lekérdezése a Firestore-ból
  const getUserDataFromFirestore = async (
    uid: string
  ): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return { ...userDoc.data(), uid } as User;
      }
      return null;
    } catch (error: any) {
      console.error("Firestore read error:", error);
      throw new Error(
        `Hiba a Firestore adatok lekérdezése során: ${error.message}`
      );
    }
  };

  // Felhasználói adatok frissítése a Firestore-ban
  const updateUserDataInFirestore = async (
    data: Partial<User>
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("Nincs bejelentkezett felhasználó");
    }

    try {
      // Wait a bit to ensure auth state is fully established
      await new Promise((resolve) => setTimeout(resolve, 100));

      const userRef = doc(db, "users", currentUser.uid);
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userRef, userData, { merge: true });
      console.log("User data updated successfully in Firestore");

      // Update local state
      setUser({ ...user, ...userData } as User);
    } catch (error: any) {
      console.error("Firestore write error:", error);
      // Don't throw error for Firestore issues, just log them
      // This allows social login to succeed even if Firestore write fails
      console.warn(`Figyelmeztetés: Firestore írási hiba: ${error.message}`);
    }
  };

  // Felhasználó törlése
  const deleteUser = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("Nincs bejelentkezett felhasználó");
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await deleteDoc(userRef);
      await deleteFirebaseUser(auth.currentUser);
      setUser(null);
    } catch (error: any) {
      throw new Error(`Hiba a felhasználó törlése során: ${error.message}`);
    }
  };

  return {
    getUser,
    updateUserProfile,
    getUserDataFromFirestore,
    updateUserDataInFirestore,
    deleteUser,
  };
};
