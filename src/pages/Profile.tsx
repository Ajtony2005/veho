import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useAuth } from "../hooks/useAuth";
import { languageAtom } from "../store/languageAtom";
import { userAtom } from "../store/userAtom";
import { useUserRepository } from "../repository/UserRepository";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Link as LinkIcon,
  Shield,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Camera,
  Plus,
  Check,
  Clock,
  Settings,
  LogOut,
  Trash2,
  AlertTriangle,
  Sparkles,
  Crown,
  Award,
  Activity,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  AuthCredential,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { User as UserType } from "../Data/User";

// Enhanced texts with more modern features
const texts = {
  hu: {
    title: "Profil",
    subtitle: "Kezeld a fiókod és személyes adataid",
    personalInfo: "Személyes Információk",
    accountSettings: "Fiók Beállítások",
    linkedAccounts: "Összekapcsolt Fiókok",
    securitySettings: "Biztonsági Beállítások",
    quickActions: "Gyors Műveletek",
    email: "Email",
    displayName: "Megjelenítendő Név",
    bio: "Bemutatkozás",
    timezone: "Időzóna",
    language: "Nyelv",
    role: "Szerep",
    createdAt: "Regisztráció dátuma",
    lastLoginAt: "Utolsó bejelentkezés",
    ideasCount: "Ötletek száma",
    socialLinks: "Közösségi média linkek",
    providers: "Bejelentkezési módszerek",
    editProfile: "Profil szerkesztése",
    saveChanges: "Változtatások mentése",
    cancel: "Mégse",
    notSignedIn: "Kérjük, jelentkezz be a profil megtekintéséhez.",
    signIn: "Bejelentkezés",
    signOut: "Kijelentkezés",
    linkAccount: "Új fiók összekapcsolása",
    unlinkAccount: "Összekapcsolás megszüntetése",
    linkProvider: "Összekapcsolás",
    linked: "Összekapcsolva",
    unlink: "Leválasztás",
    linkedSuccessfully: "Fiók sikeresen összekapcsolva!",
    unlinkedSuccessfully: "Összekapcsolás sikeresen megszüntetve!",
    profileUpdated: "Profil sikeresen frissítve!",
    status: {
      active: "Aktív",
      inactive: "Inaktív",
      verified: "Megerősített",
      unverified: "Nem megerősített",
    },
    roles: {
      user: "Felhasználó",
      admin: "Adminisztrátor",
      moderator: "Moderátor",
    },
    stats: {
      memberSince: "Tag ekkor óta",
      totalIdeas: "Összes ötlet",
      lastActive: "Utoljára aktív",
      accountStatus: "Fiók állapota",
    },
    errors: {
      linkingFailed: "Fiók összekapcsolása sikertelen.",
      unlinkingFailed: "Összekapcsolás megszüntetése sikertelen.",
      updateFailed: "Profil frissítés sikertelen.",
      signOutFailed: "Kijelentkezés sikertelen.",
    },
    placeholders: {
      displayName: "Add meg a neved...",
      bio: "Írj magadról, érdeklődési köröd, tapasztalataid...",
      github: "GitHub felhasználónév",
      linkedin: "LinkedIn profil URL",
      twitter: "Twitter felhasználónév",
      facebook: "Facebook profil URL",
    },
    confirmations: {
      unlinkProvider:
        "Biztosan le szeretnéd választani ezt a bejelentkezési módot?",
      signOut: "Biztosan ki szeretnél jelentkezni?",
    },
  },
  en: {
    title: "Profile",
    subtitle: "Manage your account and personal information",
    personalInfo: "Personal Information",
    accountSettings: "Account Settings",
    linkedAccounts: "Linked Accounts",
    securitySettings: "Security Settings",
    quickActions: "Quick Actions",
    email: "Email",
    displayName: "Display Name",
    bio: "Bio",
    timezone: "Timezone",
    language: "Language",
    role: "Role",
    createdAt: "Registration Date",
    lastLoginAt: "Last Login",
    ideasCount: "Ideas Count",
    socialLinks: "Social Media Links",
    providers: "Sign-in Methods",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    notSignedIn: "Please sign in to view your profile.",
    signIn: "Sign In",
    signOut: "Sign Out",
    linkAccount: "Link New Account",
    unlinkAccount: "Unlink Account",
    linkProvider: "Link",
    linked: "Linked",
    unlink: "Unlink",
    linkedSuccessfully: "Account linked successfully!",
    unlinkedSuccessfully: "Account unlinked successfully!",
    profileUpdated: "Profile updated successfully!",
    status: {
      active: "Active",
      inactive: "Inactive",
      verified: "Verified",
      unverified: "Unverified",
    },
    roles: {
      user: "User",
      admin: "Administrator",
      moderator: "Moderator",
    },
    stats: {
      memberSince: "Member since",
      totalIdeas: "Total ideas",
      lastActive: "Last active",
      accountStatus: "Account status",
    },
    errors: {
      linkingFailed: "Failed to link account.",
      unlinkingFailed: "Failed to unlink account.",
      updateFailed: "Failed to update profile.",
      signOutFailed: "Failed to sign out.",
    },
    placeholders: {
      displayName: "Enter your name...",
      bio: "Tell us about yourself, your interests, experiences...",
      github: "GitHub username",
      linkedin: "LinkedIn profile URL",
      twitter: "Twitter username",
      facebook: "Facebook profile URL",
    },
    confirmations: {
      unlinkProvider: "Are you sure you want to unlink this sign-in method?",
      signOut: "Are you sure you want to sign out?",
    },
  },
};

