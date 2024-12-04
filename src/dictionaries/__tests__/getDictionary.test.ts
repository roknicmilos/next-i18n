import { expect } from "@jest/globals";
import { getDictionary } from "@/dictionaries";
import englishDict from "@/dictionaries/en.json";
import dutchDict from "@/dictionaries/nl.json";
import germanDict from "@/dictionaries/de.json";
import { languages } from "@/config/locales";
import { deepMerge } from "@/utils/object";


describe("getDictionary", () => {

  it("Returns English dictionary", async () => {
    const actualDict = await getDictionary(languages.english.locale);
    expect(actualDict).toStrictEqual(englishDict);
  });

  it("Returns Dutch dictionary", async () => {
    const actualDict = await getDictionary(languages.dutch.locale);
    const expectedDict = deepMerge(englishDict, dutchDict);
    expect(actualDict).toStrictEqual(expectedDict);
  });

  it("Returns German dictionary", async () => {
    const actualDict = await getDictionary(languages.german.locale);
    const expectedDict = deepMerge(englishDict, germanDict);
    expect(actualDict).toStrictEqual(expectedDict);
  });

});
