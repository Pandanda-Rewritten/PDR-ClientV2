// Electron Forge will `require()` every maker listed in the config.
// Some makers (notably Squirrel) are Windows-only and will not install on macOS/Linux.
// To keep cross-platform CI green, only include makers for the current platform.

const makers = [];

if (process.platform === "win32") {
  makers.push({
    name: "@electron-forge/maker-squirrel",
    config: {
      // NuGet package id must not contain spaces
      name: "PandandaRewritten",
      authors: "PDR Team",
      loadingGif: "./src/assets/pdr.png",
      setupIcon: "./lib/icons/icon.ico",
    },
  });
}

if (process.platform === "darwin") {
  makers.push({ name: "@electron-forge/maker-zip", platforms: ["darwin"] });
  makers.push({
    name: "@electron-forge/maker-dmg",
    platforms: ["darwin"],
    config: { format: "ULFO" },
  });
}

if (process.platform === "linux") {
  makers.push({ name: "@electron-forge/maker-deb", platforms: ["linux"], config: {} });
  makers.push({ name: "@electron-forge/maker-rpm", platforms: ["linux"], config: {} });
  makers.push({
    name: "@electron-forge/maker-flatpak",
    platforms: ["linux"],
    config: {
      genericName: "Pandanda Rewritten",
      productName: "Pandanda Rewritten",
      categories: ["Game"],
      modules: [
        {
          name: "zypak",
          sources: [{ type: "git", url: "https://github.com/refi64/zypak", tag: "v2022.04" }],
        },
      ],
      runtimeVersion: "22.08",
      baseVersion: "22.08",
      icon: "./lib/icons/icon.ico",
    },
  });
}

module.exports = {
  packagerConfig: {
    icon: "lib/icons/icon.icns",
  },
  makers,
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Pandanda-Rewritten",
          name: "PDR-ClientV2",
        },
        prerelease: true,
      },
    },
  ],
};

