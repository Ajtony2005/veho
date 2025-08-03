import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useAuth } from "../hooks/useAuth";
import { languageAtom } from "../store/languageAtom";
import { userAtom } from "../store/userAtom";
import { useUserRepository } from "../repository/UserRepository";
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
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Eye,
  Star,
  TrendingUp,
  Users,
  Zap,
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

const texts = {
  hu: {
    title: "Profil",
    subtitle: "Nyilvános profil és személyes információk",
    personalInfo: "Személyes Információk",
    aboutMe: "Rólam",
    myIdeas: "Ötleteim",
    activity: "Aktivitás",
    stats: "Statisztikák",
    socialLinks: "Közösségi média",
    linkedAccounts: "Összekapcsolt Fiókok",
    achievements: "Eredmények",

    // Profile fields
    displayName: "Megjelenítendő név",
    bio: "Bemutatkozás",
    email: "Email cím",
    location: "Helyszín",
    website: "Weboldal",
    joinedDate: "Csatlakozás dátuma",
    lastSeen: "Utoljára online",

    // Actions
    editProfile: "Profil szerkesztése",
    saveChanges: "Változtatások mentése",
    cancel: "Mégse",
    message: "Üzenet küldése",
    follow: "Követés",
    unfollow: "Követés megszüntetése",
    share: "Profil megosztása",
    settings: "Beállítások",

    // Stats
    totalIdeas: "Összes ötlet",
    totalLikes: "Összes kedvelés",
    totalViews: "Összes megtekintés",
    memberSince: "Tag ettől",
    activedays: "Aktív napok",
    contributions: "Hozzájárulások",

    // Tabs
    ideas: "Ötletek",
    about: "Névjegy",

    // Status
    online: "Online",
    offline: "Offline",
    active: "Aktív",
    inactive: "Inaktív",
    verified: "Megerősített",

    // Ideas section
    noIdeas: "Még nincsenek közzétett ötletek",
    createFirstIdea: "Hozd létre az első ötletedet",
    viewAllIdeas: "Összes ötlet megtekintése",
    recentIdeas: "Legutóbbi ötletek",
    popularIdeas: "Népszerű ötletek",

    // Social
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    facebook: "Facebook",

    // Messages
    profileUpdated: "Profil sikeresen frissítve!",
    updateFailed: "Profil frissítés sikertelen.",
    signOutFailed: "Kijelentkezés sikertelen.",

    // Placeholders
    placeholders: {
      displayName: "Add meg a neved...",
      bio: "Mesélj magadról, érdeklődési köreidről, tapasztalataidról...",
      location: "Város, Ország",
      website: "https://példa.hu",
      github: "felhasználónév",
      linkedin: "https://linkedin.com/in/felhasználónév",
      twitter: "@felhasználónév",
      facebook: "https://facebook.com/felhasználónév",
    },

    confirmations: {
      signOut: "Biztosan ki szeretnél jelentkezni?",
    },

    errors: {
      notSignedIn: "Kérjük, jelentkezz be a profil megtekintéséhez.",
    },
  },
  en: {
    title: "Profile",
    subtitle: "Public profile and personal information",
    personalInfo: "Personal Information",
    aboutMe: "About Me",
    myIdeas: "My Ideas",
    activity: "Activity",
    stats: "Statistics",
    socialLinks: "Social Media",
    linkedAccounts: "Linked Accounts",
    achievements: "Achievements",

    // Profile fields
    displayName: "Display name",
    bio: "Bio",
    email: "Email address",
    location: "Location",
    website: "Website",
    joinedDate: "Joined date",
    lastSeen: "Last seen",

    // Actions
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    message: "Send Message",
    follow: "Follow",
    unfollow: "Unfollow",
    share: "Share Profile",
    settings: "Settings",

    // Stats
    totalIdeas: "Total Ideas",
    totalLikes: "Total Likes",
    totalViews: "Total Views",
    memberSince: "Member since",
    activedays: "Active days",
    contributions: "Contributions",

    // Tabs
    ideas: "Ideas",
    about: "About",

    // Status
    online: "Online",
    offline: "Offline",
    active: "Active",
    inactive: "Inactive",
    verified: "Verified",

    // Ideas section
    noIdeas: "No ideas published yet",
    createFirstIdea: "Create your first idea",
    viewAllIdeas: "View all ideas",
    recentIdeas: "Recent ideas",
    popularIdeas: "Popular ideas",

    // Social
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    facebook: "Facebook",

    // Messages
    profileUpdated: "Profile updated successfully!",
    updateFailed: "Failed to update profile.",
    signOutFailed: "Failed to sign out.",

    // Placeholders
    placeholders: {
      displayName: "Enter your name...",
      bio: "Tell us about yourself, your interests, experiences...",
      location: "City, Country",
      website: "https://example.com",
      github: "username",
      linkedin: "https://linkedin.com/in/username",
      twitter: "@username",
      facebook: "https://facebook.com/username",
    },

    confirmations: {
      signOut: "Are you sure you want to sign out?",
    },

    errors: {
      notSignedIn: "Please sign in to view your profile.",
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
    updateUserDataInFirestore,
  } = useUserRepository();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firestoreUser, setFirestoreUser] = useState<UserType | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "ideas">("about");

  // Form state for profile editing
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
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
              location: userData.location || "",
              website: userData.website || "",
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

      // Update additional profile fields
      await updateUserDataInFirestore({
        location: formData.location,
        website: formData.website,
      });

      // Reload user data
      const updatedUserData = await getUserDataFromFirestore(firebaseUser.uid);
      if (updatedUserData) {
        setFirestoreUser(updatedUserData);
      }

      setSuccessMessage(texts[language].profileUpdated);
      setIsEditing(false);
    } catch (error: any) {
      setErrorMessage(texts[language].updateFailed);
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm(texts[language].confirmations.signOut)) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error: any) {
        setErrorMessage(texts[language].signOutFailed);
      }
    }
  };

  // Utility functions
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

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="glass bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-200 border-purple-500/30">
            <Crown className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "moderator":
        return (
          <Badge className="glass bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-200 border-blue-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Moderator
          </Badge>
        );
      default:
        return (
          <Badge className="glass bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-200 border-gray-500/30">
            <User className="w-3 h-3 mr-1" />
            User
          </Badge>
        );
    }
  };

  if (!firebaseUser) {
    return (
      <div className="min-h-screen relative">
        <main className="relative container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="glass">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary/20 to-primary-600/20 rounded-full mb-4 mx-auto border border-primary/30">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  {texts[language].title}
                </CardTitle>
                <p className="text-white/70">{texts[language].subtitle}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/60 mb-6">
                  {texts[language].errors.notSignedIn}
                </p>
                <Button asChild className="btn-primary w-full">
                  <Link to="/login">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
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
      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary mr-3" />
              <h1 className="text-5xl font-bold text-white">
                {texts[language].title}
              </h1>
            </div>
            <p className="text-xl text-white/70 mb-4">
              {texts[language].subtitle}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-600 to-primary-700 mx-auto rounded-full"></div>
          </div>

          {/* Success/Error Messages */}
          {(successMessage || errorMessage) && (
            <Card className="glass">
              <CardContent className="p-4">
                <div
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    errorMessage
                      ? "bg-red-500/10 border-red-500/30 text-red-200"
                      : "bg-green-500/10 border-green-500/30 text-green-200"
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
          <Card className="glass">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={
                      firebaseUser.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        firebaseUser.displayName || "User"
                      )}&background=6366f1&color=fff&size=160`
                    }
                    alt="Profile"
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 btn-secondary"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        {firebaseUser.displayName || "User"}
                      </h2>
                      <p className="text-white/70 text-lg mb-3">
                        {firestoreUser?.settings?.showEmail
                          ? firebaseUser.email
                          : "Email hidden"}
                      </p>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                        {getRoleBadge(firestoreUser?.role)}
                        <Badge className="glass bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-200 border-green-500/30">
                          <Check className="w-3 h-3 mr-1" />
                          {texts[language].verified}
                        </Badge>
                        {firestoreUser?.settings?.showLastSeen && (
                          <Badge className="glass bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-200 border-blue-500/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {texts[language].online}
                          </Badge>
                        )}
                      </div>

                      {/* Location and website */}
                      <div className="flex flex-col lg:flex-row gap-4 text-white/60 text-sm">
                        {firestoreUser?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {firestoreUser.location}
                          </div>
                        )}
                        {firestoreUser?.website && (
                          <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <a
                              href={firestoreUser.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-400 transition-colors"
                            >
                              {firestoreUser.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {texts[language].memberSince}{" "}
                          {formatDate(firestoreUser?.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="glass border-white/30 text-white hover:bg-white/20"
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
                        asChild
                        className="glass border-white/30 text-white hover:bg-white/20"
                      >
                        <Link to="/settings">
                          <Settings className="w-4 h-4 mr-2" />
                          {texts[language].settings}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignOut}
                        className="glass border-red-500/30 text-red-200 hover:bg-red-500/20"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>

                  {/* Bio */}
                  {firestoreUser?.bio && (
                    <p className="text-white/80 text-base leading-relaxed">
                      {firestoreUser.bio}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {firestoreUser?.ideasCount || 0}
                </div>
                <div className="text-white/60 text-sm">
                  {texts[language].totalIdeas}
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-3">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {firestoreUser?.totalLikes || 0}
                </div>
                <div className="text-white/60 text-sm">
                  {texts[language].totalLikes}
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mb-3">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {firestoreUser?.totalViews || 0}
                </div>
                <div className="text-white/60 text-sm">
                  {texts[language].totalViews}
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mb-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{0}</div>
                <div className="text-white/60 text-sm">
                  {texts[language].contributions}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "about" ? "default" : "outline"}
                  onClick={() => setActiveTab("about")}
                  className={
                    activeTab === "about"
                      ? "btn-primary"
                      : "glass border-white/30 text-white hover:bg-white/20"
                  }
                >
                  <User className="w-4 h-4 mr-2" />
                  {texts[language].about}
                </Button>
                <Button
                  variant={activeTab === "ideas" ? "default" : "outline"}
                  onClick={() => setActiveTab("ideas")}
                  className={
                    activeTab === "ideas"
                      ? "btn-primary"
                      : "glass border-white/30 text-white hover:bg-white/20"
                  }
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {texts[language].ideas}
                </Button>
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {texts[language].aboutMe}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        {/* Editable form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white/90">
                              {texts[language].displayName}
                            </Label>
                            <Input
                              value={formData.displayName}
                              onChange={(e) =>
                                handleInputChange("displayName", e.target.value)
                              }
                              placeholder={
                                texts[language].placeholders.displayName
                              }
                              className="glass border-white/30 text-white placeholder-white/50 focus:border-primary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white/90">
                              {texts[language].location}
                            </Label>
                            <Input
                              value={formData.location}
                              onChange={(e) =>
                                handleInputChange("location", e.target.value)
                              }
                              placeholder={
                                texts[language].placeholders.location
                              }
                              className="glass border-white/30 text-white placeholder-white/50 focus:border-primary/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white/90">
                            {texts[language].website}
                          </Label>
                          <Input
                            value={formData.website}
                            onChange={(e) =>
                              handleInputChange("website", e.target.value)
                            }
                            placeholder={texts[language].placeholders.website}
                            className="glass border-white/30 text-white placeholder-white/50 focus:border-primary/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white/90">
                            {texts[language].bio}
                          </Label>
                          <Textarea
                            value={formData.bio}
                            onChange={(e) =>
                              handleInputChange("bio", e.target.value)
                            }
                            placeholder={texts[language].placeholders.bio}
                            rows={4}
                            className="glass border-white/30 text-white placeholder-white/50 focus:border-primary/50 resize-none"
                          />
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                          <Label className="text-white/90 text-lg font-semibold">
                            {texts[language].socialLinks}
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(formData.socialLinks).map(
                              ([platform, value]) => (
                                <div key={platform} className="space-y-2">
                                  <Label className="text-white/90 capitalize flex items-center gap-2">
                                    {getSocialIcon(platform)}
                                    {
                                      texts[language][
                                        platform as keyof (typeof texts)[typeof language]
                                      ]
                                    }
                                  </Label>
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
                                    className="glass border-white/30 text-white placeholder-white/50 focus:border-primary/50"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-4 border-t border-white/20">
                          <Button
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="btn-primary w-full"
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
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Display bio */}
                        <div>
                          <h4 className="text-white/90 font-semibold mb-2">
                            Bio
                          </h4>
                          <p className="text-white/70 leading-relaxed">
                            {firestoreUser?.bio || "No bio provided"}
                          </p>
                        </div>

                        {/* Display social links */}
                        {firestoreUser?.socialLinks &&
                          Object.values(firestoreUser.socialLinks).some(
                            (link) => link
                          ) && (
                            <div>
                              <h4 className="text-white/90 font-semibold mb-3">
                                {texts[language].socialLinks}
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {Object.entries(firestoreUser.socialLinks).map(
                                  ([platform, url]) =>
                                    url && (
                                      <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 glass border-white/30 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                                      >
                                        {getSocialIcon(platform)}
                                        <span className="capitalize">
                                          {platform}
                                        </span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "ideas" && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {texts[language].myIdeas}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {texts[language].noIdeas}
                      </h3>
                      <p className="text-white/60 mb-6">
                        {texts[language].createFirstIdea}
                      </p>
                      <Button className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Idea
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Activity Card */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    {texts[language].activity}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="text-white/80 text-sm">
                        {firestoreUser?.settings?.showLastSeen
                          ? `Last seen ${getTimeSince(
                              firestoreUser?.lastLoginAt
                            )}`
                          : "Activity hidden"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div className="text-white/80 text-sm">
                        Joined {formatDate(firestoreUser?.createdAt)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {texts[language].share}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full glass border-white/30 text-white hover:bg-white/20"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {texts[language].viewAllIdeas}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
