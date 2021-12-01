import { existsSync, writeFile } from "fs";
import { Arguments } from "yargs";
import { prompt } from "inquirer";

import { createManifestFromPageOrEmpty } from "../library/manifest_utils";
import { runWorkboxTool } from "../library/service_worker_utils";
import {
  add_questions,
  icon_questions,
  mani_questions,
  sw_questions,
} from "../questions";
import { Manifest } from "../interfaces";
import { generateIcons } from "../library/icon_utils";

async function handleServiceWorker(): Promise<void> {
  const answers = await prompt(sw_questions);

  if (answers && answers.build_dir) {
    const existsFlag = existsSync(answers.build_dir);
    if (existsFlag === true) {
      try {
        await runWorkboxTool(answers);

        console.log(
          `
          Successfully generated a service worker for your PWA. Add the following to your index.html:
          <script>
            // Check that service workers are supported
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/pwabuilder-sw.js');
              });
            }
          </script>
          `
        );
        console.log(
          `
           If your app uses a bundler (such as Rollup or Webpack), we recommend checking out the following docs https://developers.google.com/web/tools/workbox/guides/using-bundlers
          `
        );
      } catch (err) {
        console.error(`Error adding a service worker: ${err}`);
      }
    } else {
      console.error(`The directory ${answers.build_dir} does not exist.`);
    }
  }
}

async function handleIcons(): Promise<void> {
  const answers = await prompt(icon_questions);

  if (answers) {
    try {
      await generateIcons(answers);
    } catch (err) {
      console.error(`Could not generate assets for your PWA: ${err}`);
    }
  }
}

export async function handleManifest(args?: Arguments): Promise<void> {
  const answers = await prompt(mani_questions);

  const working_mani: Manifest = {
    dir: "auto",
    display: "standalone",
    name: answers.name,
    short_name: answers.name,
    start_url: "/",
    scope: "/",
    lang: answers.default_lang,
    description: answers.description,
    theme_color: answers.theme_color,
    background_color: answers.theme_color,
    icons: [],
    screenshots: [],
  };

  try {
    if (args && args.url) {
      createManifestFromPageOrEmpty(args.url as string).then((manifest) => {
        writeFile("manifest.json", JSON.stringify(manifest, null, 4), (err) => {
          if (err) {
            throw new Error(err.toString());
          } else {
            console.log(
              `Manifest file created. Please add the following to your index.html file: 
               <link rel="manifest" href="manifest.json">
              `
            );
          }
        });
      });
    } else {
      writeFile(
        "manifest.json",
        JSON.stringify(working_mani, null, 4),
        (err) => {
          if (err) {
            throw new Error(err.toString());
          } else {
            console.log(
              `Manifest file created. Please add the following to your index.html file: 
               <link rel="manifest" href="manifest.json">
              `
            );
          }
        }
      );
    }
  } catch (err) {
    console.error(`Error adding a manifest: ${err}`);
  }
}

export async function add(args?: Arguments): Promise<void> {
  if (args && args.sw || args && args.serviceWorker) {
    await handleServiceWorker();
  } else if (args && args.manifest) {
    await handleManifest(args);
  } else if (args && args.icons) {
    await handleIcons();
  } else {
    const answers = await prompt(add_questions);

    switch (answers.addChoice) {
      case "manifest":
        await handleManifest(args);
        break;
      case "icons":
        await handleIcons();
        break;
      case "serviceWorker":
        await handleServiceWorker();
        break;
      default:
        console.error(`${answers.addChoice} is not a valid choice.`);
        break;
    }
  }
}
