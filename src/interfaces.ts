export interface Manifest {
  background_color: string | undefined;
  description: string | undefined;
  dir: "auto" | "ltr" | "rtl" | string;
  display: string;
  lang: string | undefined;
  name: string | undefined;
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary"
    | null;
  prefer_related_applications?: boolean;
  related_applications?: RelatedApplication[];
  scope: string | undefined;
  short_name: string | undefined;
  start_url: string | undefined;
  theme_color: string | undefined;
  generated?: boolean | undefined;
  shortcuts?: ShortcutItem[];
  categories?: string[];
  screenshots?: Screenshot[];
  iarc_rating_id?: string;
  icons?: Icon[];
  share_target?: ShareTarget;

  // for custom properties as well as using object notations: manifest[key]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - accomodate custom entries... these can be a pain
  [key: string]: string | boolean | undefined | Array<any> | any;
}

export interface Manifest {
  background_color: string | undefined;
  description: string | undefined;
  dir: "auto" | "ltr" | "rtl" | string;
  display: string;
  lang: string | undefined;
  name: string | undefined;
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary"
    | null;
  prefer_related_applications?: boolean;
  related_applications?: RelatedApplication[];
  scope: string | undefined;
  short_name: string | undefined;
  start_url: string | undefined;
  theme_color: string | undefined;
  generated?: boolean | undefined;
  shortcuts?: ShortcutItem[];
  categories?: string[];
  screenshots?: Screenshot[];
  iarc_rating_id?: string;
  icons?: Icon[];
  share_target?: ShareTarget;

  // for custom properties as well as using object notations: manifest[key]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - accomodate custom entries... these can be a pain
  [key: string]: string | boolean | undefined | Array<any> | any;
}

export interface ShortcutItem {
  name: string;
  url: string;
  description?: string;
  short_name?: string;
  icons?: Icon[];
}

export interface Icon {
  src: string;
  generated?: boolean;
  type?: string;
  sizes?: string;
  purpose?: "any" | "maskable" | "monochrome";
  label?: string;
}

export interface Screenshot extends Icon {
  platform?:
    | "narrow"
    | "wide"
    | "android"
    | "chromeos"
    | "ios"
    | "kaios"
    | "macos"
    | "windows"
    | "xbox"
    | "chrome_web_store"
    | "play"
    | "itunes"
    | "microsoft-inbox"
    | "microsoft-store";
}

export interface RelatedApplication {
  platform: string;
  url?: string | null;
  id?: string | null;
  min_version?: string | null;
  fingerprints?: Fingerprint[];
}

export interface Fingerprint {
  type: string;
  value: string;
}

export interface ShareTarget {
  action?: string;
  method?: string;
  enctype?: string;
  params?: ShareTargetParams;
}

export interface ShareTargetParams {
  title?: string;
  text?: string;
  url?: string;
  files?: FilesParams[];
}

export interface ShortcutItem {
  name: string;
  url: string;
  description?: string;
  short_name?: string;
  icons?: Icon[];
}

export interface Icon {
  src: string;
  generated?: boolean;
  type?: string;
  sizes?: string;
  purpose?: "any" | "maskable" | "monochrome";
  label?: string;
}

export interface Screenshot extends Icon {
  platform?:
    | "narrow"
    | "wide"
    | "android"
    | "chromeos"
    | "ios"
    | "kaios"
    | "macos"
    | "windows"
    | "xbox"
    | "chrome_web_store"
    | "play"
    | "itunes"
    | "microsoft-inbox"
    | "microsoft-store";
}

export interface RelatedApplication {
  platform: string;
  url?: string | null;
  id?: string | null;
  min_version?: string | null;
  fingerprints?: Fingerprint[];
}

export interface Fingerprint {
  type: string;
  value: string;
}

export interface ShareTarget {
  action?: string;
  method?: string;
  enctype?: string;
  params?: ShareTargetParams;
}

export interface ShareTargetParams {
  title?: string;
  text?: string;
  url?: string;
  files?: FilesParams[];
}

export interface FilesParams {
  name: string;
  accept: string[];
}

export interface Question {
  type: string;
  name: string;
  message: string;
  default?: Function;
  choices?: string[] | object[];
  validate?: Function;
}