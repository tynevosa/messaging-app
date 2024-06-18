import { by, element, expect } from "detox";
import { auth, FirebaseError } from "firebase-admin";

const admin = require("firebase-admin");

const serviceAccount =
  process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
  require("../firebaseadmin-privatekey.json");

const { openApp } = require("../utils/openApp");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

describe("Sign In Flow", () => {
  beforeAll(async () => {
    await openApp();

    await auth()
      .getUserByEmail("testsigninflow@gmail.com")
      .catch(async (error: FirebaseError) => {
        if (error.code === "auth/user-not-found") {
          return await auth().createUser({
            email: "testsigninflow@gmail.com",
            password: "020524fA!",
          });
        }
      });
  });

  it("should be able to sign in and out", async () => {
    device.takeScreenshot("app loaded");

    await expect(element(by.id("signin-screen"))).toBeVisible();

    // sign into the app
    await element(by.id("signin-email-input")).typeText(
      "testsigninflow@gmail.com",
    );
    await element(by.id("signin-password-input")).typeText("020524fA!");
    await element(by.id("signin-submit-button")).tap();

    // wait for navigation
    await waitFor(element(by.id("home-screen")))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id("home-screen"))).toBeVisible();

    device.takeScreenshot("home screen loaded");

    await element(by.id("home-screen-logout-button")).tap();

    await expect(element(by.id("signin-screen"))).toBeVisible();

    device.takeScreenshot("logged out");
  });

  it("should show error message when sign in fails", async () => {
    device.takeScreenshot("app loaded");

    await expect(element(by.id("signin-screen"))).toBeVisible();

    // sign into the app
    await element(by.id("signin-email-input")).typeText(
      "testsigninflow@gmail.com",
    );
    await element(by.id("signin-password-input")).typeText("wrongpassword");
    await element(by.id("signin-submit-button")).tap();

    await expect(element(by.id("signin-error-message"))).toBeVisible();
  });

  it("should be able to navigate to signup screen", async () => {
    await element(by.id("signin-screen-signup-button")).tap();

    await expect(element(by.id("signup-screen"))).toBeVisible();
  });
});
