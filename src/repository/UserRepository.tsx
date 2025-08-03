import { useAtom } from "jotai";
import { auth, db } from "../lib/firebase";
import { userAtom } from "../store/userAtom";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  User as FirebaseUser,
  updateProfile,
  deleteUser as deleteFirebaseUser,
  linkWithCredential,
  AuthCredential,
} from "firebase/auth";
import { User } from "../Data/User";

export const useUserRepository = () => {
  const [user, setUser] = useAtom(userAtom);

  // Find user by email (handles null emails)
  const findUserByEmail = async (
    email: string | null
  ): Promise<User | null> => {
    try {
      if (!email) {
        console.log("No email provided to findUserByEmail");
        return null;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = { ...userDoc.data(), uid: userDoc.id } as User;
        console.log("Found existing user by email:", userData);
        return userData;
      }
      return null;
    } catch (error: any) {
      console.error("Error finding user by email:", error);
      return null;
    }
  };

  // Enhanced linkCredentialToCurrentUser implementation
  const linkCredentialToCurrentUser = async (
    credential: AuthCredential,
    provider: string
  ): Promise<User> => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }

    try {
      console.log(
        `Linking ${provider} credential to current user:`,
        auth.currentUser.uid
      );

      // Link the credential to the current user
      const linkedUser = await linkWithCredential(auth.currentUser, credential);

      console.log("Successfully linked credential, updating Firestore...");

      // Get current user data from Firestore
      const currentUserData = await getUserDataFromFirestore(
        auth.currentUser.uid
      );

      if (!currentUserData) {
        throw new Error("Current user data not found in Firestore");
      }

      // Update the providers array and linked accounts
      const updatedProviders = currentUserData.providers
        ? [...new Set([...currentUserData.providers, provider])]
        : [provider];

      const updatedLinkedAccounts = {
        ...currentUserData.linkedAccounts,
        [provider]: {
          uid: linkedUser.user.uid,
          email: linkedUser.user.email,
          displayName: linkedUser.user.displayName,
          photoURL: linkedUser.user.photoURL,
        },
      };

      const updatedUserData = {
        ...currentUserData,
        providers: updatedProviders,
        linkedAccounts: updatedLinkedAccounts,
        // Update display info if not set or if new provider has better info
        displayName: currentUserData.displayName || linkedUser.user.displayName,
        photoURL: currentUserData.photoURL || linkedUser.user.photoURL,
        // Update email if existing user doesn't have one but new provider does
        email: currentUserData.email || linkedUser.user.email,
        lastLoginAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save updated data to Firestore
      await updateUserDataInFirestore(updatedUserData);

      console.log(`Successfully linked ${provider} to current user`);
      return updatedUserData;
    } catch (error: any) {
      console.error("Error linking credential:", error);

      // Provide more specific error messages
      if (error.code === "auth/credential-already-in-use") {
        throw new Error("This account is already linked to another user.");
      } else if (error.code === "auth/provider-already-linked") {
        throw new Error("This provider is already linked to your account.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        throw new Error(
          "An account already exists with the same email but different sign-in credentials."
        );
      }

      throw error;
    }
  };

  // Enhanced updateUserDataInFirestore implementation with settings support
  const updateUserDataInFirestore = async (
    data: Partial<User>
  ): Promise<void> => {
    if (!auth.currentUser) {
      throw new Error("Nincs bejelentkezett felhasználó");
    }

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      // Get current user data first to preserve existing data
      const currentUserDoc = await getDoc(userRef);
      const existingData = currentUserDoc.exists() ? currentUserDoc.data() : {};

      // Helper function to safely handle undefined values
      const safeValue = (
        newVal: any,
        existingVal: any,
        defaultVal: any = null
      ) => {
        if (newVal !== undefined) return newVal;
        if (existingVal !== undefined) return existingVal;
        return defaultVal;
      };

      // Merge data carefully, preserving existing values and avoiding undefined
      const userData = {
        uid: auth.currentUser.uid,
        email: safeValue(
          auth.currentUser.email || data.email,
          existingData.email,
          null
        ),
        displayName: safeValue(
          auth.currentUser.displayName || data.displayName,
          existingData.displayName,
          null
        ),
        photoURL: safeValue(
          auth.currentUser.photoURL || data.photoURL,
          existingData.photoURL,
          null
        ),
        role: safeValue(data.role, existingData.role, "user"),
        isActive: safeValue(data.isActive, existingData.isActive, true),
        language: safeValue(data.language, existingData.language, "hu"),
        ideasCount: safeValue(data.ideasCount, existingData.ideasCount, 0),
        createdAt: safeValue(
          null,
          existingData.createdAt,
          new Date().toISOString()
        ),
        updatedAt: new Date().toISOString(),
        lastLoginAt: safeValue(
          data.lastLoginAt,
          existingData.lastLoginAt,
          new Date().toISOString()
        ),
        timezone: safeValue(
          data.timezone,
          existingData.timezone,
          Intl.DateTimeFormat().resolvedOptions().timeZone
        ),
        // Handle arrays and objects safely
        providers: data.providers || existingData.providers || [],
        linkedAccounts:
          data.linkedAccounts || existingData.linkedAccounts || {},
        socialLinks: data.socialLinks || existingData.socialLinks || {},
        // Handle settings object safely
        settings: {
          ...existingData.settings,
          ...data.settings,
        },
        // Handle bio specifically to avoid undefined
        bio: safeValue(data.bio, existingData.bio, null),
        primaryProvider: safeValue(
          data.primaryProvider,
          existingData.primaryProvider,
          null
        ),
      };

      // Remove any undefined values (extra safety)
      const cleanUserData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined)
      );

      await setDoc(userRef, cleanUserData, { merge: true });
      console.log(
        "User data updated successfully in Firestore:",
        cleanUserData
      );

      // Update the user atom with the new data
      setUser(cleanUserData as User);
    } catch (error: any) {
      console.error("Firestore write error:", error);
      throw new Error(`Firestore írási hiba: ${error.message}`);
    }
  };

  // ... rest of the methods remain the same but I'll include the key ones for completeness

  const getAvailableProvidersForLinking = (): string[] => {
    const allProviders = ["google", "facebook", "github"];
    const userProviders = user?.providers || [];
    return allProviders.filter((provider) => !userProviders.includes(provider));
  };

  const findUserByUid = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = { ...userDoc.data(), uid } as User;
        console.log("Found existing user by UID:", userData);
        return userData;
      }
      return null;
    } catch (error: any) {
      console.error("Error finding user by UID:", error);
      return null;
    }
  };

  const canLinkProvider = (provider: string): boolean => {
    return !user?.providers?.includes(provider.toLowerCase());
  };

  const linkSocialAccount = async (
    existingUser: User,
    provider: string,
    newUserData: any
  ): Promise<User> => {
    try {
      console.log(
        `Linking ${provider} account to existing user:`,
        existingUser.uid
      );

      const updatedProviders = existingUser.providers
        ? [...new Set([...existingUser.providers, provider])]
        : [provider];

      const updatedLinkedAccounts = {
        ...existingUser.linkedAccounts,
        [provider]: {
          uid: newUserData.uid,
          email: newUserData.email,
          displayName: newUserData.displayName,
          photoURL: newUserData.photoURL,
        },
      };

      const updatedUserData = {
        ...existingUser,
        providers: updatedProviders,
        linkedAccounts: updatedLinkedAccounts,
        displayName: existingUser.displayName || newUserData.displayName,
        photoURL: existingUser.photoURL || newUserData.photoURL,
        email: existingUser.email || newUserData.email,
        lastLoginAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await updateUserDataInFirestore(updatedUserData);

      console.log(`Successfully linked ${provider} account to existing user`);
      return updatedUserData;
    } catch (error: any) {
      console.error("Error linking social account:", error);
      throw error;
    }
  };

  const createUserWithProvider = async (
    firebaseUser: FirebaseUser,
    provider: string,
    additionalData?: Partial<User>
  ): Promise<User> => {
    try {
      console.log(
        `Creating new user with ${provider} provider:`,
        firebaseUser.uid
      );

      const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || additionalData?.email || null,
        displayName:
          firebaseUser.displayName ||
          additionalData?.displayName ||
          `${provider} User`,
        photoURL: firebaseUser.photoURL,
        role: "user",
        isActive: true,
        language: "hu",
        ideasCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        providers: [provider],
        primaryProvider: provider,
        linkedAccounts: {
          [provider]: {
            uid: firebaseUser.uid,
            email: firebaseUser.email || additionalData?.email || null,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          },
        },
        settings: {
          profileVisibility: "public",
          showEmail: false,
          showLastSeen: true,
          allowMessages: true,
          emailNotifications: true,
          pushNotifications: true,
          ideaUpdates: true,
          comments: true,
          mentions: true,
          autoSave: true,
          sessionTimeout: 30,
          twoFactorAuth: false,
        },
        ...additionalData,
      };

      await updateUserDataInFirestore(userData);
      console.log(`Successfully created new user with ${provider} provider`);
      return userData;
    } catch (error: any) {
      console.error("Error creating user with provider:", error);
      throw error;
    }
  };

  const handleUserAuthentication = async (
    firebaseUser: FirebaseUser,
    provider: string,
    additionalData?: Partial<User>
  ): Promise<User> => {
    try {
      console.log(
        `Handling authentication for UID: ${firebaseUser.uid}, email: ${firebaseUser.email}, provider: ${provider}`
      );

      let existingUser = await findUserByUid(firebaseUser.uid);

      if (!existingUser && firebaseUser.email) {
        existingUser = await findUserByEmail(firebaseUser.email);

        if (existingUser && existingUser.uid !== firebaseUser.uid) {
          console.error(
            `Email ${firebaseUser.email} is already associated with another account (UID: ${existingUser.uid})`
          );
          throw new Error(
            `This email address (${firebaseUser.email}) is already in use by another account. Please use a different email or log in to the existing account.`
          );
        }
      }

      if (existingUser) {
        console.log(
          "Found existing user, checking if provider is already linked"
        );

        if (existingUser.providers?.includes(provider)) {
          const updatedData = {
            ...existingUser,
            lastLoginAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            email: existingUser.email || firebaseUser.email,
          };
          await updateUserDataInFirestore(updatedData);
          console.log("Updated existing user login time");
          return updatedData;
        } else {
          console.log(`Linking ${provider} to existing account`);
          return await linkSocialAccount(existingUser, provider, firebaseUser);
        }
      } else {
        console.log("No existing user found, creating new account");
        return await createUserWithProvider(
          firebaseUser,
          provider,
          additionalData
        );
      }
    } catch (error: any) {
      console.error("Error handling user authentication:", error);
      throw error;
    }
  };

  const extractEmailFromProvider = async (
    result: any,
    provider: string
  ): Promise<string | null> => {
    let email = result.user.email;

    console.log(`Extracting email from ${provider}:`, {
      directEmail: result.user.email,
      providerData: result.user.providerData,
      tokenResponse: result._tokenResponse,
    });

    if (!email && result.user.providerData.length > 0) {
      const providerData = result.user.providerData.find((p: any) => p.email);
      email = providerData?.email || null;
      console.log("Email from provider data:", email);
    }

    if (!email && provider.toLowerCase() === "github" && result.credential) {
      try {
        console.log("GitHub email not available in auth response");
      } catch (apiError) {
        console.log("Failed to fetch GitHub email from API:", apiError);
      }
    }

    if (!email && result._tokenResponse) {
      const tokenResponse = result._tokenResponse as any;
      email = tokenResponse.email || tokenResponse.emailAddress || null;
      console.log("Email from token response:", email);
    }

    console.log(`Final extracted email for ${provider}:`, email);
    return email;
  };

  const getUser = async (): Promise<User | null> => {
    if (!auth.currentUser) return null;
    setUser(auth.currentUser as User);
    return auth.currentUser as User;
  };

  const updateUserProfile = async (
    data: Partial<
      Pick<User, "displayName" | "photoURL" | "bio" | "socialLinks">
    >
  ): Promise<void> => {
    if (!auth.currentUser) throw new Error("Nincs bejelentkezett felhasználó");
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      await updateUserDataInFirestore({
        ...data,
        updatedAt: new Date().toISOString(),
      });

      console.log("Profile updated successfully");
    } catch (error: any) {
      console.error("Profil frissítési hiba:", error);
      throw new Error(`Hiba a profil frissítése során: ${error.message}`);
    }
  };

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

  const deleteUser = async (): Promise<void> => {
    if (!auth.currentUser) throw new Error("Nincs bejelentkezett felhasználó");
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await deleteDoc(userRef);
      await deleteFirebaseUser(auth.currentUser);
      setUser(null);
    } catch (error: any) {
      console.error("Felhasználó törlési hiba:", error);
      throw new Error(`Hiba a felhasználó törlése során: ${error.message}`);
    }
  };

  return {
    getUser,
    updateUserProfile,
    getUserDataFromFirestore,
    updateUserDataInFirestore,
    deleteUser,
    findUserByEmail,
    findUserByUid,
    linkSocialAccount,
    createUserWithProvider,
    handleUserAuthentication,
    extractEmailFromProvider,
    linkCredentialToCurrentUser,
    getAvailableProvidersForLinking,
    canLinkProvider,
  };
};
