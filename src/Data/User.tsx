// Define UserLanguage type (example: union of language codes)
export type UserLanguage = "en" | "hu";

export interface UserSettings {
  // Privacy settings
  profileVisibility?: "public" | "private";
  showEmail?: boolean;
  showLastSeen?: boolean;
  allowMessages?: boolean;

  // Notification settings
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  ideaUpdates?: boolean;
  comments?: boolean;
  mentions?: boolean;

  // Account settings
  autoSave?: boolean;
  sessionTimeout?: number;
  twoFactorAuth?: boolean;
}

export interface User {
  uid?: string; // Firebase UID
  email: string | null; // Email can be null from some providers
  displayName: string | null; // Felhasználónév vagy név
  photoURL?: string | null; // Profilkép URL
  createdAt?: string; // Létrehozás időpontja (ISO string)
  updatedAt?: string; // Frissítés időpontja (ISO string)
  bio?: string; // Rövid bemutatkozás
  role?: "user" | "admin" | "moderator"; // Szerepkör
  language?: UserLanguage; // Preferált nyelv
  lastLoginAt?: string; // Utolsó bejelentkezés időpontja (ISO string)
  isActive?: boolean; // Fiók aktív-e
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  }; // Közösségi média linkek
  ideasCount?: number; // Megosztott ötletek száma
  timezone?: string; // Időzóna (pl. "Europe/Budapest")

  // Settings object for personal preferences
  settings?: UserSettings;

  // Account linking fields
  providers?: string[]; // Array of auth providers used: ['email', 'google', 'facebook', 'github']
  primaryProvider?: string; // Primary authentication method
  linkedAccounts?: {
    google?: {
      uid: string;
      email: string | null;
      displayName?: string;
      photoURL?: string;
    };
    facebook?: {
      uid: string;
      email: string | null;
      displayName?: string;
      photoURL?: string;
    };
    github?: {
      uid: string;
      email: string | null;
      displayName?: string;
      photoURL?: string;
    };
    email?: {
      uid: string;
      email: string;
      displayName?: string;
    };
  };
}
