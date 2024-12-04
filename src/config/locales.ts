import { Language } from "@/types/Language";


interface Languages {
  english: Language;
  dutch: Language;
  german: Language;
}

export const languages: Languages = {
  dutch: {
    locale: "nl",
    label: "Nederlands",
  },
  english: {
    locale: "en",
    label: "English",
  },
  german: {
    locale: "de",
    label: "Deutsch",
  },
};

export const defaultLanguage = languages.english;

export const locales: string[] = Object.values(languages).map((language) => language.locale);
