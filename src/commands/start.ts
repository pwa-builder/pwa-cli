import { Arguments } from "yargs";
import { prompt } from "inquirer";
import shell from "shelljs";
import open from "open";

import { generateStarterApp } from "../library/generate_utils";
import { generate_choice_question, generate_questions } from "../questions";
import { add } from "./add";

export async function generate(args: Arguments): Promise<void> {
  const choiceQuestion = await prompt(generate_choice_question);
  if (choiceQuestion.userChoice === "new") {
    try {
      const questions = await prompt(generate_questions);
      await generateStarterApp(questions, args);

      console.info(`
          Your new app has been generated! Check out our docs to get started building your new PWA!
          https://github.com/pwa-builder/pwa-starter/wiki
        `);
      await open("https://github.com/pwa-builder/pwa-starter/wiki");

      openInCode(questions);
    } catch (err) {
      console.error(`There was an error generating your new app: ${err}`);
    }
  } else if (choiceQuestion.userChoice === "existing") {
    add();
  }
}

function openInCode(questions) {
  if (!shell.which("code")) {
    return;
  } else {
    if (shell.exec(`cd ${questions.name} && code .`).code !== 0) {
      shell.echo("Error: opening in VSCode failed");
      shell.exit(1);
    }
  }
}
