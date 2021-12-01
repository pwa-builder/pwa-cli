import shell from "shelljs";
import { Arguments } from "yargs";

const mainCommand = "git clone https://github.com/pwa-builder/pwa-starter.git";

export function generateStarterApp(answers, args: Arguments): void {
  try {
    if (!shell.which("git")) {
      shell.echo(
        "Sorry, this command requires git. To install git, check here https://git-scm.com/"
      );
      shell.exit(1);
    }

    if (
      shell.exec(`${mainCommand} ${answers.name} ${args.path}`).code !== 0
    ) {
      shell.echo("Error: Git clone failed");
      shell.exit(1);
    }
    else {
      if (!shell.which("npm")) {
        shell.echo(
          "Sorry, this command requires npm. To install npm, check here https://www.npmjs.com/"
        );
        shell.exit(1);
      }

      if (
        shell.exec(`cd ${answers.name} && npm install`).code !== 0
      ) {
        shell.echo("Error: npm install failed");
        shell.exit(1);
      }
    }
  } catch (err) {
    throw new Error(`Error generating a new pwa-starter project: ${err}`);
  }
}
