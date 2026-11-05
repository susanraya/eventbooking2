import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Router, RouterOutlet, provideRouter } from "@angular/router";

import Screen from "@/screens/event-detail.component";

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

@Component({ selector: "test-host", imports: [RouterOutlet], template: `<router-outlet />` })
class HostComponent {}

function sampleResponse() {
  return {
    event: {
      id: "evt-1",
      title: "Sunburn Arena ft. DJ Nucleya",
      venue: "Phoenix Marketcity, Whitefield",
      city: "Bengaluru",
      category: "Music",
      description: "An evening of bass-heavy electronic sets.",
      startsAt: "2026-12-12T19:00:00",
      organizerName: "Percept Live",
    },
    ticketTypes: [
      {
        id: "tt-1",
        name: "Regular",
        priceInr: 999,
        quantityTotal: 500,
        quantitySold: 400,
        soldOut: false,
      },
      {
        id: "tt-2",
        name: "VIP Lounge",
        priceInr: 2499,
        quantityTotal: 120,
        quantitySold: 120,
        soldOut: true,
      },
    ],
  };
}

async function setup(path = "/event-detail/evt-1") {
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [provideRouter([{ path: "event-detail/:id", component: Screen }])],
  });
  const fixture = TestBed.createComponent(HostComponent);
  const router = TestBed.inject(Router);
  await router.navigateByUrl(path);
  await fixture.whenStable();
  return { fixture, router };
}

describe("event detail screen", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a loading state while the request is in flight", async () => {
    let resolveFetch!: (value: Response) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
      ),
    );
    const { fixture } = await setup();

    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();

    resolveFetch(jsonResponse(200, sampleResponse()));
    await fixture.whenStable();
  });

  it("[AC-025] loads GET /events/{id} for the routed event id and renders venue, city, date/time, category, description and ticket types with INR prices", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, sampleResponse()));
    vi.stubGlobal("fetch", fetchMock);
    const { fixture } = await setup("/event-detail/evt-1");
    await fixture.whenStable();

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain("/events/evt-1");

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain("Sunburn Arena ft. DJ Nucleya");
    expect(text).toContain("Phoenix Marketcity, Whitefield");
    expect(text).toContain("Bengaluru");
    expect(text).toContain("Music");
    expect(text).toContain("An evening of bass-heavy electronic sets.");
    expect(text).toContain("Percept Live");
    expect(text).toContain("Regular");
    expect(text).toContain("₹999");
    expect(text).toContain("VIP Lounge");
    expect(text).toContain("₹2,499");
    expect(text).toContain("2026");
  });

  it("[AC-026] a sold-out ticket type renders as sold out with no quantity control and cannot be added to the order summary", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, sampleResponse())));
    const { fixture } = await setup();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain("Sold out");
    expect(text).toContain("Cannot be selected");

    expect(
      fixture.nativeElement.querySelector('[aria-label="Add one VIP Lounge ticket"]'),
    ).toBeFalsy();
    expect(
      fixture.nativeElement.querySelector('[aria-label="Remove one VIP Lounge ticket"]'),
    ).toBeFalsy();
  });

  it("shows a clear error state with a retry control when the request fails, and retry re-fetches", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(500, { message: "boom" }));
    vi.stubGlobal("fetch", fetchMock);
    const { fixture } = await setup();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain("We could not load this event");
    const retryButton = Array.from(fixture.nativeElement.querySelectorAll("button")).find(
      (b: HTMLButtonElement) => b.textContent?.trim() === "Try again",
    ) as HTMLButtonElement;
    expect(retryButton).toBeTruthy();

    fetchMock.mockResolvedValue(jsonResponse(200, sampleResponse()));
    retryButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain("Sunburn Arena ft. DJ Nucleya");
  });

  it("shows the empty-state component rather than an empty table when the event has no ticket types", async () => {
    const response = sampleResponse();
    response.ticketTypes = [];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, response)));
    const { fixture } = await setup();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain("No ticket types yet");
    expect(fixture.nativeElement.querySelector("table")).toBeFalsy();
  });

  it("computes the order summary and total from the fetched ticket types", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, sampleResponse())));
    const { fixture } = await setup();
    await fixture.whenStable();

    const addButton = fixture.nativeElement.querySelector(
      '[aria-label="Add one Regular ticket"]',
    ) as HTMLButtonElement;
    addButton.click();
    addButton.click();
    await fixture.whenStable();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain("2");
    expect(text).toContain("₹1,998");
  });
});
