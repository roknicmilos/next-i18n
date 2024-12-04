import {createContext, ReactNode} from "react";
import {Dictionary} from "@/types/dictionary";
import {Language} from "@/types/Language";


export interface TranslationsContextProps {
    dict: Dictionary;
    defaultDict: Dictionary;
    activeLanguage: Language;
}

export const TranslationsContext = createContext<TranslationsContextProps>(
    {} as TranslationsContextProps,
);

interface TranslationsProviderProps {
    children: ReactNode;
    dict: Dictionary;
    defaultDict: Dictionary;
    activeLanguage: Language;
}

export const TranslationsProvider = (props: TranslationsProviderProps) => {
    const {children, dict, defaultDict, activeLanguage} = props;

    return (
        <TranslationsContext.Provider value={{dict, defaultDict, activeLanguage}}>
            {children}
        </TranslationsContext.Provider>
    );
};
