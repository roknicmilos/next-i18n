/**
 * @jest-environment jsdom
 */
import {expect} from "@jest/globals";
import {deleteWindowObject, overrideWindowLocation} from "@/utils/tests";
import {redirect} from "@/utils/routing";


describe("redirect", () => {

    let restoreWindowLocation: () => void;

    beforeEach(() => {
        restoreWindowLocation = overrideWindowLocation({href: ""});
    });

    it("Redirects to the given URL", () => {
        const redirectUrl = "https://redirect.com";
        expect(global.window.location.href).not.toEqual(redirectUrl);
        redirect(redirectUrl);
        expect(global.window.location.href).toBe(redirectUrl);
    });

    it("Doesn't throw error when window object is undefined", () => {
        const restoreWindowObject = deleteWindowObject();
        expect(() => redirect("https://redicrect-fail.com")).not.toThrow();
        restoreWindowObject();
    });

    afterEach(() => {
        restoreWindowLocation();
    });

});
