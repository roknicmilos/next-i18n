import { expect } from "@jest/globals";
import englishDict from "@/dictionaries/en.json";
import {getDefaultDictionary} from "@/dictionaries";


describe("getDefaultDictionary", () => {

  it("ReturnS default (English) dictionary", async () => {
    const actualDict = await getDefaultDictionary();
    expect(actualDict).toStrictEqual(englishDict);
  });

});
