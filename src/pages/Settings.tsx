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
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Sun,
  Moon,
  Palette,
  Shield,
  Bell,
  Database,
  Trash2,
  ArrowLeft,
  Save,
  Check,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
  Monitor,
  Activity,
  Clock,
  MapPin,
} from "lucide-react";
import { User as UserType } from "../Data/User";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const texts = {
  hu: {
    title: "Beállítások",
    subtitle: "Személyre szabd a felhasználói élményed",
    backToProfile: "Vissza a profilhoz",

    // Categories
    appearance: "Megjelenés",
    privacy: "Adatvédelem",
    notifications: "Értesítések",
    account: "Fiók",
    data: "Adatok",
    advanced: "Speciális",

    // Appearance settings
    language: "Nyelv",
    theme: "Téma",
    themeDescription: "Válaszd ki a preferált megjelenést",
    languageDescription: "Válaszd ki a felület nyelvét",

    // Privacy settings
    profileVisibility: "Profil láthatósága",
    showEmail: "Email cím megjelenítése",
    showLastSeen: "Utolsó aktivitás megjelenítése",
    allowMessages: "Üzenetek engedélyezése",
    publicProfile: "Nyilvános profil",
    privateProfile: "Privát profil",

    // Notification settings
    emailNotifications: "Email értesítések",
    pushNotifications: "Push értesítések",
    ideaUpdates: "Ötlet frissítések",
    comments: "Hozzászólások",
    mentions: "Említések",

    // Account settings
    timezone: "Időzóna",
    autoSave: "Automatikus mentés",
    sessionTimeout: "Munkamenet időtúllépés",
    twoFactorAuth: "Kétfaktoros hitelesítés",

    // Data settings
    exportData: "Adatok exportálása",
    importData: "Adatok importálása",
    clearCache: "Cache törlése",
    deleteAccount: "Fiók törlése",

    // Themes
    themes: {
      light: "Világos",
      dark: "Sötét",
      system: "Rendszer",
      auto: "Automatikus",
    },

    // Languages
    languages: {
      hu: "Magyar",
      en: "English",
    },

    // Timezones (common ones)
    timezones: {
      "Europe/Budapest": "Közép-európai idő (Budapest)",
      "Europe/London": "Greenwichi idő (London)",
      "America/New_York": "Keleti idő (New York)",
      "America/Los_Angeles": "Csendes-óceáni idő (Los Angeles)",
      "Asia/Tokyo": "Japán idő (Tokió)",
    },

    // Success/Error messages
    settingsSaved: "Beállítások sikeresen mentve!",
    errorSaving: "Hiba a beállítások mentése során.",
    dataExported: "Adatok sikeresen exportálva!",
    cacheCleared: "Cache sikeresen törölve!",

    // Confirmations
    confirmations: {
      deleteAccount:
        "Biztosan törölni szeretnéd a fiókodat? Ez a művelet visszafordíthatatlan!",
      clearCache: "Biztosan törölni szeretnéd a cache-t?",
    },

    // Descriptions
    descriptions: {
      profileVisibility:
        "Határozd meg, hogy mások hogyan láthatják a profilodat",
      emailNotifications: "Email értesítések küldése fontos eseményekről",
      timezone: "Az időzóna beállítása az időpontok helyes megjelenítéséhez",
      autoSave: "Automatikus mentés bekapcsolása a változtatásokhoz",
      twoFactorAuth: "Extra biztonsági réteg hozzáadása a fiókodhoz",
    },
  },
  en: {
    title: "Settings",
    subtitle: "Customize your user experience",
    backToProfile: "Back to Profile",

    // Categories
    appearance: "Appearance",
    privacy: "Privacy",
    notifications: "Notifications",
    account: "Account",
    data: "Data",
    advanced: "Advanced",

    // Appearance settings
    language: "Language",
    theme: "Theme",
    themeDescription: "Choose your preferred appearance",
    languageDescription: "Choose your interface language",

    // Privacy settings
    profileVisibility: "Profile Visibility",
    showEmail: "Show Email Address",
    showLastSeen: "Show Last Activity",
    allowMessages: "Allow Messages",
    publicProfile: "Public Profile",
    privateProfile: "Private Profile",

    // Notification settings
    emailNotifications: "Email Notifications",
    pushNotifications: "Push Notifications",
    ideaUpdates: "Idea Updates",
    comments: "Comments",
    mentions: "Mentions",

    // Account settings
    timezone: "Timezone",
    autoSave: "Auto Save",
    sessionTimeout: "Session Timeout",
    twoFactorAuth: "Two-Factor Authentication",

    // Data settings
    exportData: "Export Data",
    importData: "Import Data",
    clearCache: "Clear Cache",
    deleteAccount: "Delete Account",

    // Themes
    themes: {
      light: "Light",
      dark: "Dark",
      system: "System",
      auto: "Auto",
    },

    // Languages
    languages: {
      hu: "Magyar",
      en: "English",
    },

    // Timezones
    timezones: {
      "Europe/Budapest": "Central European Time (Budapest)",
      "Europe/London": "Greenwich Mean Time (London)",
      "America/New_York": "Eastern Time (New York)",
      "America/Los_Angeles": "Pacific Time (Los Angeles)",
      "Asia/Tokyo": "Japan Standard Time (Tokyo)",
    },

    // Success/Error messages
    settingsSaved: "Settings saved successfully!",
    errorSaving: "Error saving settings.",
    dataExported: "Data exported successfully!",
    cacheCleared: "Cache cleared successfully!",

    // Confirmations
    confirmations: {
      deleteAccount:
        "Are you sure you want to delete your account? This action cannot be undone!",
      clearCache: "Are you sure you want to clear the cache?",
    },

    // Descriptions
    descriptions: {
      profileVisibility: "Control how others can see your profile",
      emailNotifications: "Receive email notifications for important events",
      timezone: "Set your timezone for correct time display",
      autoSave: "Enable automatic saving of changes",
      twoFactorAuth: "Add an extra security layer to your account",
    },
  },
};

