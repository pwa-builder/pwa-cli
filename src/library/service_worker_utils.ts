const workboxBuild = require("workbox-build");

export function runWorkboxTool(answers) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await workboxBuild.generateSW({
        globDirectory: answers.build_dir,
        globPatterns: ["**/*.{html,json,js,css}"],
        inlineWorkboxRuntime: true,
        swDest: "pwabuilder-sw.js",
      });
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}
