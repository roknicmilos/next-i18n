"use client";

import {useDictionary} from "@/hooks/useDictionary";
import {languages} from "@/config/locales";
import {useLanguageSelector} from "@/hooks/useLanguageSelector";
import styles from "./LanguageMenu.module.css";

export default function LanguageMenu() {
    const {dict} = useDictionary()
    const {changeLanguage, activeLanguage} = useLanguageSelector();

    return (
        <>
            <p>{dict.languageMenu.activeLanguage.label}{" "}{activeLanguage.label}</p>
            <p>{dict.languageMenu.changeLanguage.label}</p>
            <ul>
                {Object.entries(languages).map(([key, value]) => (
                    <li key={key}>
                        <button className={styles.languageButton} onClick={() => changeLanguage(value)}>
                            {value.label}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
