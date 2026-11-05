// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed, effect } from "@angular/core";

import { apiFetch } from "@/lib/api";
import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";

// Formats an ISO-8601 timestamp (as returned by the server) into "5 Nov 2026, 16:40 IST".
function formatIst(iso) {
  if (!iso) {
    return "";
  }
  const d = new Date(iso);
  const datePart = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const timePart = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
  return datePart + ", " + timePart + " IST";
}

const template = `
<div class="min-h-screen w-full px-4 py-10 sm:px-6 sm:py-14"
     [style.background-color]="brand.backgroundColor"
     [style.font-family]="brand.fontBody"
     [style.color]="brand.primaryColor">
  <div class="mx-auto w-full max-w-3xl">

    <!-- ROW 1 — page title -->
    <header data-wf="b-0-0" class="text-center">
      <p class="text-[11px] uppercase tracking-[0.42em] tabular-nums" [style.color]="brand.neutralColor">
        Member QT&#8209;4471 &middot; Joined 12 Aug 2025
      </p>
      <h1 class="mt-4 text-[30px] leading-tight sm:text-[38px] uppercase tracking-[0.22em]"
          [style.font-family]="brand.fontHeading">Account settings</h1>
      <p class="mx-auto mt-5 max-w-[60ch] text-sm leading-relaxed" [style.color]="brand.neutralColor">
        The details held on your account, the consent you gave when you registered, and a one&#8209;step way to
        withdraw it &mdash; no harder than granting it was.
      </p>

      <div class="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
        <span class="h-px w-20 sm:w-36" [style.background-color]="brand.accentColor"></span>
        <span class="h-2.5 w-2.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
        <span class="h-px w-20 sm:w-36" [style.background-color]="brand.accentColor"></span>
      </div>
      <div class="mt-1.5 flex items-center justify-center" aria-hidden="true">
        <span class="h-px w-44 sm:w-80 opacity-60" [style.background-color]="brand.accentColor"></span>
      </div>
    </header>

    <!-- ROW 2 — profile -->
    <section data-wf="b-1-0" class="mt-10" aria-labelledby="profile-heading">
      <div class="p-[3px]" [style.border]="'1px solid ' + brand.primaryColor">
        <div class="px-5 py-8 sm:px-10 sm:py-10" [style.border]="'1px solid ' + brand.accentColor">
          <h2 id="profile-heading"
              class="text-center text-[15px] uppercase tracking-[0.34em]"
              [style.font-family]="brand.fontHeading">Profile</h2>
          <p class="mt-3 text-center text-xs leading-relaxed" [style.color]="brand.neutralColor">
            Held on record for your bookings and tickets. To correct a name or phone number, write to
            care&#64;boxoffice.in and we will amend it within two working days.
          </p>

          <div class="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div>
              <label uiLabel for="full_name" class="block text-[10px] uppercase tracking-[0.28em]"
                     [style.color]="brand.neutralColor">Full name</label>
              <input uiInput id="full_name" name="full_name" data-wf="i-1-0-0" readonly
                     class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + brand.neutralColor"
                     [style.outline-color]="brand.primaryColor"
                     [style.color]="brand.primaryColor"
                     [value]="profile().full_name" />
            </div>

            <div>
              <label uiLabel for="email" class="block text-[10px] uppercase tracking-[0.28em]"
                     [style.color]="brand.neutralColor">Email</label>
              <input uiInput id="email" name="email" type="email" data-wf="i-1-0-1" readonly
                     class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + brand.neutralColor"
                     [style.outline-color]="brand.primaryColor"
                     [style.color]="brand.primaryColor"
                     [value]="profile().email" />
              <p class="mt-2 text-[11px]" [style.color]="brand.neutralColor">Used to sign in. Tickets stay in your account.</p>
            </div>

            <div>
              <label uiLabel for="phone" class="block text-[10px] uppercase tracking-[0.28em]"
                     [style.color]="brand.neutralColor">Phone</label>
              <input uiInput id="phone" name="phone" type="tel" data-wf="i-1-0-2" readonly
                     class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 text-[15px] tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + brand.neutralColor"
                     [style.outline-color]="brand.primaryColor"
                     [style.color]="brand.primaryColor"
                     [value]="profile().phone" />
            </div>

            <div>
              <label uiLabel for="role" class="block text-[10px] uppercase tracking-[0.28em]"
                     [style.color]="brand.neutralColor">Role</label>
              <input uiInput id="role" name="role" data-wf="i-1-0-3" readonly
                     class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + brand.neutralColor"
                     [style.outline-color]="brand.primaryColor"
                     [style.color]="brand.primaryColor"
                     [value]="profile().role" />
              <p class="mt-2 text-[11px]" [style.color]="brand.neutralColor">Attendee &mdash; browse events and book tickets.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ROW 3 — consent record -->
    <section data-wf="b-2-0" class="mt-8" aria-labelledby="consent-heading">
      <div class="p-[3px]" [style.border]="'1px solid ' + brand.primaryColor">
        <div class="p-[2px]" [style.border]="'1px solid ' + brand.accentColor">
          <div class="px-5 py-8 sm:px-10 sm:py-10" [style.border]="'1px solid ' + brand.accentColor">

            <h2 id="consent-heading"
                class="text-center text-[15px] uppercase tracking-[0.34em]"
                [style.font-family]="brand.fontHeading">Consent record</h2>

            <div class="mt-5 flex justify-center">
              @if (withdrawn()) {
                <span class="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em]"
                      [style.border]="'1px solid ' + brand.neutralColor"
                      [style.color]="brand.neutralColor">
                  <ui-icon name="X" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                  Withdrawn
                </span>
              } @else {
                <span class="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em]"
                      [style.border]="'1px solid ' + brand.primaryColor"
                      [style.background-color]="brand.primaryColor"
                      [style.color]="brand.accentColor">
                  <ui-icon name="CheckCircle" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                  Active
                </span>
              }
            </div>

            <p class="mx-auto mt-6 max-w-[62ch] text-center text-sm leading-relaxed tabular-nums">
              Consent granted {{ consent().granted_at }} &middot; Notice version {{ consent().notice_version }} &middot;
              Purposes: {{ purposeLine() }}
            </p>

            <div class="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
              <span class="h-px w-16 sm:w-28" [style.background-color]="brand.accentColor"></span>
              <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor"></span>
              <span class="h-px w-16 sm:w-28" [style.background-color]="brand.accentColor"></span>
            </div>

            <dl class="mt-7 text-sm">
              <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                   [style.border-bottom]="'1px solid ' + hairline">
                <dt class="text-[10px] uppercase tracking-[0.28em]" [style.color]="brand.neutralColor">Granted at</dt>
                <dd class="tabular-nums">{{ consent().granted_at }}</dd>
              </div>
              <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                   [style.border-bottom]="'1px solid ' + hairline">
                <dt class="text-[10px] uppercase tracking-[0.28em]" [style.color]="brand.neutralColor">Notice version</dt>
                <dd class="tabular-nums">v{{ consent().notice_version }} &mdash; Data processing notice</dd>
              </div>
              <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                   [style.border-bottom]="'1px solid ' + hairline">
                <dt class="text-[10px] uppercase tracking-[0.28em]" [style.color]="brand.neutralColor">Purposes</dt>
                <dd class="flex flex-wrap gap-2 sm:justify-end">
                  @for (purpose of consent().purposes; track purpose) {
                    <span class="px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
                          [style.border]="'1px solid ' + brand.accentColor"
                          [class.line-through]="withdrawn()"
                          [style.color]="withdrawn() ? brand.neutralColor : brand.primaryColor">{{ purpose }}</span>
                  }
                </dd>
              </div>
              <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                <dt class="text-[10px] uppercase tracking-[0.28em]" [style.color]="brand.neutralColor">Withdrawn at</dt>
                <dd class="tabular-nums" [style.color]="withdrawn() ? brand.primaryColor : brand.neutralColor">
                  {{ withdrawn() ? withdrawnAtLabel() : 'Not withdrawn' }}
                </dd>
              </div>
            </dl>

            <p class="mt-6 flex items-center justify-center gap-2 text-[11px] tabular-nums"
               [style.color]="brand.neutralColor">
              <ui-icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
              Consent register last synced {{ lastSynced() }} &mdash; figures may be a few minutes behind.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ROW 4 — actions -->
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <button uiButton type="button" id="withdraw-consent" data-wf="b-3-0"
              class="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-none px-6 text-[12px] uppercase tracking-[0.3em] transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
              [style.background-color]="brand.primaryColor"
              [style.color]="brand.accentColor"
              [style.outline-color]="brand.primaryColor"
              [disabled]="withdrawn()"
              (click)="openDialog()">
        <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor" aria-hidden="true"></span>
        {{ withdrawn() ? 'Consent withdrawn' : 'Withdraw consent' }}
      </button>

      <button uiButton type="button" variant="secondary" data-wf="b-3-1"
              class="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-none bg-transparent px-6 text-[12px] uppercase tracking-[0.3em] transition-opacity duration-150 hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
              [style.border]="'1px solid ' + brand.primaryColor"
              [style.color]="brand.primaryColor"
              [style.outline-color]="brand.primaryColor"
              (click)="navigate('auth')">
        <ui-icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true"></ui-icon>
        Sign out
      </button>
    </div>

    <p class="mt-3 text-center text-[11px]" [style.color]="brand.neutralColor">
      Signing out ends this session on this device; your tickets stay in your account.
    </p>

    <!-- ROW 7 — withdrawal record -->
    <section data-wf="b-6-0" class="mt-10" aria-live="polite" aria-labelledby="record-heading">
      <h2 id="record-heading" class="sr-only">Withdrawal record</h2>
      @if (withdrawn()) {
        <div class="p-[3px] transition-all duration-300 ease-out motion-reduce:transition-none"
             [class.opacity-0]="!recordShown()"
             [class.translate-y-2]="!recordShown()"
             [style.border]="'1px solid ' + brand.primaryColor">
          <div id="withdrawal-record" tabindex="-1"
               class="px-5 py-7 text-center sm:px-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
               [style.border]="'1px solid ' + brand.accentColor"
               [style.outline-color]="brand.primaryColor">
            <ui-icon name="CheckCircle" class="mx-auto h-6 w-6" aria-hidden="true"></ui-icon>
            <p class="mt-3 text-[15px] tabular-nums">Consent withdrawal recorded on {{ withdrawnAtLabel() }}.</p>
            <p class="mt-2 text-xs tabular-nums" [style.color]="brand.neutralColor">
              Notice version {{ consent().notice_version }} &middot; Logged against your account in the audit trail.
            </p>
            <p class="mx-auto mt-4 max-w-[58ch] text-xs leading-relaxed" [style.color]="brand.neutralColor">
              Tickets already issued remain valid for entry. We will keep only what the law requires us to keep.
            </p>
          </div>
        </div>
      } @else {
        <div class="px-5 py-6 text-center" [style.border]="'1px solid ' + hairline">
          <p class="text-sm tabular-nums" [style.color]="brand.neutralColor">
            No withdrawal on record. Your consent of 14 Oct 2026 is still in force.
          </p>
        </div>
      }
    </section>

    <div class="mt-10 flex items-center justify-center gap-3" aria-hidden="true">
      <span class="h-px w-14" [style.background-color]="brand.accentColor"></span>
      <span class="h-1.5 w-1.5 rotate-45" [style.background-color]="brand.neutralColor"></span>
      <span class="h-px w-14" [style.background-color]="brand.accentColor"></span>
    </div>
  </div>

  <!-- ROW 5 — confirmation dialog -->
  @if (dialogOpen()) {
    <div class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
         (keydown.escape)="closeDialog()">
      <div class="absolute inset-0 transition-opacity duration-200 motion-reduce:transition-none"
           [class.opacity-0]="!dialogShown()"
           [class.opacity-80]="dialogShown()"
           [style.background-color]="brand.primaryColor"
           aria-hidden="true"></div>

      <div data-wf="b-4-0" role="dialog" aria-modal="true"
           aria-labelledby="withdraw-title" aria-describedby="withdraw-desc"
           class="relative w-full max-w-lg p-[3px] shadow-2xl transition-all duration-200 ease-out motion-reduce:transition-none"
           [class.opacity-0]="!dialogShown()"
           [class.translate-y-3]="!dialogShown()"
           [style.border]="'1px solid ' + brand.accentColor"
           [style.background-color]="brand.backgroundColor">
        <div class="px-6 py-8 sm:px-10 sm:py-10" [style.border]="'1px solid ' + brand.accentColor">

          <div class="flex items-center justify-center gap-3" aria-hidden="true">
            <span class="h-px w-10" [style.background-color]="brand.accentColor"></span>
            <span class="h-2 w-2 rotate-45" [style.background-color]="brand.primaryColor"></span>
            <span class="h-px w-10" [style.background-color]="brand.accentColor"></span>
          </div>

          <h2 id="withdraw-title"
              class="mt-5 text-center text-[17px] uppercase tracking-[0.28em]"
              [style.font-family]="brand.fontHeading">Withdraw consent?</h2>

          <p id="withdraw-desc" class="mx-auto mt-4 max-w-[48ch] text-center text-sm leading-relaxed">
            Your withdrawal will be recorded with the date and time.
          </p>
          <p class="mx-auto mt-3 max-w-[50ch] text-center text-xs leading-relaxed" [style.color]="brand.neutralColor">
            We stop processing your data for account, bookings and ticketing purposes. Tickets already issued stay
            valid, and you can grant consent again at any time from this page.
          </p>

          @if (errorMessage()) {
            <div class="mt-6 flex items-start gap-3 px-4 py-3 text-xs leading-relaxed"
                 [style.border]="'1px solid ' + brand.primaryColor" role="alert">
              <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
              <span><span class="uppercase tracking-[0.2em]">Not recorded &mdash;</span> {{ errorMessage() }}</span>
            </div>
          }

          <!-- ROW 6 — dialog actions -->
          <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button uiButton type="button" id="confirm-withdrawal" data-wf="b-5-0"
                    class="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-none px-5 text-[11px] uppercase tracking-[0.28em] transition-opacity duration-150 hover:opacity-90 disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
                    [style.background-color]="brand.primaryColor"
                    [style.color]="brand.accentColor"
                    [style.outline-color]="brand.primaryColor"
                    [disabled]="submitting()"
                    (click)="confirmWithdrawal()">
              @if (submitting()) {
                <span class="h-2.5 w-2.5 rotate-45 animate-pulse motion-reduce:animate-none"
                      [style.background-color]="brand.accentColor" aria-hidden="true"></span>
                Recording&hellip;
              } @else {
                <ui-icon name="Check" class="h-4 w-4" aria-hidden="true"></ui-icon>
                {{ errorMessage() ? 'Try again' : 'Confirm withdrawal' }}
              }
            </button>

            <button uiButton type="button" variant="secondary" data-wf="b-5-1"
                    class="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-none bg-transparent px-5 text-[11px] uppercase tracking-[0.28em] transition-opacity duration-150 hover:opacity-70 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
                    [style.border]="'1px solid ' + brand.primaryColor"
                    [style.color]="brand.primaryColor"
                    [style.outline-color]="brand.primaryColor"
                    [disabled]="submitting()"
                    (click)="closeDialog()">
              <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
              Cancel
            </button>
          </div>

          <p class="mt-5 text-center text-[11px]" [style.color]="brand.neutralColor">
            Press Esc to close without changing anything.
          </p>
        </div>
      </div>
    </div>
  }
</div>
`;

