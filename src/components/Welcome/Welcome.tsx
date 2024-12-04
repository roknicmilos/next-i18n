"use client";

import {useDictionary} from "@/hooks/useDictionary";
import LanguageMenu from "@/components/LanguageMenu/LanguageMenu";
import styles from "./Welcome.module.css";


export default function Welcome() {
    const {dict} = useDictionary()
    return (
        <div className={styles.welcomeContent}>
            <h1>{dict.welcome.title}{" "}👋</h1>
            <LanguageMenu/>
            <p>{dict.welcome.introText}</p>
        </div>
    );
}
