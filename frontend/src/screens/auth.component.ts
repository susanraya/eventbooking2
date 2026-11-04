// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<div class="min-h-screen w-full px-4 py-10 sm:px-6 sm:py-14"
     [style.background-color]="brand.backgroundColor"
     [style.color]="brand.primaryColor"
     [style.font-family]="brand.fontBody">

  <main class="mx-auto w-full max-w-2xl p-6 text-center sm:p-10"
        [style.border]="'1px solid ' + brand.accentColor"
        [style.outline]="'1px solid ' + brand.primaryColor"
        [style.outline-offset.px]="3"
        [style.border-radius]="brand.radius">

    <p aria-hidden="true" class="text-sm tracking-[0.5em]" [style.color]="brand.accentColor">&#9670; &#9670; &#9670;</p>

    <h1 data-wf="b-0-0"
        class="mt-4 text-2xl uppercase leading-snug tracking-[0.28em] sm:text-3xl"
        [style.font-family]="brand.fontHeading">Sign in or create an account</h1>

    <p class="mt-3 text-[11px] uppercase tracking-[0.3em]" [style.color]="brand.primaryColor">
      eventbooking2 &middot; the box office
    </p>

    <div aria-hidden="true" class="mt-6 flex items-center gap-3">
      <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
      <span class="text-xs" [style.color]="brand.accentColor">&#9670;</span>
      <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
    </div>

    <!-- Row 2 : tabs -->
    <div data-wf="b-1-0" class="mt-8">
      <div role="tablist" aria-label="Sign in or register" class="grid grid-cols-1 gap-2 sm:grid-cols-3">
        @for (t of tabs; track t.id) {
          <button type="button"
                  role="tab"
                  [id]="'tab-' + t.id"
                  [attr.data-wf]="t.wf"
                  [attr.aria-selected]="tab() === t.id ? 'true' : 'false'"
                  [attr.aria-controls]="'panel-' + t.id"
                  [attr.tabindex]="tab() === t.id ? 0 : -1"
                  (click)="selectTab(t.id)"
                  (keydown)="onTabKeys($event)"
                  class="min-h-[44px] px-3 py-3 text-[10px] uppercase tracking-[0.22em] transition-colors duration-200 hover:opacity-90 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  [style.font-family]="brand.fontHeading"
                  [style.border]="'1px solid ' + (tab() === t.id ? brand.primaryColor : brand.accentColor)"
                  [style.border-radius]="brand.radius"
                  [style.background-color]="tab() === t.id ? brand.primaryColor : 'transparent'"
                  [style.color]="tab() === t.id ? brand.accentColor : brand.primaryColor"
                  [style.outline-color]="brand.primaryColor">
            {{ t.label }}
          </button>
        }
      </div>
    </div>

    <div role="tabpanel"
         [id]="'panel-' + tab()"
         [attr.aria-labelledby]="'tab-' + tab()">

      <form (keydown.enter)="onEnter($event)" novalidate>

        <!-- Row 3 : form -->
        <section data-wf="b-2-0" class="mt-8 text-left">
          <h2 class="text-center text-[11px] uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading">Your details</h2>
          <div aria-hidden="true" class="mt-3 flex items-center gap-3">
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
            <span class="text-[10px]" [style.color]="brand.accentColor">&#9670;</span>
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
          </div>

          <div class="mt-6 space-y-5">

            @if (isRegister()) {
              <div class="space-y-2">
                <label uiLabel for="full_name" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">Full name</label>
                <input uiInput
                       id="full_name"
                       data-wf="i-2-0-0"
                       type="text"
                       autocomplete="name"
                       placeholder="Aarav Menon"
                       [(ngModel)]="fullName"
                       [ngModelOptions]="{ standalone: true }"
                       [disabled]="locked()"
                       [attr.aria-invalid]="errors().fullName ? 'true' : null"
                       [attr.aria-describedby]="errors().fullName ? 'full_name-error' : null"
                       class="h-11 w-full bg-transparent px-3 text-center text-sm outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                       [style.border]="'1px solid ' + (errors().fullName ? brand.primaryColor : brand.accentColor)"
                       [style.border-radius]="brand.radius"
                       [style.color]="brand.primaryColor"
                       [style.outline-color]="brand.primaryColor" />
                @if (errors().fullName) {
                  <p id="full_name-error" class="flex items-start gap-2 text-xs leading-relaxed">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ errors().fullName }}</span>
                  </p>
                }
              </div>
            }

            <div class="space-y-2">
              <label uiLabel for="email" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">Email</label>
              <input uiInput
                     id="email"
                     data-wf="i-2-0-1"
                     type="email"
                     autocomplete="email"
                     placeholder="aarav.menon&#64;gmail.com"
                     [(ngModel)]="email"
                     [ngModelOptions]="{ standalone: true }"
                     [disabled]="locked()"
                     [attr.aria-invalid]="errors().email ? 'true' : null"
                     [attr.aria-describedby]="errors().email ? 'email-error' : null"
                     class="h-11 w-full bg-transparent px-3 text-center text-sm outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + (errors().email ? brand.primaryColor : brand.accentColor)"
                     [style.border-radius]="brand.radius"
                     [style.color]="brand.primaryColor"
                     [style.outline-color]="brand.primaryColor" />
              @if (errors().email) {
                <p id="email-error" class="flex items-start gap-2 text-xs leading-relaxed">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ errors().email }}</span>
                </p>
              }
            </div>

            <div class="space-y-2">
              <label uiLabel for="password" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">
                Password
                <span class="ml-1 normal-case tracking-normal tabular-nums">(min 8 characters, 1 number)</span>
              </label>
              <input uiInput
                     id="password"
                     data-wf="i-2-0-2"
                     type="password"
                     [attr.autocomplete]="isRegister() ? 'new-password' : 'current-password'"
                     [(ngModel)]="password"
                     [ngModelOptions]="{ standalone: true }"
                     [disabled]="locked()"
                     [attr.aria-invalid]="errors().password ? 'true' : null"
                     [attr.aria-describedby]="errors().password ? 'password-hint password-error' : 'password-hint'"
                     class="h-11 w-full bg-transparent px-3 text-center text-sm outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                     [style.border]="'1px solid ' + (errors().password ? brand.primaryColor : brand.accentColor)"
                     [style.border-radius]="brand.radius"
                     [style.color]="brand.primaryColor"
                     [style.outline-color]="brand.primaryColor" />
              <p id="password-hint" class="text-xs leading-relaxed tabular-nums">Eight characters or more, with at least one number.</p>
              @if (errors().password) {
                <p id="password-error" class="flex items-start gap-2 text-xs leading-relaxed">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ errors().password }}</span>
                </p>
              }
            </div>

            @if (isRegister()) {
              <div class="space-y-2">
                <label uiLabel for="phone" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">Phone</label>
                <input uiInput
                       id="phone"
                       data-wf="i-2-0-3"
                       type="tel"
                       autocomplete="tel"
                       inputmode="tel"
                       placeholder="98200 41167"
                       [(ngModel)]="phone"
                       [ngModelOptions]="{ standalone: true }"
                       [disabled]="locked()"
                       [attr.aria-invalid]="errors().phone ? 'true' : null"
                       [attr.aria-describedby]="errors().phone ? 'phone-hint phone-error' : 'phone-hint'"
                       class="h-11 w-full bg-transparent px-3 text-center text-sm tabular-nums outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                       [style.border]="'1px solid ' + (errors().phone ? brand.primaryColor : brand.accentColor)"
                       [style.border-radius]="brand.radius"
                       [style.color]="brand.primaryColor"
                       [style.outline-color]="brand.primaryColor" />
                <p id="phone-hint" class="text-xs leading-relaxed tabular-nums">A 10-digit Indian mobile number, used for booking confirmations.</p>
                @if (errors().phone) {
                  <p id="phone-error" class="flex items-start gap-2 text-xs leading-relaxed">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ errors().phone }}</span>
                  </p>
                }
              </div>
            }

            @if (isOrganizer()) {
              <div class="space-y-2">
                <label uiLabel for="organization_name" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">Organization name</label>
                <input uiInput
                       id="organization_name"
                       data-wf="i-2-0-4"
                       type="text"
                       autocomplete="organization"
                       placeholder="Sitara House Live"
                       [(ngModel)]="orgName"
                       [ngModelOptions]="{ standalone: true }"
                       [disabled]="locked()"
                       [attr.aria-invalid]="errors().orgName ? 'true' : null"
                       [attr.aria-describedby]="errors().orgName ? 'organization_name-hint organization_name-error' : 'organization_name-hint'"
                       class="h-11 w-full bg-transparent px-3 text-center text-sm outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                       [style.border]="'1px solid ' + (errors().orgName ? brand.primaryColor : brand.accentColor)"
                       [style.border-radius]="brand.radius"
                       [style.color]="brand.primaryColor"
                       [style.outline-color]="brand.primaryColor" />
                <p id="organization_name-hint" class="text-xs leading-relaxed">This is the name attendees see on every listing you publish.</p>
                @if (errors().orgName) {
                  <p id="organization_name-error" class="flex items-start gap-2 text-xs leading-relaxed">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ errors().orgName }}</span>
                  </p>
                }
              </div>

              <div class="space-y-2">
                <label uiLabel for="contact_details" class="block text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.primaryColor">Contact details</label>
                <textarea uiTextarea
                          id="contact_details"
                          data-wf="i-2-0-5"
                          rows="3"
                          placeholder="Box office: 022 2284 1190 &middot; boxoffice&#64;sitarahouse.in &middot; Kala Ghoda, Mumbai"
                          [(ngModel)]="contactDetails"
                          [ngModelOptions]="{ standalone: true }"
                          [disabled]="locked()"
                          [attr.aria-invalid]="errors().contactDetails ? 'true' : null"
                          [attr.aria-describedby]="errors().contactDetails ? 'contact_details-hint contact_details-error' : 'contact_details-hint'"
                          class="w-full bg-transparent p-3 text-sm leading-relaxed outline-none transition-colors duration-200 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          [style.border]="'1px solid ' + (errors().contactDetails ? brand.primaryColor : brand.accentColor)"
                          [style.border-radius]="brand.radius"
                          [style.color]="brand.primaryColor"
                          [style.outline-color]="brand.primaryColor"></textarea>
                <p id="contact_details-hint" class="text-xs leading-relaxed">A phone number or email attendees can reach you on about your events.</p>
                @if (errors().contactDetails) {
                  <p id="contact_details-error" class="flex items-start gap-2 text-xs leading-relaxed">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ errors().contactDetails }}</span>
                  </p>
                }
              </div>
            }
          </div>
        </section>

        @if (isRegister()) {
          <!-- Row 4 : consent notice -->
          <p data-wf="b-3-0" class="mt-8 text-left text-sm leading-relaxed tabular-nums">
            We process your name, email and phone to create your account, confirm bookings and issue tickets. Consent notice v1.2, dated 1 Oct 2026.
          </p>

          <!-- Row 5 : DPDP consent -->
          <div data-wf="b-4-0"
               class="mt-5 flex items-start gap-3 p-4 text-left transition-colors duration-200"
               [style.border]="'1px solid ' + (errors().consent ? brand.primaryColor : brand.accentColor)"
               [style.border-radius]="brand.radius">
            <input uiCheckbox
                   id="consent"
                   type="checkbox"
                   [(ngModel)]="consent"
                   [ngModelOptions]="{ standalone: true }"
                   [disabled]="locked()"
                   [attr.aria-invalid]="errors().consent ? 'true' : null"
                   [attr.aria-describedby]="errors().consent ? 'consent-error' : null"
                   class="mt-0.5 h-5 w-5 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                   [style.accent-color]="brand.primaryColor"
                   [style.outline-color]="brand.primaryColor" />
            <div class="space-y-1">
              <label uiLabel for="consent" class="block text-sm leading-relaxed">I consent to the processing of my personal data for the purposes described above</label>
              @if (errors().consent) {
                <p id="consent-error" class="flex items-start gap-2 text-xs leading-relaxed">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ errors().consent }}</span>
                </p>
              }
            </div>
          </div>

          <!-- Row 6 : terms -->
          <div data-wf="b-5-0"
               class="mt-3 flex items-start gap-3 p-4 text-left transition-colors duration-200"
               [style.border]="'1px solid ' + (errors().terms ? brand.primaryColor : brand.accentColor)"
               [style.border-radius]="brand.radius">
            <input uiCheckbox
                   id="terms"
                   type="checkbox"
                   [(ngModel)]="terms"
                   [ngModelOptions]="{ standalone: true }"
                   [disabled]="locked()"
                   [attr.aria-invalid]="errors().terms ? 'true' : null"
                   [attr.aria-describedby]="errors().terms ? 'terms-error' : null"
                   class="mt-0.5 h-5 w-5 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                   [style.accent-color]="brand.primaryColor"
                   [style.outline-color]="brand.primaryColor" />
            <div class="space-y-1">
              <label uiLabel for="terms" class="block text-sm leading-relaxed">I accept the Terms of Service</label>
              @if (errors().terms) {
                <p id="terms-error" class="flex items-start gap-2 text-xs leading-relaxed">
                  <ui-icon name="AlertCircle" class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true"></ui-icon>
                  <span>{{ errors().terms }}</span>
                </p>
              }
            </div>
          </div>
        }

        <!-- Row 7 : notice / errors -->
        <div data-wf="b-6-0" class="mt-6" aria-live="polite">
          @if (activeNotice(); as note) {
            <div class="flex items-start gap-3 p-4 text-left transition-colors duration-200"
                 [attr.role]="note.kind === 'error' ? 'alert' : null"
                 [style.border]="'1px solid ' + (note.kind === 'info' ? brand.accentColor : brand.primaryColor)"
                 [style.border-radius]="brand.radius">
              <ui-icon [name]="noteIcon(note.kind)" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
              <div class="space-y-1">
                <p class="text-[10px] uppercase tracking-[0.22em]" [style.font-family]="brand.fontHeading">{{ note.title }}</p>
                @for (line of note.lines; track line) {
                  <p class="text-sm leading-relaxed tabular-nums">{{ line }}</p>
                }
              </div>
            </div>
          } @else {
            <p class="text-left text-xs leading-relaxed tabular-nums">
              Trying the prototype? The house account priya&#64;sitarahouse.in with password Sitara2026 signs in as an organizer; aarav.menon&#64;gmail.com with Mumbai2026 signs in as an attendee.
            </p>
          }
        </div>

        <!-- Row 8 : actions -->
        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button data-wf="b-7-0"
                  type="button"
                  (click)="createAccount()"
                  [disabled]="locked()"
                  [attr.aria-busy]="pending() === 'create' ? 'true' : null"
                  class="inline-flex min-h-[48px] items-center justify-center gap-2 px-4 text-[11px] uppercase tracking-[0.28em] transition-all duration-200 hover:opacity-90 disabled:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  [style.font-family]="brand.fontHeading"
                  [style.border]="'1px solid ' + brand.primaryColor"
                  [style.border-radius]="brand.radius"
                  [style.background-color]="isRegister() ? brand.primaryColor : 'transparent'"
                  [style.color]="isRegister() ? brand.accentColor : brand.primaryColor"
                  [style.outline-color]="brand.primaryColor">
            <span>Create account</span>
            @if (pending() === 'create') {
              <span aria-hidden="true" class="animate-pulse motion-reduce:animate-none">&#9670;</span>
            }
          </button>

          <button data-wf="b-7-1"
                  type="button"
                  (click)="signIn()"
                  [disabled]="locked()"
                  [attr.aria-busy]="pending() === 'signin' ? 'true' : null"
                  class="inline-flex min-h-[48px] items-center justify-center gap-2 px-4 text-[11px] uppercase tracking-[0.28em] transition-all duration-200 hover:opacity-90 disabled:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  [style.font-family]="brand.fontHeading"
                  [style.border]="'1px solid ' + brand.primaryColor"
                  [style.border-radius]="brand.radius"
                  [style.background-color]="isRegister() ? 'transparent' : brand.primaryColor"
                  [style.color]="isRegister() ? brand.primaryColor : brand.accentColor"
                  [style.outline-color]="brand.primaryColor">
            <span>Sign in</span>
            @if (pending() === 'signin') {
              <span aria-hidden="true" class="animate-pulse motion-reduce:animate-none">&#9670;</span>
            }
          </button>
        </div>
      </form>
    </div>

    <p aria-hidden="true" class="mt-8 text-xs tracking-[0.5em]" [style.color]="brand.accentColor">&#9670; &#9670; &#9670;</p>
  </main>