@Component({
  selector: "app-account-settings-screen",
  imports: [...UI_KIT],
  template,
})
export default class Screen extends ScreenBase {
  hairline = "rgba(121, 133, 122, 0.35)";

  profile = signal({
    full_name: "Ananya Raghavan",
    email: "ananya.raghavan@gmail.com",
    phone: "+91 98204 41127",
    role: "Attendee",
  });

  consent = signal({
    purposes: ["Account", "Bookings", "Ticketing"],
    notice_version: "1.2",
    consent_given: true,
    granted_at: "14 Oct 2026, 10:24 IST",
    withdrawn_at: null,
  });

  lastSynced = signal("16:38 IST");
  dialogOpen = signal(false);
  dialogShown = signal(false);
  submitting = signal(false);
  errorMessage = signal("");
  recordShown = signal(false);

  withdrawn = computed(() => this.consent().withdrawn_at !== null);
  purposeLine = computed(() => this.consent().purposes.join(", ").toLowerCase());
  withdrawnAtLabel = computed(() => formatIst(this.consent().withdrawn_at));

  focusConfirm = effect(() => {
    if (this.dialogShown()) {
      setTimeout(() => {
        const el = document.getElementById("confirm-withdrawal");
        if (el) {
          el.focus();
        }
      }, 30);
    }
  });

