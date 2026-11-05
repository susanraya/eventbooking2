import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

// The backend the Playwright webServer boots for this suite (see playwright.config.ts);
// overridable so the same spec can run against a deployed API.
const API_BASE = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

function unique(label: string): string {
  return `${label}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

async function registerAttendee(request: APIRequestContext): Promise<{ token: string; email: string }> {
  const email = `${unique("consent-attendee")}@example.com`;
  const response = await request.post(`${API_BASE}/auth/register`, {
    data: {
      email,
      password: "password1",
      fullName: "QA Consent Attendee",
      phone: "9876543210",
      role: "attendee",
      consentGiven: true,
      noticeVersion: "2026-01",
    },
  });
  expect(response.ok(), `register attendee failed: ${response.status()}`).toBeTruthy();
  const body = await response.json();
  return { token: body.token as string, email };
}

// Seeds a signed-in session the way the app itself reads it (localStorage "session_token",
// see frontend/src/lib/api.ts) without driving the registration/sign-in form -- that form is
// out of this ticket's scope and account-settings.component.ts only cares that a valid
// bearer token is present.
async function signInAs(page: Page, token: string): Promise<void> {
  await page.addInitScript((t) => {
    window.localStorage.setItem("session_token", t);
  }, token);
}

test.describe("consent withdrawal from account settings (US-005-2)", () => {
  test("[AC-withdraw] a signed-in user withdraws consent: badge turns Withdrawn, the button disables, and the confirmation shows the recorded date and time", async ({
    page,
    request,
  }) => {
    const { token } = await registerAttendee(request);
    await signInAs(page, token);

    await page.goto("/account-settings");
    await expect(page.getByRole("heading", { name: "Account settings" })).toBeVisible();
    await expect(page.getByText("Active", { exact: true })).toBeVisible();

    const withdrawButton = page.locator("#withdraw-consent");
    await expect(withdrawButton).toBeEnabled();

    // NFR-004: no harder than granting -- exactly two interactions, open then confirm.
    await withdrawButton.click();
    const dialog = page.getByRole("dialog", { name: "Withdraw consent?" });
    await expect(dialog).toBeVisible();

    await page.locator("#confirm-withdrawal").click();

    await expect(page.getByText("Withdrawn", { exact: true })).toBeVisible();
    await expect(page.getByText(/Consent withdrawal recorded on/)).toBeVisible();
    await expect(withdrawButton).toBeDisabled();
    await expect(withdrawButton).toContainText("Consent withdrawn");
  });

  test("[AC-cancel] cancelling the dialog leaves consent Active and makes no withdrawal", async ({
    page,
    request,
  }) => {
    const { token } = await registerAttendee(request);
    await signInAs(page, token);

    await page.goto("/account-settings");
    await expect(page.getByRole("heading", { name: "Account settings" })).toBeVisible();

    await page.locator("#withdraw-consent").click();
    const dialog = page.getByRole("dialog", { name: "Withdraw consent?" });
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(dialog).toBeHidden();

    await expect(page.getByText("Active", { exact: true })).toBeVisible();
    await expect(page.locator("#withdraw-consent")).toBeEnabled();
    await expect(page.locator("#withdraw-consent")).toContainText("Withdraw consent");
  });

  test("[AC-api-failure] an API failure on withdrawal leaves consent Active and shows the inline error", async ({
    page,
    request,
  }) => {
    const { token } = await registerAttendee(request);
    await signInAs(page, token);

    await page.route("**/consent/withdraw", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ message: "boom" }) }),
    );

    await page.goto("/account-settings");
    await expect(page.getByRole("heading", { name: "Account settings" })).toBeVisible();

    await page.locator("#withdraw-consent").click();
    await page.locator("#confirm-withdrawal").click();

    await expect(page.getByRole("alert")).toContainText("Not recorded");
    await expect(page.getByText("Active", { exact: true })).toBeVisible();
    await expect(page.locator("#withdraw-consent")).toBeEnabled();
  });
});
