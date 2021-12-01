import { Manifest } from "../interfaces";
import fetch from "node-fetch";

export const defaultManifest: Manifest = {
  dir: "auto",
  display: "standalone",
  name: "placeholder",
  short_name: "placeholder",
  start_url: "/",
  scope: "/",
  lang: "en",
  description: "placeholder description",
  theme_color: "none",
  background_color: "none",
  icons: [],
  screenshots: [],
};

export async function createManifestFromPageOrEmpty(
  url: string
): Promise<Manifest> {
  try {
    const response = await fetch(
      `https://pwabuilder-manifest-creator.azurewebsites.net/api/create?url=${url}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );

    const createdManifest = (await response.json()) as Manifest;
    return createdManifest;
  } catch (err) {
    console.error(
      `Manifest creation service failed to create the manifest. Falling back to empty manifest.`,
      err
    );
    return defaultManifest;
  }
}