// Remove the hasChanges state and save button, implement auto-save
function Settings() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [user, setUser] = useAtom(userAtom);
  const firebaseUser = useAuth();
  const { updateUserDataInFirestore, getUserDataFromFirestore } =
    useUserRepository();

  const [isLoading, setIsLoading] = useState(false);
  const [firestoreUser, setFirestoreUser] = useState<UserType | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Remove hasChanges state since we're auto-saving

  // Settings state
  const [settings, setSettings] = useState({
    // Appearance
    language: "hu",
    theme: "light",

    // Privacy
    profileVisibility: "public",
    showEmail: false,
    showLastSeen: true,
    allowMessages: true,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    ideaUpdates: true,
    comments: true,
    mentions: true,

    // Account
    timezone: "Europe/Budapest",
    autoSave: true,
    sessionTimeout: 30,
    twoFactorAuth: false,
  });

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSettings((prev) => ({ ...prev, theme: savedTheme }));
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Auto-save function
  const autoSaveSettings = async (updatedSettings: typeof settings) => {
    if (!firebaseUser) return;

    try {
      const currentUserData = await getUserDataFromFirestore(firebaseUser.uid);

      const settingsToSave = {
        ...currentUserData,
        language: updatedSettings.language as "hu" | "en",
        timezone: updatedSettings.timezone,
        settings: {
          ...currentUserData?.settings,
          profileVisibility: updatedSettings.profileVisibility,
          showEmail: updatedSettings.showEmail,
          showLastSeen: updatedSettings.showLastSeen,
          allowMessages: updatedSettings.allowMessages,
          emailNotifications: updatedSettings.emailNotifications,
          pushNotifications: updatedSettings.pushNotifications,
          ideaUpdates: updatedSettings.ideaUpdates,
          comments: updatedSettings.comments,
          mentions: updatedSettings.mentions,
          autoSave: updatedSettings.autoSave,
          sessionTimeout: updatedSettings.sessionTimeout,
          twoFactorAuth: updatedSettings.twoFactorAuth,
        },
        updatedAt: new Date().toISOString(),
      };

      await updateUserDataInFirestore(settingsToSave);

      // Show brief success indicator
      setSuccessMessage(texts[language].settingsSaved);
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error: any) {
      console.error("Auto-save error:", error);
      setErrorMessage("Auto-save failed");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (firebaseUser?.uid) {
        try {
          const userData = await getUserDataFromFirestore(firebaseUser.uid);
          if (userData) {
            setFirestoreUser(userData);

            // Apply language immediately if different
            if (userData.language && userData.language !== language) {
              setLanguage(userData.language);
            }

            setSettings((prev) => ({
              ...prev,
              language: userData.language || language,
              timezone: userData.timezone || "Europe/Budapest",
              profileVisibility:
                userData.settings?.profileVisibility || "public",
              showEmail: userData.settings?.showEmail ?? false,
              showLastSeen: userData.settings?.showLastSeen ?? true,
              allowMessages: userData.settings?.allowMessages ?? true,
              emailNotifications: userData.settings?.emailNotifications ?? true,
              pushNotifications: userData.settings?.pushNotifications ?? true,
              ideaUpdates: userData.settings?.ideaUpdates ?? true,
              comments: userData.settings?.comments ?? true,
              mentions: userData.settings?.mentions ?? true,
              autoSave: userData.settings?.autoSave ?? true,
              sessionTimeout: userData.settings?.sessionTimeout || 30,
              twoFactorAuth: userData.settings?.twoFactorAuth ?? false,
            }));
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      }
    };

    loadUserData();
  }, [firebaseUser, getUserDataFromFirestore, language, setLanguage]);

  // Auto-hide messages
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Enhanced handleSettingChange with immediate auto-save
  const handleSettingChange = (key: string, value: any) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);

    // Apply theme immediately
    if (key === "theme") {
      localStorage.setItem("theme", value);
      document.documentElement.classList.toggle("dark", value === "dark");
    }

    // Apply language immediately
    if (key === "language") {
      setLanguage(value as "hu" | "en");
    }

    // Auto-save with debouncing for better performance
    const timeoutId = setTimeout(() => {
      autoSaveSettings(updatedSettings);
    }, 500); // 500ms debounce

    // Cleanup function to prevent multiple saves
    return () => clearTimeout(timeoutId);
  };

  // Sync language atom with settings
  useEffect(() => {
    if (settings.language !== language) {
      setSettings((prev) => ({ ...prev, language }));
    }
  }, [language]);

  // Remove the data export, cache clear, and delete account functions remain the same...
  const handleExportData = async () => {
    try {
      const dataToExport = {
        profile: firestoreUser,
        settings: settings,
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `veho-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccessMessage(texts[language].dataExported);
    } catch (error) {
      setErrorMessage("Export failed");
    }
  };

  const handleClearCache = () => {
    if (window.confirm(texts[language].confirmations.clearCache)) {
      localStorage.removeItem("veho-cache");
      sessionStorage.clear();
      setSuccessMessage(texts[language].cacheCleared);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(texts[language].confirmations.deleteAccount)) {
      console.log("Delete account requested");
    }
  };

  if (!firebaseUser) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <Card className="glass max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <SettingsIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {texts[language].title}
            </h2>
            <p className="text-white/70 mb-6">
              Please sign in to access settings.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header - Remove the save button and hasChanges logic */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="glass text-white/90 hover:text-white"
                >
                  <Link to="/profile">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {texts[language].backToProfile}
                  </Link>
                </Button>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {texts[language].title}
              </h1>
              <p className="text-white/70 text-lg">
                {texts[language].subtitle}
              </p>
            </div>

            {/* Auto-save indicator */}
            <div className="flex items-center gap-2 text-white/60">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Auto-save enabled</span>
            </div>
          </div>

          {/* Success/Error Messages - Make them smaller and less intrusive */}
          {(successMessage || errorMessage) && (
            <div className="fixed top-4 right-4 z-50">
              <div
                className={`p-3 rounded-lg border transition-all duration-300 glass ${
                  errorMessage
                    ? "bg-red-500/20 border-red-500/50 text-red-200"
                    : "bg-green-500/20 border-green-500/50 text-green-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {errorMessage ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <p className="text-sm font-medium">
                    {errorMessage || successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Rest of the component remains exactly the same, just remove the save button logic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Appearance Settings */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  {texts[language].appearance}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="space-y-2">
                  <Label className="text-white/90 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {texts[language].language}
                  </Label>
                  <p className="text-white/60 text-sm">
                    {texts[language].languageDescription}
                  </p>
                  <Select
                    value={settings.language}
                    onValueChange={(value) =>
                      handleSettingChange("language", value)
                    }
                  >
                    <SelectTrigger className="glass border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/30">
                      <SelectItem value="hu">
                        🇭🇺 {texts[language].languages.hu}
                      </SelectItem>
                      <SelectItem value="en">
                        🇺🇸 {texts[language].languages.en}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme */}
                <div className="space-y-2">
                  <Label className="text-white/90 flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    {texts[language].theme}
                  </Label>
                  <p className="text-white/60 text-sm">
                    {texts[language].themeDescription}
                  </p>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) =>
                      handleSettingChange("theme", value)
                    }
                  >
                    <SelectTrigger className="glass border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/30">
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          {texts[language].themes.light}
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          {texts[language].themes.dark}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone */}
                <div className="space-y-2">
                  <Label className="text-white/90 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {texts[language].timezone}
                  </Label>
                  <p className="text-white/60 text-sm">
                    {texts[language].descriptions.timezone}
                  </p>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      handleSettingChange("timezone", value)
                    }
                  >
                    <SelectTrigger className="glass border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/30">
                      {Object.entries(texts[language].timezones).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {texts[language].privacy}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Visibility */}
                <div className="space-y-3">
                  <Label className="text-white/90 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {texts[language].profileVisibility}
                  </Label>
                  <p className="text-white/60 text-sm">
                    {texts[language].descriptions.profileVisibility}
                  </p>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) =>
                      handleSettingChange("profileVisibility", value)
                    }
                  >
                    <SelectTrigger className="glass border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/30">
                      <SelectItem value="public">
                        {texts[language].publicProfile}
                      </SelectItem>
                      <SelectItem value="private">
                        {texts[language].privateProfile}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Privacy Switches */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white/90 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {texts[language].showEmail}
                      </Label>
                    </div>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked) =>
                        handleSettingChange("showEmail", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white/90 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        {texts[language].showLastSeen}
                      </Label>
                    </div>
                    <Switch
                      checked={settings.showLastSeen}
                      onCheckedChange={(checked) =>
                        handleSettingChange("showLastSeen", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white/90 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        {texts[language].allowMessages}
                      </Label>
                    </div>
                    <Switch
                      checked={settings.allowMessages}
                      onCheckedChange={(checked) =>
                        handleSettingChange("allowMessages", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications & Account */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  {texts[language].notifications}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">
                      {texts[language].emailNotifications}
                    </Label>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">
                      {texts[language].ideaUpdates}
                    </Label>
                    <Switch
                      checked={settings.ideaUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange("ideaUpdates", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">
                      {texts[language].comments}
                    </Label>
                    <Switch
                      checked={settings.comments}
                      onCheckedChange={(checked) =>
                        handleSettingChange("comments", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-white/90">
                      {texts[language].mentions}
                    </Label>
                    <Switch
                      checked={settings.mentions}
                      onCheckedChange={(checked) =>
                        handleSettingChange("mentions", checked)
                      }
                    />
                  </div>
                </div>

                {/* Account Settings */}
                <div className="pt-4 border-t border-white/20">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {texts[language].account}
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-white/90">
                        {texts[language].autoSave}
                      </Label>
                      <Switch
                        checked={settings.autoSave}
                        onCheckedChange={(checked) =>
                          handleSettingChange("autoSave", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-white/90">
                        {texts[language].twoFactorAuth}
                      </Label>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          handleSettingChange("twoFactorAuth", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Management Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                {texts[language].data}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="glass border-white/30 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {texts[language].exportData}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleClearCache}
                  className="glass border-white/30 text-white hover:bg-white/20"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {texts[language].clearCache}
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="bg-red-500/20 border-red-500/30 text-red-200 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {texts[language].deleteAccount}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Settings;
