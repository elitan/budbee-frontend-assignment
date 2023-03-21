import { describe, expect, it } from "vitest";
import { getBase64FromFile } from "~/utils/utils";

describe("getBase64FromFile", () => {
  it("should return a Promise that resolves with a base64-encoded string when given a valid File object", async () => {
    // Create a test File object
    const file = new File(["Hello, world!"], "hello.txt", {
      type: "text/plain",
    });
    // Call the function and wait for the Promise to resolve
    const result = await getBase64FromFile(file);
    // Expect the result to be a string starting with "data:text/plain;base64,"
    expect(typeof result).toBe("string");
    expect(result.startsWith("data:text/plain;base64,")).toBe(true);
  });

  it("should return null when given an invalid parameter", async () => {
    // Call the function with an undefined parameter
    const result = await getBase64FromFile(undefined);
    // Expect the result to be null
    expect(result).toBeNull();
  });
});
