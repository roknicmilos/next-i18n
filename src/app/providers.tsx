"use client";


import {TranslationsProvider} from "@/contexts/TranslationsContext";
import {ReactNode} from "react";
import {Dictionary} from "@/types/dictionary";
import {Language} from "@/types/Language";

interface ProvidersProps {
    children: ReactNode;
    dict: Dictionary;
    defaultDict: Dictionary;
    activeLanguage: Language;
}

/**
 * We use this client-side component to wrap the entire application with the necessary providers.
 * This component must be client-side only, because context classes use createContext hook which
 * is not supported on the server.
 */
export default function Providers(props: ProvidersProps) {
    const {children, dict, defaultDict, activeLanguage} = props;

    return (
        <TranslationsProvider dict={dict} defaultDict={defaultDict} activeLanguage={activeLanguage}>
            {children}
        </TranslationsProvider>
    );
}
