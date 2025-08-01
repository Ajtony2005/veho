import { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {
  displayName?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
