import { test, expect } from "@playwright/test";
import { sql } from "kysely";
import { db } from "../src/utils/db";

test.beforeEach(async ({ page }, testInfo) => {
  // Clear the database before each test.
  await sql`TRUNCATE "public"."cats" RESTART IDENTITY CASCADE;`.execute(db);
});

test("interactions", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.goto("http://localhost:3000/");
  await page.getByTestId("add-cat-button").click();
  await page.getByTestId("name").fill("johan");
  await page.getByTestId("name").press("Tab");
  await page.getByRole("button", { name: "add" }).click();
  await page.getByLabel("Birthdate").press("Tab");
  await page.getByLabel("Birthdate").fill("2020-12-13");
  await page.getByRole("button", { name: "add" }).click();
  await page.getByText("johan").click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button").nth(1).click();
  await page.getByTestId("add-cat-button").click();
  await page.getByTestId("name").click();
  await page.getByTestId("name").fill("kalle");
  await page.getByTestId("name").press("Tab");
  await page.getByLabel("Birthdate").press("Tab");
  await page.getByLabel("Birthdate").fill("2020-02-02");
  await page.getByRole("combobox", { name: "Gender" }).selectOption("M");
  await page.getByLabel("Bio").click();
  await page.getByLabel("Bio").fill("asd");
  await page.getByLabel("Bio").press("Shift+Enter");
  await page.getByLabel("Bio").fill("asd\nasd");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "add" }).click();
  await page.getByTestId("add-cat-button").click();
  await page.getByTestId("name").click();
  await page.getByTestId("name").fill("asd");
  await page.getByTestId("name").press("Tab");
  await page.getByLabel("Birthdate").fill("2222-03-02");
  await page.getByRole("button", { name: "add" }).click();
  await page.getByRole("button").first().click();
  await page.getByTestId("name").click();
  await page.getByTestId("name").fill("kalle 22");
  await page.getByRole("button", { name: "edit" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button").nth(1).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button").nth(1).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button").nth(1).click();
});
