import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import { Arguments } from "yargs";
import { prompt } from "inquirer";

import {
  package_questions,
  windows_dev_questions,
  windows_prod_questions,
} from "../questions";
import { getPublisherMsix, getSimpleMsix, packageForWindows } from "../library/package_utils";

export async function packageApp(args: Arguments): Promise<void> {
  const answers = await prompt(package_questions);

  switch (answers.platform) {
    case "windowsDev":
      const windows_answers = await prompt(windows_dev_questions);

      const options = await getSimpleMsix(
        windows_answers.url,
        windows_answers.name
      );
      const response = await packageForWindows(options);

      const responseData = await response.blob();

      await writeMSIXToFile(responseData, "windows-dev.zip");

      break;
    case "windowsProd":
      const windows_prod_answers = await prompt(windows_prod_questions);

      const prod_options = await getPublisherMsix(
        windows_prod_answers.url,
        windows_prod_answers.name,
        windows_prod_answers.packageId,
        windows_prod_answers.packageVersion,
        windows_prod_answers.classicVersion,
        windows_prod_answers.displayName,
        windows_prod_answers.publisherId
      );
      const prodResponse = await packageForWindows(prod_options);

      await prodResponse.blob();

      await writeMSIXToFile(responseData, "windows-prod.zip");

      break;
    case "android":
      console.log("android");
      break;
    default:
      console.log("default");
      break;
  }
}

async function writeMSIXToFile(responseData: Blob, name: string): Promise<void> {
  try {
    await writeFile(
      "windows-dev.zip",
      Buffer.from(await responseData.arrayBuffer())
    );
  } catch (err) {
    console.error(`There was an error packaging your app: ${err}`);
  }
}