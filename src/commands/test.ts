import { readFile } from "fs/promises";
import { Arguments } from "yargs";

export async function testApp(args: Arguments): Promise<void> {
  if (args.manifest) {
    const results = await testManifest();

    const fails: any[] = [];
    results.map((result) => {
      if (!result.result) {
        fails.push(result);
      }
    });

    if (fails.length > 0) {
      fails.map((fail) => {
        if (fail.category === "required") {
          console.log(
            `${fail.infoString} - WARNING: Your PWA is not installable without this property`
          );
        }
        else if (fail.category === "recommended") {
          console.log(
            `${fail.infoString} - Adding or fixing this will improve your web manifest`
          );
        }
      })
    } else {
      console.log("All tests passed!");
    }
  }
}

async function testManifest(): Promise<any[]> {
  const manifestFile = await readFile("manifest.json", "utf8");
  
  const manifest = JSON.parse(manifestFile);

  return [
    {
      infoString: "Lists icons for add to home screen",
      result: manifest.icons && manifest.icons.length > 0 ? true : false,
      category: "required",
    },
    {
      infoString: "Contains name property",
      result: manifest.name && manifest.name.length > 1 ? true : false,
      category: "required",
    },
    {
      infoString: "Contains short_name property",
      result:
        manifest.short_name && manifest.short_name.length > 1 ? true : false,
      category: "required",
    },
    {
      infoString: "Designates a start_url",
      result:
        manifest.start_url && manifest.start_url.length > 0 ? true : false,
      category: "required",
    },
    {
      infoString: "Specifies a display mode",
      result:
        manifest.display &&
        ["fullscreen", "standalone", "minimal-ui", "browser"].includes(
          manifest.display
        )
          ? true
          : false,
      category: "recommended",
    },
    {
      infoString: "Has a background color",
      result: manifest.background_color ? true : false,
      category: "recommended",
    },
    {
      infoString: "Has a theme color",
      result: manifest.theme_color ? true : false,
      category: "recommended",
    },
    {
      infoString: "Specifies an orientation mode",
      result:
        manifest.orientation && isStandardOrientation(manifest.orientation)
          ? true
          : false,
      category: "recommended",
    },
    {
      infoString: "Contains screenshots for app store listings",
      result:
        manifest.screenshots && manifest.screenshots.length > 0 ? true : false,
      category: "recommended",
    },
    {
      infoString: "Has a square PNG icon 512x512 or larger",
      result:
        manifest.icons &&
        manifest.icons.some((i) => i.sizes.includes("512x512") ? true : false),
      category: "required",
    },
    {
      infoString: "Has a maskable PNG icon 512x512 or larger",
      result: () => {
        if (manifest.icons) {
          const maskIcon = (manifest.icons as any[]).some(
            (i) => i.purpose === "maskable" && i.sizes.includes("512x512")
          );
          if (maskIcon) {
            return true;
          } else {
            return false;
          }
        }
      },
      category: "recommended",
    },
    {
      infoString: "Lists shortcuts for quick access",
      result:
        manifest.shortcuts && manifest.shortcuts.length > 0 ? true : false,
      category: "recommended",
    },
    {
      infoString: "Contains categories to classify the app",
      result:
        manifest.categories &&
        manifest.categories.length > 0 &&
        containsStandardCategory(manifest.categories)
          ? true
          : false,
      category: "recommended",
    },
    {
      infoString: "Icons specify their type",
      result: !!manifest.icons && manifest.icons.every((i) => !!i.type),
      category: "recommended",
    },
    {
      infoString: "Icons specify their size",
      result: !!manifest.icons && manifest.icons.every((i) => !!i.sizes),
      category: "recommended",
    },
    {
      infoString: "Contains an IARC ID",
      result: manifest.iarc_rating_id ? true : false,
      category: "optional",
    },
    {
      infoString: "Specifies related_applications",
      result:
        manifest.related_applications &&
        manifest.related_applications.length > 0
          ? true
          : false,
      category: "optional",
    },
  ];
}

function containsStandardCategory(categories: string[]): boolean {
  // https://github.com/w3c/manifest/wiki/Categories
  const standardCategories = [
    "books",
    "business",
    "education",
    "entertainment",
    "finance",
    "fitness",
    "food",
    "games",
    "government",
    "health",
    "kids",
    "lifestyle",
    "magazines",
    "medical",
    "music",
    "navigation",
    "news",
    "personalization",
    "photo",
    "politics",
    "productivity",
    "security",
    "shopping",
    "social",
    "sports",
    "travel",
    "utilities",
    "weather",
  ];
  return categories.some((c) => standardCategories.includes(c));
}

function isStandardOrientation(orientation: string) {
  const standardOrientations = [
    "any",
    "natural",
    "landscape",
    "landscape-primary",
    "landscape-secondary",
    "portrait",
    "portrait-primary",
    "portrait-secondary",
  ];
  return standardOrientations.includes(orientation);
}
