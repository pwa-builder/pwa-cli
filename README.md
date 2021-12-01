# PWABuilder CLI

## Currently in alpha, because of this we cannot guarantee there will not be breaking changes in the near future

This tool enables you to use all the features of PWABuilder in a command line tool! 
For example, using this CLI you can:

- Start a brand new PWA using the [PWABuilder pwa-starter](https://github.com/pwa-builder/pwa-starter)

- Make an existing web app a PWA by adding a Web Manifest, Service Worker (Powered by Workbox), and generating your own Icons and Splashscreen images!

- Test your PWA to ensure it meets all of the technical requirements to be both installable by the user in the browser, and to see if your PWA is ready to be shipped to app stores!

- Package your PWA for the Microsoft Store, Google Play Store, and the Apple App store!

### Installation

First, ensure you have [Node.js and NPM installed](https://nodejs.org/en/)
Once you have Node and NPM installed, you can now install our CLI by running the following command:

`
 npm install -g pwabuilder-cli
`

After installing the CLI, you can run `pwabuilder --version` to ensure that it was installed correctly.

### Usage

### Commands

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Command&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Description** |
| ------------------------- | --------------- |
| `start` | Will give you two options, either to start a brand new PWA using the [PWABuilder pwa-starter](https://github.com/pwa-builder/pwa-starter), or to make an existing web app a PWA. |
| `add` | Add a Web Manifest, Service Worker (Powered by [Workbox](https://developers.google.com/web/tools/workbox/)), and Icons and Splash Screen images |
| `test` | Test your PWA to ensure that it meets the technical standards needed to be installable and shipped to the stores|
| `package` | Package your PWA for the Microsoft Store, Google Play store and the Apple App Store!|