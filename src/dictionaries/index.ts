import "server-only";
import {defaultLanguage, languages} from "@/config/locales";
import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {deepMerge} from "@/utils/object";
import {Dictionary} from "@/types/dictionary";
import {RecursivePartial} from "@/types/RecursivePartial";
import {Language} from "@/types/Language";


type DictionaryLoaders = {
    en: () => Promise<Dictionary>;
    nl: () => Promise<RecursivePartial<Dictionary>>;
    de: () => Promise<RecursivePartial<Dictionary>>;
};

const dictionaries: DictionaryLoaders = {
    en: () => import("./en.json").then((module) => module.default),
    nl: () => import("./nl.json").then((module) => module.default),
    de: () => import("./de.json").then((module) => module.default),
};

/**
 * Get the dictionary by the preferred language cookie.
 * If the cookie doesn't exist, the default dictionary will be used.
 */
export async function getPreferredDictionary(): Promise<Dictionary> {
    const language = getActiveLanguage();
    return getDictionary(language.locale);
}

// TODO: TEST | add tests for this function (and refactor tests for getPreferredDictionary function)
export function getActiveLanguage(): Language {
    const preferredLanguageCookie = getPreferredLanguageCookie();
    const locale = preferredLanguageCookie?.value;
    return Object.values(languages).find((language) => language.locale === locale) || defaultLanguage;
}

/**
 * Because the server needs to know which language to use, a cookie is used
 * to store the preferred language of the user.
 * Server needs to know which language to use because translations are located
 * in JSON files available on the server.
 */
function getPreferredLanguageCookie(): RequestCookie | undefined {
    const cookieStore = cookies();
    return cookieStore.get("Preferred-Language");
}

/**
 * Get the dictionary for the given locale.
 * If the dictionary doesn't contain a necessary key,
 * the default dictionary will be used.
 */
export async function getDictionary(locale: string): Promise<Dictionary> {
    const defaultDictionary = await dictionaries[defaultLanguage.locale as keyof DictionaryLoaders]();
    const selectedDictionary = await dictionaries[locale as keyof DictionaryLoaders]();
    return deepMerge(defaultDictionary, selectedDictionary) as Dictionary;
}

export async function getDefaultDictionary(): Promise<Dictionary> {
    const defaultDictionary = await dictionaries[defaultLanguage.locale as keyof DictionaryLoaders]();
    return defaultDictionary as Dictionary;
}
