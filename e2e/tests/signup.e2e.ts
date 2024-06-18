import { by, element, expect } from "detox";
import { auth } from "firebase-admin";

const admin = require("firebase-admin");

const serviceAccount =
  process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
  require("../firebaseadmin-privatekey.json");

const { openApp } = require("../utils/openApp");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

describe("Sign Up Flow", () => {
  beforeAll(async () => {
    await openApp();

    auth()
      .getUserByEmail("testsignupflow@gmail.com")
      .then(async (user) => {
        if (user) {
          await auth().deleteUser(user.uid);
        }
      })
      .catch();
  });

  it("should be able to sign up", async () => {
    await element(by.id("signin-screen-signup-button")).tap();

    await expect(element(by.id("signup-screen"))).toBeVisible();

    await element(by.id("signup-email-input")).typeText(
      "testsignupflow@gmail.com",
    );

    await element(by.id("signup-password-input")).replaceText(
      "!!!fA020524fA!!!",
    );

    await element(by.id("signup-confirm-password-input")).replaceText(
      "!!!fA020524fA!!!",
    );

    await element(by.id("signup-submit-button")).tap();

    await waitFor(element(by.id("home-screen")))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id("home-screen"))).toBeVisible();

    await element(by.id("home-screen-logout-button")).tap();
  });
});
