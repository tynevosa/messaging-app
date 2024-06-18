const { resolveConfig } = require("detox/internals");

const appConfig = require("../../app.config");

const platform = device.getPlatform();

module.exports.openApp = async function openApp() {
  const config = await resolveConfig();
  if (config.configurationName.split(".")[1] === "debug") {
    return await openAppForDebugBuild(platform);
  } else {
    return await device.launchApp({
      newInstance: true,
    });
  }
};

async function openAppForDebugBuild(platform: string) {
  const deepLinkUrl = process.env.EXPO_USE_UPDATES
    ? // Testing latest published EAS update for the test_debug channel
      getDeepLinkUrl(getLatestUpdateUrl())
    : // Local testing with packager
      getDeepLinkUrl(getDevLauncherPackagerUrl(platform));

  if (platform === "ios") {
    await device.launchApp({
      newInstance: true,
    });
    sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,
    });
  }

  await sleep(3000);
}

const getDeepLinkUrl = (url: string) => {
  return `expo+expo-starter-kit://expo-development-client/?url=${encodeURIComponent(
    url,
  )}`;
};

const getDevLauncherPackagerUrl = (platform: string) => {
  if (platform === "android" && !process.env.GOOGLE_SERVICES_PLIST) {
    return `http://10.0.2.2:8081?dev=true&minify=false&disableOnboarding=1`;
  }

  return `http://localhost:8081?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;
};

const getLatestUpdateUrl = () => {
  return `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;
};

const getAppId = () => appConfig?.expo?.extra?.eas?.projectId ?? "";

const sleep = (t: any) => new Promise((res) => setTimeout(res, t));
