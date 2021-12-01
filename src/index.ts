#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { generate } from './commands/generate';
import { add } from './commands/add';
import { packageApp } from './commands/package';
import { testApp } from './commands/test';

yargs(hideBin(process.argv))
  .command('start', 'Start a new PWA or make an existing web app a PWA!', (yargs) => {
    return yargs
      .positional('type', {
        describe: 'lit is the only template currently, this is the version of the starter you would like to use',
        default: 'lit'
      })
      .positional('path', {
        describe: 'The path you would like to generate the application on. Example: /Projects',
        default: ''
      })
  }, (argv) => {
    if (argv.verbose) console.info(`generating using the ${argv.type} version`);
    try {
      generate(argv);
    }
    catch (err) {
      console.error(err);
    }
  })
  .command('add', 'add essentials such as a web manifest or service worker to an existing web app', (yargs) => {
    return yargs
    .positional('sw', {
      describe: 'Add a Service worker to your PWA',
    })
    .positional('manifest', {
      describe: 'Add a Web Manifest to your PWA',
    })
    .positional('url', {
      describe: 'Converting a live web app to a PWA? Generate a web manifest for it by just entering its URL',
    })
    .positional('icons', {
      describe: 'Generate splashscreen images and icons for your PWA',
    })
  }, (argv) => {
    add(argv);
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .command('package', 'Package your app for the Microsoft Store or Google Play Store!', (yargs) => {
    return yargs
    .positional('url', {
      describe: "This is the URL to your PWA"
    })
  }, (argv) => {
    packageApp(argv);
  })
  .command('test', 'Test your PWA to ensure you meet standard requirements', (yargs) => {
    return yargs
    .positional('manifest', {
      describe: "Test your Web Manifest"
    })
  }, (argv) => {
    testApp(argv);
  })
  .parse()