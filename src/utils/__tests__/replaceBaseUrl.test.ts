import { expect } from "@jest/globals";
import {replaceBaseUrl} from "@/utils/url";


describe("replaceBaseUrl", () => {

  it("Replaces the domain and keeps the path for an http URL", () => {
    const result = replaceBaseUrl("http://domain-a:9999/path/", "http://localhost:8000");
    expect(result).toBe("http://localhost:8000/path/");
  });

  it("Replaces the domain and keeps the path for an https URL", () => {
    const result = replaceBaseUrl("https://domain-b/path/", "http://localhost:8000");
    expect(result).toBe("http://localhost:8000/path/");
  });

  it("Replaces the domain and keeps the deeper path", () => {
    const result = replaceBaseUrl("http://domain-c/path/test", "http://localhost:8000");
    expect(result).toBe("http://localhost:8000/path/test");
  });

  it("Handles URLs without paths", () => {
    const result = replaceBaseUrl("http://domain-d", "http://localhost:8000");
    expect(result).toBe("http://localhost:8000/");
  });

});