  openDialog() {
    if (this.withdrawn()) {
      return;
    }
    this.errorMessage.set("");
    this.dialogOpen.set(true);
    setTimeout(() => this.dialogShown.set(true), 10);
  }

  closeDialog() {
    if (this.submitting()) {
      return;
    }
    this.dialogShown.set(false);
    setTimeout(() => {
      this.dialogOpen.set(false);
      const el = document.getElementById("withdraw-consent");
      if (el && !el.disabled) {
        el.focus();
      }
    }, 170);
  }

  confirmWithdrawal() {
    if (this.submitting()) {
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set("");

    apiFetch("/consent/withdraw", {
      method: "POST",
      body: JSON.stringify({ purposes: this.consent().purposes }),
    })
      .then((res) => {
        this.consent.update(function (record) {
          return {
            purposes: record.purposes,
            notice_version: record.notice_version,
            consent_given: false,
            granted_at: record.granted_at,
            withdrawn_at: res && res.withdrawnAt ? res.withdrawnAt : new Date().toISOString(),
          };
        });
        this.lastSynced.set(new Date().toISOString());
        this.submitting.set(false);
        this.dialogShown.set(false);

        setTimeout(() => {
          this.dialogOpen.set(false);
          this.recordShown.set(true);
          const el = document.getElementById("withdrawal-record");
          if (el) {
            el.focus();
          }
        }, 170);
      })
      .catch(() => {
        this.submitting.set(false);
        this.errorMessage.set(
          "we could not reach the consent register. Your consent is unchanged and nothing has been sent. Try again once you are back on a connection.",
        );
      });
  }
}