function Profile() {
  const [language] = useAtom(languageAtom);
  const [user, setUser] = useAtom(userAtom);
  const firebaseUser = useAuth();
  const {
    updateUserProfile,
    getUserDataFromFirestore,
    canLinkProvider,
    linkCredentialToCurrentUser,
  } = useUserRepository();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firestoreUser, setFirestoreUser] = useState<UserType | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  // Load user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (firebaseUser?.uid) {
        try {
          const userData = await getUserDataFromFirestore(firebaseUser.uid);
          if (userData) {
            setFirestoreUser(userData);
            setFormData({
              displayName: userData.displayName || "",
              bio: userData.bio || "",
              socialLinks: {
                github: userData.socialLinks?.github || "",
                linkedin: userData.socialLinks?.linkedin || "",
                twitter: userData.socialLinks?.twitter || "",
                facebook: userData.socialLinks?.facebook || "",
              },
            });
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      }
    };

    loadUserData();
  }, [firebaseUser, getUserDataFromFirestore]);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("socialLinks.")) {
      const socialField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSaveProfile = async () => {
    if (!firebaseUser) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateUserProfile({
        displayName: formData.displayName,
        bio: formData.bio,
        socialLinks: formData.socialLinks,
      });

      // Reload user data
      const updatedUserData = await getUserDataFromFirestore(firebaseUser.uid);
      if (updatedUserData) {
        setFirestoreUser(updatedUserData);
      }

      setSuccessMessage(texts[language].profileUpdated);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(texts[language].errors.updateFailed);
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkProvider = async (provider: string) => {
    if (!canLinkProvider(provider)) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let authProvider;
      switch (provider) {
        case "google":
          authProvider = new GoogleAuthProvider();
          authProvider.addScope("profile");
          authProvider.addScope("email");
          break;
        case "facebook":
          authProvider = new FacebookAuthProvider();
          authProvider.addScope("email");
          authProvider.addScope("public_profile");
          break;
        case "github":
          authProvider = new GithubAuthProvider();
          authProvider.addScope("user:email");
          authProvider.addScope("read:user");
          break;
        default:
          throw new Error("Invalid provider");
      }

      try {
        // First, try normal popup sign-in
        const result = await signInWithPopup(auth, authProvider);

        if (result.credential) {
          // If successful, link the credential directly
          await linkCredentialToCurrentUser(result.credential, provider);

          // Reload user data
          const updatedUserData = await getUserDataFromFirestore(
            firebaseUser!.uid
          );
          if (updatedUserData) {
            setFirestoreUser(updatedUserData);
          }

          setSuccessMessage(texts[language].linkedSuccessfully);
        }
      } catch (popupError: any) {
        console.log("Popup error:", popupError);
        console.log("Error code:", popupError.code);
        console.log("Error message:", popupError.message);

        if (
          popupError.code === "auth/account-exists-with-different-credential"
        ) {
          // Handle the credential conflict
          await handleCredentialConflict(popupError, provider);
        } else if (popupError.code === "auth/popup-closed-by-user") {
          // User closed the popup, don't show an error
          console.log("User closed the popup");
          return;
        } else if (popupError.code === "auth/popup-blocked") {
          setErrorMessage(
            language === "hu"
              ? "A felugró ablak blokkolva van. Kérjük engedélyezd a felugró ablakokat."
              : "Popup blocked. Please allow popups for this site."
          );
        } else if (popupError.code === "auth/cancelled-popup-request") {
          // Another popup was already open, don't show error
          console.log("Another popup was already open");
          return;
        } else {
          throw popupError; // Re-throw other errors
        }
      }
    } catch (error: any) {
      console.error("Provider linking error:", error);
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      if (error.code === "auth/credential-already-in-use") {
        setErrorMessage(
          language === "hu"
            ? "Ez a fiók már másik felhasználóhoz van rendelve."
            : "This account is already linked to another user."
        );
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setErrorMessage(
          language === "hu"
            ? "Ez az email cím már más bejelentkezési módszerrel van használatban. A fiókokat nem lehet automatikusan összekapcsolni biztonsági okokból."
            : "This email is already in use with a different sign-in method. Accounts cannot be automatically linked for security reasons."
        );
      } else if (error.code === "auth/provider-already-linked") {
        setErrorMessage(
          language === "hu"
            ? "Ez a bejelentkezési módszer már össze van kapcsolva a fiókoddal."
            : "This sign-in method is already linked to your account."
        );
      } else if (error.code === "auth/popup-blocked") {
        setErrorMessage(
          language === "hu"
            ? "A felugró ablak blokkolva van. Kérjük engedélyezd a felugró ablakokat."
            : "Popup blocked. Please allow popups for this site."
        );
      } else if (error.code === "auth/popup-closed-by-user") {
        // Don't show error for user-closed popup
        return;
      } else if (error.code === "auth/network-request-failed") {
        setErrorMessage(
          language === "hu"
            ? "Hálózati hiba történt. Kérjük ellenőrizd az internetkapcsolatod."
            : "Network error occurred. Please check your internet connection."
        );
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage(
          language === "hu"
            ? "Túl sok kérés érkezett. Kérjük próbáld újra később."
            : "Too many requests. Please try again later."
        );
      } else {
        // Generic error message for unknown errors
        setErrorMessage(
          language === "hu"
            ? `Fiók összekapcsolása sikertelen: ${
                error.message || "Ismeretlen hiba"
              }`
            : `Failed to link account: ${error.message || "Unknown error"}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleCredentialConflict = async (error: any, newProvider: string) => {
    try {
      console.log("Handling credential conflict for:", newProvider);
      console.log("Full error object:", error);

      // Get the email from the error - try multiple sources
      const conflictEmail =
        error.customData?.email ||
        error.email ||
        error._tokenResponse?.email ||
        error.credential?.email;

      if (!conflictEmail) {
        console.warn(
          "No email found in conflict error, showing generic message"
        );
        setErrorMessage(
          language === "hu"
            ? "Fiók konfliktus történt. Ez az email cím már használatban van más bejelentkezési módszerrel. Kérjük próbáld meg a másik bejelentkezési módot."
            : "Account conflict occurred. This email is already in use with a different sign-in method. Please try the other sign-in method."
        );
        return;
      }

      console.log("Conflict email:", conflictEmail);

      // Check what sign-in methods exist for this email
      let existingMethods: string[] = [];

      try {
        existingMethods = await fetchSignInMethodsForEmail(auth, conflictEmail);
        console.log("Existing methods for email:", existingMethods);
      } catch (fetchError: any) {
        console.error("Error fetching sign-in methods:", fetchError);

        // If we can't fetch methods, show a generic helpful message
        setErrorMessage(
          language === "hu"
            ? `Ez az email cím (${conflictEmail}) már használatban van más bejelentkezési módszerrel. Próbáld meg bejelentkezni Google, Facebook vagy GitHub fiókkal.`
            : `This email (${conflictEmail}) is already in use with a different sign-in method. Try signing in with Google, Facebook, or GitHub.`
        );
        return;
      }

      // Handle the case where no methods are found (this shouldn't happen but can occur)
      if (!existingMethods || existingMethods.length === 0) {
        console.warn(
          "No existing sign-in methods found for email:",
          conflictEmail
        );

        // Check if the user is already signed in with this email
        if (firebaseUser?.email === conflictEmail) {
          setErrorMessage(
            language === "hu"
              ? `Te már be vagy jelentkezve ezzel az email címmel (${conflictEmail}). A ${newProvider} fiók nem kapcsolható össze, mert ugyanaz az email cím van használatban. Próbáld meg kijelentkezni, majd bejelentkezni a ${newProvider} fiókkal.`
              : `You are already signed in with this email (${conflictEmail}). The ${newProvider} account cannot be linked because the same email is in use. Try signing out, then signing in with your ${newProvider} account.`
          );
        } else {
          // Show a more helpful message suggesting common providers
          setErrorMessage(
            language === "hu"
              ? `Ez az email cím (${conflictEmail}) már regisztrálva van, de nem sikerült meghatározni a bejelentkezési módot. Próbáld meg bejelentkezni Google, Facebook vagy GitHub fiókkal, vagy használj másik email címet.`
              : `This email (${conflictEmail}) is already registered, but we couldn't determine the sign-in method. Try signing in with Google, Facebook, or GitHub, or use a different email address.`
          );
        }
        return;
      }

      // Convert provider IDs to user-friendly names
      const providerNames = existingMethods.map((method) => {
        switch (method) {
          case "google.com":
            return "Google";
          case "facebook.com":
            return "Facebook";
          case "github.com":
            return "GitHub";
          case "password":
            return language === "hu" ? "Email/jelszó" : "Email/Password";
          case "apple.com":
            return "Apple";
          case "microsoft.com":
            return "Microsoft";
          case "twitter.com":
            return "Twitter";
          default:
            // Handle any unknown providers gracefully
            return (
              method.replace(".com", "").charAt(0).toUpperCase() +
              method.replace(".com", "").slice(1)
            );
        }
      });

      const existingMethodsText = providerNames.join(", ");

      setErrorMessage(
        language === "hu"
          ? `Ez az email cím (${conflictEmail}) már használatban van a következő módszerrel: ${existingMethodsText}. Biztonsági okokból a fiókokat nem lehet automatikusan összekapcsolni. Kérjük, jelentkezz be előbb a meglévő módszerrel, majd próbáld meg újra az összekapcsolást.`
          : `This email (${conflictEmail}) is already in use with: ${existingMethodsText}. For security reasons, accounts cannot be automatically linked. Please sign in with your existing method first, then try linking again.`
      );
    } catch (conflictError: any) {
      console.error("Error handling credential conflict:", conflictError);

      // Provide a helpful fallback error message
      setErrorMessage(
        language === "hu"
          ? "Fiók konfliktus történt. Ez az email cím már használatban van. Próbáld meg bejelentkezni a már meglévő fiókkal (Google, Facebook, vagy GitHub), majd próbáld meg újra az összekapcsolást."
          : "Account conflict occurred. This email is already in use. Try signing in with your existing account (Google, Facebook, or GitHub), then try linking again."
      );
    }
  };

  const handleSignOut = async () => {
    if (window.confirm(texts[language].confirmations.signOut)) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error: any) {
        setErrorMessage(texts[language].errors.signOutFailed);
      }
    }
  };

  const handleUnlinkProvider = async (provider: string) => {
    if (!firebaseUser || !firestoreUser?.providers) return;

    // Prevent unlinking if it's the only provider
    if (firestoreUser.providers.length <= 1) {
      setErrorMessage(
        language === "hu"
          ? "Nem lehet leválasztani az egyetlen bejelentkezési módot."
          : "Cannot unlink the only sign-in method."
      );
      return;
    }

    if (!window.confirm(texts[language].confirmations.unlinkProvider)) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Get the provider ID for Firebase
      let providerId;
      switch (provider) {
        case "google":
          providerId = "google.com";
          break;
        case "facebook":
          providerId = "facebook.com";
          break;
        case "github":
          providerId = "github.com";
          break;
        default:
          throw new Error("Invalid provider");
      }

      // Unlink from Firebase Auth
      await firebaseUser.unlink(providerId);

      // Update Firestore - remove provider from arrays
      const updatedProviders = firestoreUser.providers.filter(
        (p) => p !== provider
      );

      // Remove from linkedAccounts
      const updatedLinkedAccounts = { ...firestoreUser.linkedAccounts };
      delete updatedLinkedAccounts[
        provider as keyof typeof updatedLinkedAccounts
      ];

      // Get the repository instance
      const { updateUserDataInFirestore } = useUserRepository();

      // Update Firestore data
      await updateUserDataInFirestore({
        providers: updatedProviders,
        linkedAccounts: updatedLinkedAccounts,
        updatedAt: new Date().toISOString(),
      });

      // Reload user data
      const updatedUserData = await getUserDataFromFirestore(firebaseUser.uid);
      if (updatedUserData) {
        setFirestoreUser(updatedUserData);
      }

      setSuccessMessage(texts[language].unlinkedSuccessfully);
    } catch (error: any) {
      console.error("Provider unlinking error:", error);
      setErrorMessage(texts[language].errors.unlinkingFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(
      language === "hu" ? "hu-HU" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  const getTimeSince = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return language === "hu" ? "1 napja" : "1 day ago";
    if (diffDays < 30)
      return language === "hu" ? `${diffDays} napja` : `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1)
      return language === "hu" ? "1 hónapja" : "1 month ago";
    if (diffMonths < 12)
      return language === "hu"
        ? `${diffMonths} hónapja`
        : `${diffMonths} months ago`;

    const diffYears = Math.floor(diffDays / 365);
    if (diffYears === 1) return language === "hu" ? "1 éve" : "1 year ago";
    return language === "hu" ? `${diffYears} éve` : `${diffYears} years ago`;
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return <FaGoogle className="w-4 h-4 text-red-500" />;
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case "github":
        return <Github className="w-4 h-4 text-gray-800 dark:text-gray-200" />;
      case "email":
        return <Mail className="w-4 h-4 text-gray-600" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google":
        return "Google";
      case "facebook":
        return "Facebook";
      case "github":
        return "GitHub";
      case "email":
        return "Email";
      default:
        return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            {texts[language].roles.admin}
          </Badge>
        );
      case "moderator":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Shield className="w-3 h-3 mr-1" />
            {texts[language].roles.moderator}
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-white/50 dark:bg-slate-700/50"
          >
            <User className="w-3 h-3 mr-1" />
            {texts[language].roles.user}
          </Badge>
        );
    }
  };

  const getStatusBadge = (isActive?: boolean) => {
    return isActive ? (
      <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <Check className="w-3 h-3 mr-1" />
        {texts[language].status.active}
      </Badge>
    ) : (
      <Badge variant="destructive">
        <AlertTriangle className="w-3 h-3 mr-1" />
        {texts[language].status.inactive}
      </Badge>
    );
  };

  if (!firebaseUser) {
    return (
      <div className="min-h-screen relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse animation-delay-0"></div>
            <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
        </div>

        <main className="relative container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary/80 to-primary-600/80 rounded-full mb-4 mx-auto shadow-lg backdrop-blur-sm">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {texts[language].title}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-300">
                  {texts[language].subtitle}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {texts[language].notSignedIn}
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary/80 to-primary-600/80 hover:from-primary-600/90 hover:to-primary-700/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                >
                  <Link to="/login">
                    <User className="w-4 h-4 mr-2" />
                    {texts[language].signIn}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}

      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-5xl font-bold text-slate-800 dark:text-white">
                {texts[language].title}
              </h1>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
              {texts[language].subtitle}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-600 to-primary-700 mx-auto rounded-full"></div>
          </div>

          {/* Success/Error Messages */}
          {(successMessage || errorMessage) && (
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-lg">
              <CardContent className="p-4">
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    errorMessage
                      ? "bg-red-50/80 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
                      : "bg-green-50/80 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {errorMessage ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <Check className="w-5 h-5" />
                    )}
                    <p className="font-medium">
                      {errorMessage || successMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Header Card */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={
                      firebaseUser.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        firebaseUser.displayName || "User"
                      )}&background=6366f1&color=fff&size=120`
                    }
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                        {firebaseUser.displayName || "User"}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {firebaseUser.email}
                      </p>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {getRoleBadge(firestoreUser?.role)}
                        {getStatusBadge(firestoreUser?.isActive)}
                        {firebaseUser.emailVerified && (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            {texts[language].status.verified}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-white/30"
                      >
                        {isEditing ? (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            {texts[language].cancel}
                          </>
                        ) : (
                          <>
                            <Edit3 className="w-4 h-4 mr-2" />
                            {texts[language].editProfile}
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignOut}
                        className="bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm border-red-200/30 text-red-600 hover:bg-red-100/50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {texts[language].signOut}
                      </Button>
                    </div>
                  </div>

                  {firestoreUser?.bio && (
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                      {firestoreUser.bio}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Personal Information */}
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <User className="w-6 h-6" />
                    {texts[language].personalInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300 font-medium">
                        {texts[language].displayName}
                      </Label>
                      {isEditing ? (
                        <Input
                          value={formData.displayName}
                          onChange={(e) =>
                            handleInputChange("displayName", e.target.value)
                          }
                          placeholder={texts[language].placeholders.displayName}
                          className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-white/30 focus:border-primary/50"
                        />
                      ) : (
                        <div className="text-slate-800 dark:text-white bg-white/30 dark:bg-slate-700/30 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                          {firestoreUser?.displayName || "Not set"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 dark:text-slate-300 font-medium">
                        {texts[language].email}
                      </Label>
                      <div className="text-slate-800 dark:text-white bg-white/30 dark:bg-slate-700/30 rounded-lg p-4 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-500" />
                        {firebaseUser.email}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 dark:text-slate-300 font-medium">
                      {texts[language].bio}
                    </Label>
                    {isEditing ? (
                      <Textarea
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        placeholder={texts[language].placeholders.bio}
                        rows={4}
                        className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-white/30 focus:border-primary/50 resize-none"
                      />
                    ) : (
                      <div className="text-slate-800 dark:text-white bg-white/30 dark:bg-slate-700/30 rounded-lg p-4 backdrop-blur-sm border border-white/20 min-h-[100px] whitespace-pre-wrap">
                        {firestoreUser?.bio || "No bio provided"}
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      {texts[language].socialLinks}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData.socialLinks).map(
                        ([platform, value]) => (
                          <div key={platform} className="space-y-2">
                            <Label className="text-slate-700 dark:text-slate-300 font-medium capitalize flex items-center gap-2">
                              {platform === "github" && (
                                <Github className="w-4 h-4" />
                              )}
                              {platform === "linkedin" && (
                                <Linkedin className="w-4 h-4" />
                              )}
                              {platform === "twitter" && (
                                <Twitter className="w-4 h-4" />
                              )}
                              {platform === "facebook" && (
                                <Facebook className="w-4 h-4" />
                              )}
                              {platform}
                            </Label>
                            {isEditing ? (
                              <Input
                                value={value}
                                onChange={(e) =>
                                  handleInputChange(
                                    `socialLinks.${platform}`,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  texts[language].placeholders[
                                    platform as keyof (typeof texts)[typeof language]["placeholders"]
                                  ]
                                }
                                className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-white/30 focus:border-primary/50"
                              />
                            ) : (
                              <div className="text-slate-800 dark:text-white bg-white/30 dark:bg-slate-700/30 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                                {value || "Not set"}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <div className="pt-4 border-t border-white/20">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary/80 to-primary-600/80 hover:from-primary-600/90 hover:to-primary-700/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Saving...
                          </div>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            {texts[language].saveChanges}
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Statistics */}
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    {texts[language].stats.accountStatus}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/30 dark:bg-slate-700/30 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {texts[language].stats.memberSince}
                        </span>
                      </div>
                      <span className="text-slate-800 dark:text-white font-medium text-xs">
                        {getTimeSince(firestoreUser?.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/30 dark:bg-slate-700/30 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {texts[language].stats.totalIdeas}
                        </span>
                      </div>
                      <span className="text-slate-800 dark:text-white font-medium">
                        {firestoreUser?.ideasCount || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/30 dark:bg-slate-700/30 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {texts[language].stats.lastActive}
                        </span>
                      </div>
                      <span className="text-slate-800 dark:text-white font-medium text-xs">
                        {getTimeSince(firestoreUser?.lastLoginAt)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Linked Accounts */}
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    {texts[language].linkedAccounts}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current Providers */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {texts[language].providers}
                    </h4>
                    <div className="space-y-2">
                      {firestoreUser?.providers?.map((provider) => (
                        <div
                          key={provider}
                          className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg backdrop-blur-sm border border-white/30"
                        >
                          <div className="flex items-center gap-3">
                            {getProviderIcon(provider)}
                            <span className="text-slate-800 dark:text-white font-medium">
                              {getProviderName(provider)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              <Check className="w-3 h-3 mr-1" />
                              {texts[language].linked}
                            </Badge>
                            {firestoreUser.providers &&
                              firestoreUser.providers.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUnlinkProvider(provider)}
                                  disabled={isLoading}
                                  className="bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm border-red-200/30 text-red-600 hover:bg-red-100/50 text-xs px-2 py-1"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Providers to Link */}
                  {["google", "facebook", "github"].some((provider) =>
                    canLinkProvider(provider)
                  ) && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {texts[language].linkAccount}
                      </h4>
                      <div className="space-y-2">
                        {["google", "facebook", "github"].map(
                          (provider) =>
                            canLinkProvider(provider) && (
                              <Button
                                key={provider}
                                variant="outline"
                                onClick={() => handleLinkProvider(provider)}
                                disabled={isLoading}
                                className="w-full justify-between bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-white/30 hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-300"
                              >
                                <div className="flex items-center gap-2">
                                  {getProviderIcon(provider)}
                                  <span>{getProviderName(provider)}</span>
                                </div>
                                {isLoading ? (
                                  <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                                ) : (
                                  <Plus className="w-4 h-4" />
                                )}
                              </Button>
                            )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Helpful Information */}
                  <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/30">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-medium mb-1">
                          {language === "hu"
                            ? "Biztonsági információ"
                            : "Security Information"}
                        </p>
                        <p>
                          {language === "hu"
                            ? "Ha egy email cím már használatban van másik bejelentkezési módszerrel, a fiókokat nem lehet automatikusan összekapcsolni. Jelentkezz be előbb a meglévő módszerrel."
                            : "If an email is already in use with a different sign-in method, accounts cannot be automatically linked. Please sign in with your existing method first."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
