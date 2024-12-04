import { expect } from "@jest/globals";
import {isRootPublicFile} from "@/utils/url";


describe("isRootPublicFile", () => {

  it("Returns true if file exists in `public` root dir", () => {
    expect(isRootPublicFile("/favicon.ico")).toBeTruthy();
  });

  it("Returns true if it is an image pathname", () => {
    expect(isRootPublicFile("/images/image.jpg")).toBeTruthy();
    expect(isRootPublicFile("/images/home/open.svg")).toBeTruthy();
  });

  it("Returns false if file doesn't exist in `public` root dir", () => {
    expect(isRootPublicFile("/unknown.jpg")).toBeFalsy();
  });

  it("Returns false if file doesn't exist in `public` child dir", () => {
    expect(isRootPublicFile("/unknown/logo.png")).toBeFalsy();
  });

});
