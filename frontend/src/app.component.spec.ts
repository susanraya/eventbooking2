import { TestBed } from "@angular/core/testing";
import { Router, provideRouter } from "@angular/router";

import { clearSessionToken, getSessionToken, setSessionToken } from "@/lib/api";
import { AppComponent, routes } from "./app.component";

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("App", () => {
  afterEach(() => {
    clearSessionToken();
    vi.restoreAllMocks();
  });

  it("renders a screen inside the app shell and shows its menu", async () => {
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl("/events");
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain("Browse events");
  });

  it("[AC-008] redirects to the auth screen when navigating to a protected screen without a stored token", async () => {
    clearSessionToken();
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/organizer-dashboard");
    await fixture.whenStable();
    expect(router.url).toBe("/auth");
  });

  it("[AC-008] allows a protected screen when a session token is stored", async () => {
    setSessionToken("tok-1");
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/my-tickets");
    await fixture.whenStable();
    expect(router.url).toBe("/my-tickets");
  });

  it("[AC-008] signing out calls POST /auth/logout, clears the token and returns to the auth screen", async () => {
    setSessionToken("tok-1");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, {})));
    TestBed.configureTestingModule({ imports: [AppComponent], providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    await router.navigateByUrl("/events");
    await fixture.whenStable();

    const signOutButton = Array.from(
      fixture.nativeElement.querySelectorAll("button"),
    ).find((b: HTMLButtonElement) => b.textContent?.trim() === "Sign out") as HTMLButtonElement;
    signOutButton.click();
    await fixture.whenStable();

    const [url, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toContain("/auth/logout");
    expect(init.method).toBe("POST");
    expect(getSessionToken()).toBeNull();
    expect(router.url).toBe("/auth");
    vi.unstubAllGlobals();
  });
});
