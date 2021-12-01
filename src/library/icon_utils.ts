const pwaAssetGenerator = require("pwa-asset-generator");

export async function generateIcons(answers) {
  const { savedImages, htmlMeta, manifestJsonContent } =
    await pwaAssetGenerator.generateImages(answers.iconSrc, answers.dir, {
      scrape: false,
      splashOnly: false,
      portraitOnly: true,
      log: true,
      manifest: answers.manifestPath,
      index: answers.indexPath,
    });

    return {
      savedImages,
      htmlMeta,
      manifestJsonContent
    }
}
