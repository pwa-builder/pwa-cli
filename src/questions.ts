import { Question } from "./interfaces";

export const mani_questions: Array<Question> = [
  {
    type: "input",
    name: "name",
    message: "What is the name of your app?",
    default(): string {
      return "placeholder";
    },
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of your app?",
    default(): string {
      return "placeholder description";
    },
  },
  {
    type: "input",
    name: "theme_color",
    message:
      "What is the theme color of your app? This is normally the main color used in your app.",
    default(): string {
      return "none";
    },
  },
  {
    type: "input",
    name: "default_lang",
    message: "What is the default language of your app?",
    default(): string {
      return "en";
    },
  },
];

export const sw_questions: Array<Question> = [
  {
    type: "input",
    name: "build_dir",
    message:
      "What is the production build directory for your PWA? Normally this will be /dist",
    default(): string {
      return "/dist";
    },
  },
];

export const generate_questions: Array<Question> = [
  {
    type: "input",
    name: "name",
    message: "What is the name of your app?",
    default(): string {
      return "pwa-starter";
    },
  }
];

export const generate_choice_question: Array<Question> = [
  {
    type: "list",
    name: "userChoice",
    message: "Would you like to start a new PWA or make an existing web app a PWA?",
    choices: [
      {
        value: "new",
        name: "New PWA",
      },
      {
        value: "existing",
        name: "Make an existing web app a PWA",
      }
    ]
  }
]

export const package_questions: Array<Question> = [
  {
    type: "list",
    name: "platform",
    message: "Which platform did you want to package your app for?",
    choices: [
      {
        value: "windowsDev",
        name: "Windows 11 and 10 Test package",
      },
      {
        value: "windowsProd",
        name: "Microsoft Store ready package",
      },
      {
        value: "android",
        name: "Android package",
      },
    ],
  },
];

export const windows_dev_questions: Array<Question> = [
  {
    type: "input",
    name: "url",
    message: "What is the URL of your app?",
    default(): string {
      return "https://webboard.app";
    },
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of your app?",
    default(): string {
      return "pwa-starter";
    },
  },
];

export const windows_prod_questions: Array<Question> = [
  {
    type: "input",
    name: "url",
    message: "What is the URL of your app?",
    default(): string {
      return "https://webboard.app";
    },
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of your app?",
    default(): string {
      return "pwa-starter";
    },
  },
  {
    type: "input",
    name: "packageId",
    message: "What is the package ID of your app?",
  },
  {
    type: "input",
    name: "version",
    message: "What is the version number of your app? Example: 1.0.1?",
    default(): string {
      return "1.0.1";
    },
  },
  {
    type: "input",
    name: "classicVersion",
    message:
      "What should the version number be for the classic package? This must be lower than the main version number. Example: 1.0.0?",
    default(): string {
      return "1.0.0";
    },
  },
  {
    type: "input",
    name: "displayName",
    message:
      "What is your publisher display name?",
  },
  {
    type: "input",
    name: "publisherId",
    message:
      "What is your publisher ID?",
  },
];

export const icon_questions: Array<Question> = [
  // questions for icons
  {
    type: "input",
    name: "iconSrc",
    message:
      "What is the file path or URL to your existing icon? example: https://www.pwabuilder.com/assets/icons/icon_512.png",
    default(): string {
      return "https://www.pwabuilder.com/assets/icons/icon_512.png";
    },
  },
  {
    type: "input",
    name: "dir",
    message:
      "Where would you like your assets to be generated? example: /assets/icons",
    default(): string {
      return "/";
    },
  },
  {
    type: "input",
    name: "indexPath",
    message:
      "What is the path to your existing index.html file? (if you have one)",
    default(): string {
      return "/index.html";
    },
  },
  {
    type: "input",
    name: "manifest",
    message:
      "What is the path to your existing web manifest? (if you have one)",
    default(): string {
      return "/manifest.json";
    },
  },
];

export const add_questions: Array<Question> = [
  {
    type: "list",
    name: "addChoice",
    message: "What would you like to add to your web app?",
    choices: [
      {
        value: "serviceWorker",
        name: "A Service Worker",
      },
      {
        value: "manifest",
        name: "A Web Manifest",
      },
      {
        value: "icons",
        name: "Icons and Splash Screens",
      },
    ],
  },
  {
    type: "input",
    name: "appPath",
    message: "What is the path to the app you would like to add this resource too?"
  }
]
