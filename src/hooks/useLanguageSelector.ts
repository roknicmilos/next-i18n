import {useDictionary} from "@/hooks/useDictionary";
import {usePathname} from "next/navigation";
import {Language} from "@/types/Language";
import {redirect} from "@/utils/routing";


interface UseLanguageSelectorReturnValues {
    changeLanguage: (language: Language) => void;
    activeLanguage: any;
}

export function useLanguageSelector(): UseLanguageSelectorReturnValues {
    const {activeLanguage} = useDictionary();
    const pathname = usePathname();


    function changeLanguage(newLanguage: Language) {
        if (activeLanguage !== newLanguage) {
            redirect(pathname.replace(`/${activeLanguage.locale}`, `/${newLanguage.locale}`));
        }
    }

    return {changeLanguage, activeLanguage};
}
