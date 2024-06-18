// src/services/AuthenticationService.ts
import fbAuth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";

class AuthenticationService {
  public loading: boolean = false;
  public user: FirebaseAuthTypes.User | null = null; // You can define the User type according to your needs.
  public error: string | null = null;
  public hasInitialized: boolean = false;

  // Constructor or any other methods you need
  constructor() {
    makeAutoObservable(this);

    this.initialize();

    // listen to firebase auth state changes
    fbAuth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", user);

      runInAction(() => {
        this.user = user;
      });
    });
  }

  public setUser = (user: FirebaseAuthTypes.User | null) => {
    this.user = user;
  };

  public signup = async (email?: string, password?: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    return await fbAuth().createUserWithEmailAndPassword(email, password);
  };

  async login(username?: string, password?: string): Promise<void> {
    if (!username && !password) {
      throw new Error("Username and password are required");
    }

    if (!username) {
      throw new Error("Username is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    await fbAuth().signInWithEmailAndPassword(username, password);
  }

  async logout(): Promise<void> {
    // Implement your logout logic here
    await fbAuth().signOut();
  }

  async initialize(): Promise<void> {
    // Implement initialization logic (e.g., check if the user is already authenticated)

    this.hasInitialized = true;
  }

  public get isAuthenticated(): boolean {
    return !!this.user;
  }

  // Other utility methods and getters/setters if needed
}

export default new AuthenticationService();
