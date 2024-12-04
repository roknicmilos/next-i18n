import {WelcomeDictionary} from "./WelcomeDictionary";
import {LanguageMenuDictionary} from "@/types/dictionary/LanguageMenu";

export interface Dictionary {
    languageMenu: LanguageMenuDictionary;
    welcome: WelcomeDictionary;
}