</div>
`;

@Component({
  selector: "app-auth-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  tabs = [
    { id: 'signin', label: 'Sign in', wf: 'i-1-0-0' },
    { id: 'attendee', label: 'Register as attendee', wf: 'i-1-0-1' },
    { id: 'organizer', label: 'Register as organizer', wf: 'i-1-0-2' }
  ];

  tab = signal('signin');

  fullName = signal('');
  email = signal('');
  password = signal('');
  phone = signal('');
  orgName = signal('');
  contactDetails = signal('');
  consent = signal(false);
  terms = signal(false);

  emptyErrors() {
    return {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      orgName: '',
      contactDetails: '',
      consent: '',
      terms: ''
    };
  }

  emptyNotice() {
    return { kind: 'none', title: '', lines: [''] };
  }

  errors = signal(this.emptyErrors());
  formNotice = signal(this.emptyNotice());
  pending = signal('');
  phase = signal('idle');

  noticeVersion = 'v1.2';

  registeredEmails = ['aarav.menon@gmail.com', 'priya@sitarahouse.in'];

  accounts = [
    { email: 'aarav.menon@gmail.com', password: 'Mumbai2026', role: 'attendee' },
    { email: 'priya@sitarahouse.in', password: 'Sitara2026', role: 'organizer' }
  ];

  isRegister = computed(() => this.tab() !== 'signin');
  isOrganizer = computed(() => this.tab() === 'organizer');
  locked = computed(() => this.pending() !== '' || this.phase() === 'done');
  activeNotice = computed(() => this.formNotice().kind === 'none' ? null : this.formNotice());

  noteIcon(kind) {
    if (kind === 'success') return 'CheckCircle';
    if (kind === 'info') return 'Clock';
    return 'AlertCircle';
  }

  clearNotice() {
    this.formNotice.set(this.emptyNotice());
  }

  selectTab(id) {
    if (this.locked() || this.tab() === id) return;
    this.tab.set(id);
    this.errors.set(this.emptyErrors());
    this.clearNotice();
  }

  onTabKeys(event) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (keys.indexOf(event.key) === -1) return;
    event.preventDefault();
    const ids = this.tabs.map((t) => t.id);
    let i = ids.indexOf(this.tab());
    if (event.key === 'ArrowRight') i = (i + 1) % ids.length;
    if (event.key === 'ArrowLeft') i = (i - 1 + ids.length) % ids.length;
    if (event.key === 'Home') i = 0;
    if (event.key === 'End') i = ids.length - 1;
    this.selectTab(ids[i]);
    const el = document.getElementById('tab-' + ids[i]);
    if (el) el.focus();
  }

  onEnter(event) {
    const tag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
    if (tag === 'TEXTAREA' || tag === 'BUTTON') return;
    event.preventDefault();
    if (this.isRegister()) this.createAccount();
    else this.signIn();
  }

  validate(asRegister) {
    const e = this.emptyErrors();
    const email = this.email().trim();
    const pwd = this.password();

    if (!email) e.email = 'Enter the email address on your account.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That does not look like an email address. Use a format like aarav.menon@gmail.com.';

    if (!pwd) e.password = 'Enter your password.';

    if (asRegister) {
      if (!this.fullName().trim()) e.fullName = 'Tell us the name that should be printed on your tickets.';
      if (pwd && (pwd.length < 8 || !/[0-9]/.test(pwd))) e.password = 'Password needs at least 8 characters and 1 number.';

      const digits = this.phone().replace(/[^0-9]/g, '');
      if (!this.phone().trim()) e.phone = 'Enter a mobile number so we can confirm your bookings.';
      else if (!(digits.length === 10 || (digits.length === 12 && digits.indexOf('91') === 0))) e.phone = 'Enter a 10-digit Indian mobile number.';

      if (!e.email && this.registeredEmails.indexOf(email.toLowerCase()) !== -1) e.email = 'That email is already in use.';

      if (this.isOrganizer()) {
        if (!this.orgName().trim()) e.orgName = 'Enter the name attendees will see on your listings.';
        if (!this.contactDetails().trim()) e.contactDetails = 'Add a phone number or email for attendee queries.';
      }

      if (!this.consent()) e.consent = 'Consent is required before registration can be completed.';
      if (!this.terms()) e.terms = 'Accept the Terms of Service to continue.';
    }

    return e;
  }

  orderedMessages(errs) {
    const order = ['fullName', 'email', 'password', 'phone', 'orgName', 'contactDetails', 'consent', 'terms'];
    const lines = [];
    for (let i = 0; i < order.length; i++) {
      if (errs[order[i]]) lines.push(errs[order[i]]);
    }
    return lines;
  }

  stamp() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date();
    const hh = ('0' + d.getHours()).slice(-2);
    const mm = ('0' + d.getMinutes()).slice(-2);
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' at ' + hh + ':' + mm;
  }

  createAccount() {
    if (this.locked()) return;

    if (!this.isRegister()) {
      this.tab.set('attendee');
      this.errors.set(this.emptyErrors());
      this.formNotice.set({
        kind: 'info',
        title: 'Choose how to register',
        lines: ['Switched to Register as attendee. Add your name and phone, tick consent, then create your account.']
      });
      const el = document.getElementById('tab-attendee');
      if (el) el.focus();
      return;
    }

    const errs = this.validate(true);
    this.errors.set(errs);
    const lines = this.orderedMessages(errs);

    if (lines.length) {
      this.formNotice.set({
        kind: 'error',
        title: 'Before we can open the doors',
        lines: lines
      });
      return;
    }

    this.pending.set('create');
    this.formNotice.set({
      kind: 'info',
      title: 'Creating your account',
      lines: ['Recording your consent against notice ' + this.noticeVersion + ' and setting up your account.']
    });

    setTimeout(() => {
      const role = this.isOrganizer() ? 'organizer' : 'attendee';
      this.registeredEmails = this.registeredEmails.concat([this.email().trim().toLowerCase()]);
      this.pending.set('');
      this.phase.set('done');
      this.formNotice.set({
        kind: 'success',
        title: 'Account created',
        lines: [
          'Welcome, ' + this.fullName().trim() + '. Your ' + role + ' account is live and you are signed in.',
          'Consent recorded for account creation, booking confirmation and ticket issue. Notice ' + this.noticeVersion + ', ' + this.stamp() + '.',
          'Taking you to Browse Events.'
        ]
      });
      setTimeout(() => {
        this.navigate('events');
      }, 900);
    }, 800);
  }

  signIn() {
    if (this.locked()) return;

    if (this.isRegister()) {
      this.tab.set('signin');
      this.errors.set(this.emptyErrors());
      this.formNotice.set({
        kind: 'info',
        title: 'Already have an account',
        lines: ['Switched to Sign in. Everything you typed is still here.']
      });
      const el = document.getElementById('tab-signin');
      if (el) el.focus();
      return;
    }

    const errs = this.validate(false);
    this.errors.set(errs);
    const lines = this.orderedMessages(errs);

    if (lines.length) {
      this.formNotice.set({
        kind: 'error',
        title: 'Check these details',
        lines: lines
      });
      return;
    }

    this.pending.set('signin');
    this.formNotice.set({
      kind: 'info',
      title: 'Checking your details',
      lines: ['One moment while we match your email and password.']
    });

    setTimeout(() => {
      const email = this.email().trim().toLowerCase();
      const pwd = this.password();
      let match = { email: '', password: '', role: '' };
      let found = false;
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].email === email && this.accounts[i].password === pwd) {
          match = this.accounts[i];
          found = true;
        }
      }

      this.pending.set('');

      if (!found) {
        this.formNotice.set({
          kind: 'error',
          title: 'We could not sign you in',
          lines: ['Those sign-in details do not match an account. Check the email and password and try again.']
        });
        return;
      }

      this.phase.set('done');
      this.formNotice.set({
        kind: 'success',
        title: 'Signed in',
        lines: match.role === 'organizer'
          ? ['Welcome back. Opening your organizer dashboard.']
          : ['Welcome back. Opening Browse Events.']
      });

      setTimeout(() => {
        if (match.role === 'organizer') this.navigate('organizer-dashboard');
        else this.navigate('events');
      }, 700);
    }, 800);
  }
}
