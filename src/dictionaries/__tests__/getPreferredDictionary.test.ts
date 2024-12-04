import { expect } from "@jest/globals";
import { getPreferredDictionary } from "@/dictionaries";
import englishDict from "@/dictionaries/en.json";
import dutchDict from "@/dictionaries/nl.json";
import germanDict from "@/dictionaries/de.json";
import { cookies } from "next/headers";
import { languages } from "@/config/locales";
import { deepMerge } from "@/utils/object";


jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("getPreferredDictionary", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(cookies).mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    } as any);
  });

  it("ReturnS default dictionary", async () => {
    // When the "Preferred-Language" cookie doesn't exist,
    // the default (English) dictionary should be used.
    // mockPreferredLanguageCookie(undefined);
    const actualDict = await getPreferredDictionary();
    expect(actualDict).toStrictEqual(englishDict);
  });

  it("Returns English dictionary", async () => {
    // When the "Preferred-Language" cookie contains English,
    // the English dictionary should be used.
    jest.mocked(cookies).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: languages.english.locale }),
    } as any);
    const actualDict = await getPreferredDictionary();
    expect(actualDict).toStrictEqual(englishDict);
  });

  it("Returns Dutch dictionary", async () => {
    // When the "Preferred-Language" cookie contains Dutch,
    // the Dutch dictionary should be used.
    jest.mocked(cookies).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: languages.dutch.locale }),
    } as any);
    const actualDict = await getPreferredDictionary();
    const expectedDict = deepMerge(englishDict, dutchDict);
    expect(actualDict).toStrictEqual(expectedDict);
  });

  it("Return German dictionary", async () => {
    // When the "Preferred-Language" cookie contains German,
    // the German dictionary should be used.
    jest.mocked(cookies).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: languages.german.locale }),
    } as any);
    const actualDict = await getPreferredDictionary();
    const expectedDict = deepMerge(englishDict, germanDict);
    expect(actualDict).toStrictEqual(expectedDict);
  });

});
