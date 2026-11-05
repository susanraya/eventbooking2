import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { provideRouter } from "@angular/router";

import { clearSessionToken, getSessionToken } from "@/lib/api";
import Screen from "@/screens/auth.component";

@Component({ selector: "dummy", template: "" })
class DummyComponent {}

type Dict = Record<string, unknown>;
// The component under test is `@ts-nocheck` plain-JS, so its public surface (signals and
// methods) is untyped from the outside too.
type AuthScreen = Dict & {
  tab: { set: (v: string) => void };
  fullName: { set: (v: string) => void };
  email: { set: (v: string) => void };
  password: { set: (v: string) => void };
  phone: { set: (v: string) => void };
  orgName: { set: (v: string) => void };
  contactDetails: { set: (v: string) => void };
  consent: { set: (v: boolean) => void; (): boolean };
  terms: { set: (v: boolean) => void; (): boolean };
  errors: () => Dict;
  formNotice: () => { lines: string[] };
  consentNotice: { noticeVersion: string; purposes: string[] };
  createAccount: () => void;
  navigate: (route: string) => void;
};

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function setup() {
  TestBed.configureTestingModule({
    imports: [Screen],
    providers: [
      provideRouter([
        { path: "events", component: DummyComponent },
        { path: "organizer-dashboard", component: DummyComponent },
      ]),
    ],
  });
  const fixture = TestBed.createComponent(Screen);
  const component = fixture.componentInstance as unknown as AuthScreen;
  component.navigate = vi.fn();
  fixture.detectChanges();
  return { fixture, component };
}

function fillAttendee(component: AuthScreen, overrides: Partial<Record<string, string>> = {}) {
  component.tab.set("attendee");
  component.fullName.set(overrides.fullName ?? "Aarav Menon");
  component.email.set(overrides.email ?? "aarav.menon@gmail.com");
  component.password.set(overrides.password ?? "Mumbai2026");
  component.phone.set(overrides.phone ?? "9820041167");
  component.consent.set(true);
  component.terms.set(true);
}

describe("auth screen registration", () => {
  beforeEach(() => {
    clearSessionToken();
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    clearSessionToken();
  });

  it("[AC-009] never pre-ticks consent and keeps it separate from terms", () => {
    const { component } = setup();
    component.tab.set("attendee");
    expect(component.consent()).toBe(false);
    expect(component.terms()).toBe(false);
    component.consent.set(true);
    expect(component.terms()).toBe(false);
  });

  it("[AC-003][NFR-001][NFR-012] blocks submission client-side on a bad email and weak password before calling the API", async () => {
    const { component } = setup();
    fillAttendee(component, { email: "not-an-email", password: "short" });

    component.createAccount();
    await vi.advanceTimersByTimeAsync(50);

    expect(fetch).not.toHaveBeenCalled();
    expect(component.errors().email).toBeTruthy();
    expect(component.errors().password).toBeTruthy();
  });

  it("[AC-010] blocks submission client-side when consent is not given and highlights the consent control", async () => {
    const { component } = setup();
    fillAttendee(component);
    component.consent.set(false);

    component.createAccount();
    await vi.advanceTimersByTimeAsync(50);

    expect(fetch).not.toHaveBeenCalled();
    expect(component.errors().consent).toBeTruthy();
  });

  it("[AC-001][AC-004] registers an attendee via POST /auth/register, stores the token and routes to events", async () => {
    const { component } = setup();
    fillAttendee(component);
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(
      jsonResponse(200, { userId: "u_1", role: "attendee", token: "tok-attendee" }),
    );

    component.createAccount();
    await vi.advanceTimersByTimeAsync(1200);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/auth/register");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body as string);
    expect(body.role).toBe("attendee");
    expect(body.email).toBe("aarav.menon@gmail.com");
    expect(body.consent).toEqual({
      given: true,
      noticeVersion: component.consentNotice.noticeVersion,
      purposes: component.consentNotice.purposes,
    });

    expect(getSessionToken()).toBe("tok-attendee");
    expect(component.navigate).toHaveBeenCalledWith("events");
  });

  it("[AC-005] registers an organizer and routes to the organizer dashboard by returned role", async () => {
    const { component } = setup();
    fillAttendee(component);
    component.tab.set("organizer");
    component.orgName.set("Sitara House Live");
    component.contactDetails.set("022 2284 1190");
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(
      jsonResponse(200, { userId: "u_2", role: "organizer", token: "tok-organizer" }),
    );

    component.createAccount();
    await vi.advanceTimersByTimeAsync(1200);

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.organization).toEqual({
      name: "Sitara House Live",
      contactDetails: "022 2284 1190",
    });

    expect(getSessionToken()).toBe("tok-organizer");
    expect(component.navigate).toHaveBeenCalledWith("organizer-dashboard");
  });

  it("[AC-002] a 409 from the API shows 'email already in use' on the email field and in the notice block", async () => {
    const { component } = setup();
    fillAttendee(component);
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(jsonResponse(409, { message: "That email is already in use." }));

    component.createAccount();
    await vi.advanceTimersByTimeAsync(200);

    expect(component.errors().email).toBe("That email is already in use.");
    expect(component.formNotice().lines.join(" ")).toContain("already in use");
    expect(component.navigate).not.toHaveBeenCalled();
  });

  it("[AC-003] 400 field errors from the API render as field-level messages under the matching input", async () => {
    const { component } = setup();
    fillAttendee(component);
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(
      jsonResponse(400, {
        fieldErrors: { phone: "Phone number is not a valid Indian mobile number." },
      }),
    );

    component.createAccount();
    await vi.advanceTimersByTimeAsync(200);

    expect(component.errors().phone).toBe("Phone number is not a valid Indian mobile number.");
    expect(component.navigate).not.toHaveBeenCalled();
  });
});
