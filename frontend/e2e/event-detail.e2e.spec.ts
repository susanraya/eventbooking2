import { expect, test, type APIRequestContext } from "@playwright/test";

// The backend the Playwright webServer boots for this suite (see playwright.config.ts);
// overridable so the same spec can run against a deployed API.
const API_BASE = process.env.E2E_API_BASE_URL ?? "http://127.0.0.1:8000";

function unique(label: string): string {
  return `${label}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

async function registerOrganizer(request: APIRequestContext): Promise<string> {
  const email = `${unique("organizer")}@example.com`;
  const response = await request.post(`${API_BASE}/auth/register`, {
    data: {
      email,
      password: "password1",
      fullName: "QA Organizer",
      phone: "9876543210",
      role: "organizer",
      organizationName: "QA Events Co",
      contactDetails: "qa-events@example.com",
      consentGiven: true,
      noticeVersion: "2026-01",
    },
  });
  expect(response.ok(), `register organizer failed: ${response.status()}`).toBeTruthy();
  const body = await response.json();
  return body.token as string;
}

async function createEvent(
  request: APIRequestContext,
  token: string,
  overrides: Record<string, unknown> = {},
): Promise<string> {
  const response = await request.post(`${API_BASE}/events`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      title: "QA E2E Sunburn Night",
      venue: "QA Open Grounds",
      city: "Mumbai",
      category: "music",
      description: "Seeded directly through the API for e2e coverage of the detail page.",
      startsAt: "2026-12-15T19:00:00",
      posterUrl: null,
      status: "published",
      ...overrides,
    },
  });
  expect(response.ok(), `create event failed: ${response.status()}`).toBeTruthy();
  const body = await response.json();
  return body.eventId as string;
}

async function createTicketType(
  request: APIRequestContext,
  token: string,
  eventId: string,
  name: string,
  priceInr: string,
  quantityTotal: number,
): Promise<string> {
  const response = await request.post(`${API_BASE}/events/${eventId}/ticket-types`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { name, priceInr, quantityTotal },
  });
  expect(response.ok(), `create ticket type failed: ${response.status()}`).toBeTruthy();
  const body = await response.json();
  return body.ticketTypeId as string;
}

test.describe("attendee event detail page against live backend data (US-010)", () => {
  // NOTE (defect, see QA report): frontend/src/screens/events.component.ts (the discovery
  // list) renders a hard-coded sample array and never calls the API, so there is no "click
  // a card for a seeded event" path to exercise today. These tests seed through the real
  // API and navigate straight to /event-detail/:id, which is the route the discovery card's
  // click handler (`openEvent`) would otherwise produce, and verify the real GET
  // /events/{id} contract the detail page itself does call.

  test("[AC-025] opening a seeded event's detail page shows its venue, date/time, description and each ticket type with its INR price", async ({
    page,
    request,
  }) => {
    const token = await registerOrganizer(request);
    const eventId = await createEvent(request, token, {
      title: "QA Sunburn Arena Night",
      venue: "QA Phoenix Marketcity",
      city: "Mumbai",
      category: "music",
      description: "An evening of live, seeded-through-the-API bass music.",
      startsAt: "2026-12-15T19:00:00",
    });
    await createTicketType(request, token, eventId, "General", "450.00", 50);
    await createTicketType(request, token, eventId, "VIP", "1200.00", 10);

    await page.goto(`/event-detail/${eventId}`);
    await expect(page.getByRole("heading", { name: "QA Sunburn Arena Night" })).toBeVisible();

    const body = page.locator("body");
    await expect(body).toContainText("QA Phoenix Marketcity");
    await expect(body).toContainText("Mumbai");
    await expect(body).toContainText("2026");
    await expect(body).toContainText("An evening of live, seeded-through-the-API bass music.");
    await expect(body).toContainText("General");
    await expect(body).toContainText("₹450");
    await expect(body).toContainText("VIP");
    await expect(body).toContainText("₹1,200");
  });

  // [AC-026] PENDING: a ticket type cannot be driven to zero remaining quantity through the
  // real API in this build. POST /events/{id}/ticket-types rejects quantityTotal <= 0
  // (EventService#createTicketType), and POST /orders -- the only path that would
  // increment quantitySold -- is still Stubs.notImplemented (always 200,
  // status:"not_implemented", never touches stock). There is therefore no API-only way to
  // seed a sold-out ticket type; doing so would require writing to the database directly,
  // which the ticket's "no fixture stubbing of the detail endpoint" / real-API-seeding
  // constraint rules out. The rendering of a sold-out row (badge, no quantity control, not
  // addable to the order summary) is covered against a stubbed response in
  // frontend/src/screens/event-detail.component.spec.ts ("[AC-026] ..."). Once POST /orders
  // is implemented this spec should add a real seed-an-order-to-exhaust-stock case.
  test.skip(
    "[AC-026] a ticket type with zero remaining quantity is labelled sold out, exposes no quantity control, and cannot be added to the order summary",
    () => {},
  );

  test("a ticket type with stock can be selected and the order total reflects price x quantity", async ({
    page,
    request,
  }) => {
    const token = await registerOrganizer(request);
    const eventId = await createEvent(request, token, { title: "QA Stock Selection Night" });
    await createTicketType(request, token, eventId, "Standard", "450.00", 20);

    await page.goto(`/event-detail/${eventId}`);
    await expect(page.getByRole("heading", { name: "QA Stock Selection Night" })).toBeVisible();

    const addButton = page.getByRole("button", { name: "Add one Standard ticket" });
    await addButton.click();
    await addButton.click();
    await addButton.click();

    // 3 x ₹450 = ₹1,350, distinct from the ₹450 unit price shown alongside each line.
    await expect(page.locator("body")).toContainText("₹1,350");
  });

  test("[NFR-012] an unknown event id shows the error state", async ({ page }) => {
    await page.goto("/event-detail/does-not-exist-e2e");
    await expect(page.getByText("We could not load this event")).toBeVisible();
    await expect(page.getByRole("button", { name: "Try again" })).toBeVisible();
  });

  test("[NFR-012] an event with no ticket types shows the empty state", async ({
    page,
    request,
  }) => {
    const token = await registerOrganizer(request);
    const eventId = await createEvent(request, token, { title: "QA No Tickets Yet Event" });

    await page.goto(`/event-detail/${eventId}`);
    await expect(page.getByRole("heading", { name: "QA No Tickets Yet Event" })).toBeVisible();
    await expect(page.getByText("No ticket types yet")).toBeVisible();
    await expect(page.locator("table")).toHaveCount(0);
  });
});
