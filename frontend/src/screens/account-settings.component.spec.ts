import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import Screen from "@/screens/account-settings.component";

type AccountSettingsScreen = {
  dialogOpen: () => boolean;
  withdrawn: () => boolean;
  recordShown: () => boolean;
  errorMessage: () => string;
  openDialog: () => void;
  confirmWithdrawal: () => void;
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
    providers: [provideRouter([])],
  });
  const fixture = TestBed.createComponent(Screen);
  fixture.detectChanges();
  return { fixture, component: fixture.componentInstance as unknown as AccountSettingsScreen };
}

describe("account settings consent withdrawal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("[NFR-004] withdraws consent via POST /consent/withdraw in no more steps than granting (open, confirm)", async () => {
    const { fixture, component } = setup();
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(jsonResponse(200, { withdrawnAt: "2026-11-05T16:40:00Z" }));

    // Step 1: open the confirmation dialog from the withdraw-consent control.
    const withdrawButton = fixture.nativeElement.querySelector(
      "#withdraw-consent",
    ) as HTMLButtonElement;
    withdrawButton.click();
    await vi.advanceTimersByTimeAsync(50);
    fixture.detectChanges();

    expect(component.dialogOpen()).toBe(true);

    // Step 2: confirm.
    const confirmButton = fixture.nativeElement.querySelector(
      "#confirm-withdrawal",
    ) as HTMLButtonElement;
    confirmButton.click();
    await vi.advanceTimersByTimeAsync(500);
    fixture.detectChanges();

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/consent/withdraw");
    expect(init.method).toBe("POST");

    expect(component.withdrawn()).toBe(true);
    expect(component.recordShown()).toBe(true);
    expect(component.errorMessage()).toBe("");
  });

  it("[NFR-004] a failed withdrawal shows an error and leaves consent unchanged", async () => {
    const { fixture, component } = setup();
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValue(jsonResponse(500, { message: "boom" }));

    component.openDialog();
    await vi.advanceTimersByTimeAsync(50);
    component.confirmWithdrawal();
    await vi.advanceTimersByTimeAsync(500);
    fixture.detectChanges();

    expect(component.withdrawn()).toBe(false);
    expect(component.errorMessage()).toContain("could not reach the consent register");
  });
});
