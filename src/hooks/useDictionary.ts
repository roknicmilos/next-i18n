import { useContext } from "react";
import {TranslationsContext, TranslationsContextProps} from "@/contexts/TranslationsContext";


export function useDictionary(): TranslationsContextProps {
  return useContext(TranslationsContext);
}
