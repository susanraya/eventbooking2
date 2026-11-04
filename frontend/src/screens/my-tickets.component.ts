// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<div class="gq-scope min-h-screen w-full px-4 py-10 sm:px-6 lg:px-10"
     [style.--gq-primary]="brand.primaryColor"
     [style.--gq-accent]="brand.accentColor"
     [style.--gq-bg]="brand.backgroundColor"
     [style.background-color]="brand.backgroundColor"
     [style.color]="brand.primaryColor"
     [style.font-family]="brand.fontBody">

  <style>
    .gq-scope button:focus-visible,
    .gq-scope [tabindex]:focus-visible,
    .gq-scope a:focus-visible { outline: 2px solid var(--gq-accent, currentColor); outline-offset: 3px; }
    .gq-item .gq-inner { transition: background-color .18s ease, border-color .18s ease; }
    .gq-item:hover .gq-inner { background-color: color-mix(in srgb, var(--gq-accent) 14%, var(--gq-bg)); }
    .gq-tab { transition: background-color .18s ease, color .18s ease, letter-spacing .18s ease; }
    .gq-tab:hover { background-color: color-mix(in srgb, var(--gq-accent) 22%, var(--gq-bg)); }
    .gq-tab[aria-selected="true"]:hover { background-color: color-mix(in srgb, var(--gq-primary) 88%, var(--gq-accent)); }
    .gq-act { transition: background-color .18s ease, color .18s ease, opacity .18s ease; }
    .gq-act:hover:not(:disabled) { background-color: color-mix(in srgb, var(--gq-primary) 82%, var(--gq-accent)); }
    .gq-ghost { transition: background-color .18s ease; }
    .gq-ghost:hover { background-color: color-mix(in srgb, var(--gq-accent) 24%, var(--gq-bg)); }
    @keyframes gq-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes gq-fade { from { opacity: 0; } to { opacity: 1; } }
    .gq-row { animation: gq-rise .3s ease-out both; }
    .gq-overlay { animation: gq-fade .18s ease-out both; }
    .gq-dialog { animation: gq-rise .26s cubic-bezier(.2,.7,.3,1) both; }
    @media (prefers-reduced-motion: reduce) {
      .gq-row, .gq-overlay, .gq-dialog { animation: none; }
      .gq-scope * { transition: none !important; }
    }
  </style>

  <div class="mx-auto w-full max-w-5xl">

    <!-- ROW 1 — page title -->
    <header data-wf="b-0-0" class="text-center">
      <p class="text-[10px] uppercase tracking-[0.42em]" [style.color]="tint(brand.primaryColor, 0.7)">
        Attendee account &middot; susan.raya&#64;quorq.ai
      </p>
      <h1 class="mt-4 text-3xl uppercase sm:text-4xl"
          [style.font-family]="brand.fontHeading"
          style="letter-spacing: 0.3em; font-weight: 600;">
        My Tickets
      </h1>

      <div class="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
        <span class="h-px w-20 sm:w-40" [style.background-color]="brand.accentColor"></span>
        <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor"></span>
        <span class="h-px w-20 sm:w-40" [style.background-color]="brand.accentColor"></span>
      </div>
      <div class="mt-[3px] flex items-center justify-center" aria-hidden="true">
        <span class="h-px w-28 sm:w-56" [style.background-color]="tint(brand.primaryColor, 0.45)"></span>
      </div>

      <p class="mx-auto mt-6 max-w-[58ch] text-sm leading-relaxed" [style.color]="tint(brand.primaryColor, 0.78)">
        Every pass you hold, kept in one place. Open a ticket to show its code at the gate &mdash;
        it stays on this device, so it opens even where the signal does not.
      </p>
    </header>

    <!-- ROW 2 — tabs -->
    <div data-wf="b-1-0" class="mt-10 flex justify-center">
      <div class="p-[3px]" [style.border]="'1px solid ' + tint(brand.primaryColor, 0.5)">
        <div role="tablist" aria-label="Ticket periods" class="flex"
             [style.border]="'1px solid ' + brand.accentColor">
          <button type="button" role="tab" id="tab-upcoming" data-wf="i-1-0-0"
                  class="gq-tab flex min-h-[44px] items-center gap-3 px-5 text-[11px] uppercase sm:px-8"
                  style="letter-spacing: 0.3em;"
                  [attr.aria-selected]="tab() === 'upcoming'"
                  [attr.tabindex]="tab() === 'upcoming' ? 0 : -1"
                  aria-controls="tickets-panel"
                  [style.background-color]="tab() === 'upcoming' ? brand.primaryColor : 'transparent'"
                  [style.color]="tab() === 'upcoming' ? brand.accentColor : tint(brand.primaryColor, 0.72)"
                  (click)="setTab('upcoming')" (keydown)="onTabKey($event)">
            <span>Upcoming</span>
            <span class="px-2 py-[2px] text-[11px]"
                  style="font-variant-numeric: tabular-nums; letter-spacing: 0.1em;"
                  [style.border]="'1px solid ' + (tab() === 'upcoming' ? brand.accentColor : tint(brand.primaryColor, 0.35))">{{ upcoming().length }}</span>
          </button>
          <span aria-hidden="true" class="w-px" [style.background-color]="brand.accentColor"></span>
          <button type="button" role="tab" id="tab-past" data-wf="i-1-0-1"
                  class="gq-tab flex min-h-[44px] items-center gap-3 px-5 text-[11px] uppercase sm:px-8"
                  style="letter-spacing: 0.3em;"
                  [attr.aria-selected]="tab() === 'past'"
                  [attr.tabindex]="tab() === 'past' ? 0 : -1"
                  aria-controls="tickets-panel"
                  [style.background-color]="tab() === 'past' ? brand.primaryColor : 'transparent'"
                  [style.color]="tab() === 'past' ? brand.accentColor : tint(brand.primaryColor, 0.72)"
                  (click)="setTab('past')" (keydown)="onTabKey($event)">
            <span>Past</span>
            <span class="px-2 py-[2px] text-[11px]"
                  style="font-variant-numeric: tabular-nums; letter-spacing: 0.1em;"
                  [style.border]="'1px solid ' + (tab() === 'past' ? brand.accentColor : tint(brand.primaryColor, 0.35))">{{ past().length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ROW 3 — list -->
    <section data-wf="b-2-0" id="tickets-panel" role="tabpanel" tabindex="0"
             class="mt-8 focus:outline-none"
             [attr.aria-labelledby]="tab() === 'upcoming' ? 'tab-upcoming' : 'tab-past'">
      <h2 class="sr-only">{{ tab() === 'upcoming' ? 'Upcoming tickets' : 'Past tickets' }}</h2>

      @if (visible().length > 0) {
        <ul role="list" class="space-y-4">
          @for (t of visible(); track t.id; let i = $index) {
            <li class="gq-row gq-item" [style.animation-delay]="(i * 55) + 'ms'">
              <div class="p-[3px]" [style.border]="'1px solid ' + tint(brand.primaryColor, 0.42)">
                <div class="gq-inner flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                     [style.border]="'1px solid ' + brand.accentColor"
                     [style.background-color]="brand.backgroundColor">

                  <!-- date plate -->
                  <div class="flex items-center gap-4 sm:w-[128px] sm:flex-col sm:items-center sm:gap-0 sm:border-r sm:pr-6"
                       [style.border-color]="tint(brand.primaryColor, 0.22)">
                    <span class="text-[10px] uppercase" style="letter-spacing: 0.32em;"
                          [style.color]="tint(brand.primaryColor, 0.7)">{{ t.dow }}</span>
                    <span class="text-3xl leading-none sm:mt-1"
                          style="font-variant-numeric: tabular-nums; letter-spacing: 0.04em;"
                          [style.font-family]="brand.fontHeading">{{ t.day }}</span>
                    <span class="text-[10px] uppercase sm:mt-2" style="letter-spacing: 0.32em; font-variant-numeric: tabular-nums;"
                          [style.color]="tint(brand.primaryColor, 0.7)">{{ t.monthYear }}</span>
                  </div>

                  <!-- event -->
                  <div class="min-w-0 flex-1">
                    <h3 class="text-[15px] uppercase leading-snug sm:text-base"
                        style="letter-spacing: 0.16em;"
                        [style.font-family]="brand.fontHeading">{{ t.event_title }}</h3>
                    <p class="mt-2 text-sm" style="font-variant-numeric: tabular-nums;"
                       [style.color]="tint(brand.primaryColor, 0.78)">
                      {{ t.time }} &middot; {{ t.venue }}, {{ t.city }}
                    </p>
                    <p class="mt-2 text-[11px] uppercase" style="letter-spacing: 0.22em; font-variant-numeric: tabular-nums;"
                       [style.color]="tint(brand.primaryColor, 0.62)">
                      {{ t.ticket_type }} &middot; Ticket {{ t.qr_code_id }}
                    </p>
                    @if (t.note) {
                      <p class="mt-2 text-xs" [style.color]="tint(brand.primaryColor, 0.62)">{{ t.note }}</p>
                    }
                  </div>

                  <!-- status + action -->
                  <div class="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-4">
                    <span uiBadge [attr.variant]="t.status === 'Cancelled' ? 'destructive' : 'outline'"
                          class="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase"
                          style="letter-spacing: 0.26em; border-radius: 0;"
                          [style.background-color]="t.status === 'Valid' ? brand.primaryColor : 'transparent'"
                          [style.color]="t.status === 'Valid' ? brand.accentColor : tint(brand.primaryColor, 0.75)"
                          [style.border]="'1px solid ' + (t.status === 'Valid' ? brand.accentColor : tint(brand.primaryColor, 0.35))">
                      <ui-icon [name]="statusIcon(t.status)" class="h-3 w-3" aria-hidden="true"></ui-icon>
                      {{ t.status }}
                    </span>

                    <button type="button" uiButton size="sm"
                            [attr.data-wf]="t.wf"
                            class="gq-act min-h-[44px] px-5 text-[10px] uppercase"
                            style="letter-spacing: 0.26em; border-radius: 0;"
                            [disabled]="t.status === 'Cancelled'"
                            [style.background-color]="brand.primaryColor"
                            [style.color]="brand.accentColor"
                            [style.border]="'1px solid ' + brand.accentColor"
                            [style.opacity]="t.status === 'Cancelled' ? '0.45' : '1'"
                            [attr.aria-label]="'Show QR code for ticket ' + t.qr_code_id + ', ' + t.event_title"
                            (click)="openTicket(t.id, $event)">
                      Show QR code
                    </button>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>

        <p class="mt-6 text-center text-[11px] uppercase"
           style="letter-spacing: 0.24em; font-variant-numeric: tabular-nums;"
           [style.color]="tint(brand.primaryColor, 0.6)">
          {{ upcoming().length }} upcoming &middot; {{ past().length }} past &middot; synced 09:42 IST
        </p>
      }

      <!-- ROW 6 — empty state -->
      @if (visible().length === 0) {
        <div data-wf="b-5-0" class="gq-row mt-2">
          <div class="p-[3px]" [style.border]="'1px solid ' + tint(brand.primaryColor, 0.42)">
            <div class="px-6 py-14 text-center" [style.border]="'1px solid ' + brand.accentColor">
              <div class="mb-6 flex items-center justify-center gap-2" aria-hidden="true">
                <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor"></span>
                <span class="h-3 w-3 rotate-45" [style.border]="'1px solid ' + brand.primaryColor"></span>
                <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor"></span>
              </div>
              <ui-empty [title]="emptyTitle()" [description]="emptyDescription()">
                <button type="button" uiButton
                        class="gq-act mt-2 inline-flex min-h-[44px] items-center gap-2 px-6 text-[11px] uppercase"
                        style="letter-spacing: 0.26em; border-radius: 0;"
                        [style.background-color]="brand.primaryColor"
                        [style.color]="brand.accentColor"
                        [style.border]="'1px solid ' + brand.accentColor"
                        (click)="navigate('events')">
                  <ui-icon name="Search" class="h-4 w-4" aria-hidden="true"></ui-icon>
                  Browse events
                </button>
              </ui-empty>
            </div>
          </div>
        </div>
      }
    </section>
  </div>

  <!-- ROW 4 — ticket modal -->
  @if (selected(); as t) {
    <div class="gq-overlay fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-8"
         [style.background-color]="tint(brand.primaryColor, 0.78)">
      <div data-wf="b-3-0" id="ticket-dialog" role="dialog" aria-modal="true" tabindex="-1"
           aria-labelledby="ticket-dialog-title" aria-describedby="ticket-dialog-help"
           class="gq-dialog w-full max-w-2xl p-[4px] focus:outline-none"
           style="box-shadow: 0 24px 60px rgba(0,0,0,.35);"
           [style.border]="'1px solid ' + brand.accentColor"
           [style.background-color]="brand.backgroundColor"
           (keydown)="onDialogKey($event)">
        <div class="p-6 sm:p-8" [style.border]="'1px solid ' + tint(brand.primaryColor, 0.55)">

          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="text-[10px] uppercase" style="letter-spacing: 0.4em;"
                 [style.color]="tint(brand.primaryColor, 0.7)">Digital ticket</p>
              <h2 id="ticket-dialog-title" class="mt-3 text-lg uppercase leading-snug sm:text-xl"
                  style="letter-spacing: 0.2em; font-variant-numeric: tabular-nums;"
                  [style.font-family]="brand.fontHeading">
                Ticket {{ t.qr_code_id }} &mdash; {{ t.ticket_type }}
              </h2>
              <p class="mt-3 text-sm leading-relaxed" [style.color]="tint(brand.primaryColor, 0.8)">
                {{ t.event_title }} &middot; {{ t.dateLong }}<br class="hidden sm:block" />
                {{ t.venue }}, {{ t.city }}
              </p>
            </div>
            <button type="button" uiButton variant="ghost" size="sm" autofocus
                    class="gq-ghost -mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center"
                    style="border-radius: 0;"
                    [style.color]="brand.primaryColor"
                    aria-label="Close ticket"
                    (click)="closeTicket()">
              <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
            </button>
          </div>

          <div class="my-6 flex items-center justify-center gap-3" aria-hidden="true">
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
            <span class="h-2 w-2 rotate-45" [style.background-color]="brand.accentColor"></span>
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
          </div>

          <!-- ROW 5 -->
          <div class="grid grid-cols-12 gap-6 sm:gap-8">

            <!-- b-4-0 : QR plate -->
            <div data-wf="b-4-0" class="col-span-12 sm:col-span-4">
              <div class="mx-auto w-full max-w-[220px] p-[3px]"
                   [style.border]="'1px solid ' + brand.accentColor">
                <div class="p-3" [style.border]="'1px solid ' + tint(brand.primaryColor, 0.35)">
                  <div class="grid w-full"
                       style="grid-template-columns: repeat(21, minmax(0, 1fr)); gap: 0;"
                       role="img"
                       [attr.aria-label]="'QR code for ticket ' + t.qr_code_id">
                    @for (row of qrMatrix(); track $index) {
                      @for (cell of row; track $index) {
                        <span aria-hidden="true" class="block aspect-square"
                              [style.background-color]="cell ? brand.primaryColor : 'transparent'"></span>
                      }
                    }
                  </div>
                </div>
              </div>
              <p class="mt-4 text-center text-[11px] uppercase"
                 style="letter-spacing: 0.3em; font-variant-numeric: tabular-nums;"
                 [style.color]="tint(brand.primaryColor, 0.75)">{{ t.qr_code_id }}</p>
            </div>

            <!-- b-4-1 : instructions + detail -->
            <div data-wf="b-4-1" class="col-span-12 sm:col-span-8">
              <p id="ticket-dialog-help" class="text-[15px] leading-relaxed">
                Show this QR code at the gate. Each ticket in your order has its own unique code.
              </p>
              <p class="mt-3 text-sm leading-relaxed" [style.color]="tint(brand.primaryColor, 0.72)">
                Saved to this device &mdash; it opens without a signal. Brightness up helps the scanner.
              </p>

              <dl class="mt-6 space-y-0 text-sm">
                <div class="flex items-baseline justify-between gap-4 border-t py-3"
                     [style.border-color]="tint(brand.primaryColor, 0.18)">
                  <dt class="text-[10px] uppercase" style="letter-spacing: 0.26em;"
                      [style.color]="tint(brand.primaryColor, 0.68)">Order</dt>
                  <dd style="font-variant-numeric: tabular-nums;">{{ t.order_ref }}</dd>
                </div>
                <div class="flex items-baseline justify-between gap-4 border-t py-3"
                     [style.border-color]="tint(brand.primaryColor, 0.18)">
                  <dt class="text-[10px] uppercase" style="letter-spacing: 0.26em;"
                      [style.color]="tint(brand.primaryColor, 0.68)">Paid</dt>
                  <dd style="font-variant-numeric: tabular-nums;">&#8377;{{ t.price_inr }}</dd>
                </div>
                <div class="flex items-baseline justify-between gap-4 border-t py-3"
                     [style.border-color]="tint(brand.primaryColor, 0.18)">
                  <dt class="text-[10px] uppercase" style="letter-spacing: 0.26em;"
                      [style.color]="tint(brand.primaryColor, 0.68)">Issued</dt>
                  <dd style="font-variant-numeric: tabular-nums;">{{ t.issued_at }}</dd>
                </div>
                <div class="flex items-baseline justify-between gap-4 border-y py-3"
                     [style.border-color]="tint(brand.primaryColor, 0.18)">
                  <dt class="text-[10px] uppercase" style="letter-spacing: 0.26em;"
                      [style.color]="tint(brand.primaryColor, 0.68)">Status</dt>
                  <dd class="inline-flex items-center gap-2 text-[11px] uppercase" style="letter-spacing: 0.2em;">
                    <ui-icon [name]="statusIcon(t.status)" class="h-3 w-3" aria-hidden="true"></ui-icon>
                    {{ t.status }}
                  </dd>
                </div>
              </dl>

              <div class="mt-6 flex items-center justify-end">
                <button type="button" uiButton
                        class="gq-act min-h-[44px] px-7 text-[11px] uppercase"
                        style="letter-spacing: 0.26em; border-radius: 0;"
                        [style.background-color]="brand.primaryColor"
                        [style.color]="brand.accentColor"
                        [style.border]="'1px solid ' + brand.accentColor"
                        (click)="closeTicket()">
                  Done
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  }
</div>
`;

@Component({
  selector: "app-my-tickets-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  tab = signal('upcoming');
  selectedId = signal(null);
  lastTrigger = null;

  tickets = signal([
    {
      id: 'TKT-4471', wf: 'i-2-0-0', period: 'upcoming', qr_code_id: 'QR-8F3K2',
      event_title: 'Sunburn Arena ft. DJ Nucleya', venue: 'Phoenix Marketcity', city: 'Bengaluru',
      dow: 'Sat', day: '12', monthYear: 'Dec 2026', time: '7:00 PM',
      dateLong: 'Sat 12 Dec 2026, 7:00 PM', ticket_type: 'Regular', price_inr: '1,499',
      status: 'Valid', order_ref: 'ORD-24817', issued_at: '28 Oct 2026, 4:12 PM', note: ''
    },
    {
      id: 'TKT-4472', wf: 'i-2-0-1', period: 'upcoming', qr_code_id: 'QR-9P1X7',
      event_title: 'Sunburn Arena ft. DJ Nucleya', venue: 'Phoenix Marketcity', city: 'Bengaluru',
      dow: 'Sat', day: '12', monthYear: 'Dec 2026', time: '7:00 PM',
      dateLong: 'Sat 12 Dec 2026, 7:00 PM', ticket_type: 'Regular', price_inr: '1,499',
      status: 'Valid', order_ref: 'ORD-24817', issued_at: '28 Oct 2026, 4:12 PM',
      note: 'Second ticket on the same order.'
    },
    {
      id: 'TKT-4510', wf: 'i-2-0-2', period: 'upcoming', qr_code_id: 'QR-2M4D9',
      event_title: 'Bengaluru Comedy Nights', venue: 'Good Shepherd Auditorium', city: 'Bengaluru',
      dow: 'Fri', day: '18', monthYear: 'Dec 2026', time: '8:30 PM',
      dateLong: 'Fri 18 Dec 2026, 8:30 PM', ticket_type: 'VIP', price_inr: '2,200',
      status: 'Valid', order_ref: 'ORD-24903', issued_at: '02 Nov 2026, 9:40 AM', note: ''
    },
    {
      id: 'TKT-3988', wf: null, period: 'past', qr_code_id: 'QR-5T7Q1',
      event_title: 'Prateek Kuhad &mdash; The Silhouettes Tour', venue: 'Manpho Convention Centre', city: 'Bengaluru',
      dow: 'Sat', day: '24', monthYear: 'Oct 2026', time: '8:00 PM',
      dateLong: 'Sat 24 Oct 2026, 8:00 PM', ticket_type: 'Regular', price_inr: '1,999',
      status: 'Used', order_ref: 'ORD-23188', issued_at: '12 Sep 2026, 7:05 PM',
      note: 'Scanned at Gate 2, 7:41 PM.'
    },
    {
      id: 'TKT-3842', wf: null, period: 'past', qr_code_id: 'QR-3C8R4',
      event_title: 'Bacardi NH7 Weekender', venue: 'Mahalaxmi Lawns', city: 'Pune',
      dow: 'Sun', day: '11', monthYear: 'Oct 2026', time: '4:00 PM',
      dateLong: 'Sun 11 Oct 2026, 4:00 PM', ticket_type: 'Regular', price_inr: '2,750',
      status: 'Used', order_ref: 'ORD-22940', issued_at: '30 Aug 2026, 11:18 AM', note: ''
    },
    {
      id: 'TKT-3701', wf: null, period: 'past', qr_code_id: 'QR-6J2V8',
      event_title: 'Mumbai Food &amp; Wine Festival', venue: 'Jio World Garden', city: 'Mumbai',
      dow: 'Sat', day: '26', monthYear: 'Sep 2026', time: '12:00 PM',
      dateLong: 'Sat 26 Sep 2026, 12:00 PM', ticket_type: 'VIP', price_inr: '3,500',
      status: 'Used', order_ref: 'ORD-22611', issued_at: '14 Aug 2026, 3:02 PM', note: ''
    },
    {
      id: 'TKT-3310', wf: null, period: 'past', qr_code_id: 'QR-1B9N5',
      event_title: 'Zakir Hussain &mdash; Tabla Ensemble', venue: 'Chowdiah Memorial Hall', city: 'Bengaluru',
      dow: 'Fri', day: '14', monthYear: 'Aug 2026', time: '6:30 PM',
      dateLong: 'Fri 14 Aug 2026, 6:30 PM', ticket_type: 'Regular', price_inr: '1,200',
      status: 'Used', order_ref: 'ORD-21455', issued_at: '02 Jul 2026, 10:26 AM', note: ''
    },
    {
      id: 'TKT-3094', wf: null, period: 'past', qr_code_id: 'QR-4K6L2',
      event_title: 'Bengaluru FC vs Mumbai City FC', venue: 'Sree Kanteerava Stadium', city: 'Bengaluru',
      dow: 'Sun', day: '19', monthYear: 'Jul 2026', time: '7:30 PM',
      dateLong: 'Sun 19 Jul 2026, 7:30 PM', ticket_type: 'Regular', price_inr: '800',
      status: 'Expired', order_ref: 'ORD-20877', issued_at: '28 Jun 2026, 8:55 PM',
      note: 'Never scanned &mdash; the code lapsed when the gates closed.'
    },
    {
      id: 'TKT-2967', wf: null, period: 'past', qr_code_id: 'QR-7D5W3',
      event_title: 'TEDxIndiranagar 2026', venue: 'The Lalit Ashok', city: 'Bengaluru',
      dow: 'Sat', day: '20', monthYear: 'Jun 2026', time: '10:00 AM',
      dateLong: 'Sat 20 Jun 2026, 10:00 AM', ticket_type: 'Regular', price_inr: '1,750',
      status: 'Used', order_ref: 'ORD-20314', issued_at: '19 May 2026, 1:47 PM', note: ''
    },
    {
      id: 'TKT-2740', wf: null, period: 'past', qr_code_id: 'QR-0G4H6',
      event_title: 'Sunburn Goa &mdash; Day 1', venue: 'Vagator Beach', city: 'Goa',
      dow: 'Fri', day: '29', monthYear: 'May 2026', time: '5:00 PM',
      dateLong: 'Fri 29 May 2026, 5:00 PM', ticket_type: 'VIP', price_inr: '4,999',
      status: 'Cancelled', order_ref: 'ORD-19802', issued_at: '03 Apr 2026, 6:31 PM',
      note: 'Event called off by the organiser &mdash; this code will not scan.'
    }
  ]);

  upcoming = computed(() => this.tickets().filter((t) => t.period === 'upcoming'));
  past = computed(() => this.tickets().filter((t) => t.period === 'past'));
  visible = computed(() => (this.tab() === 'upcoming' ? this.upcoming() : this.past()));
  selected = computed(() => this.tickets().find((t) => t.id === this.selectedId()) || null);

  emptyTitle = computed(() =>
    this.tab() === 'upcoming' ? 'You have no tickets yet' : 'Nothing in your past tickets'
  );
  emptyDescription = computed(() =>
    this.tab() === 'upcoming'
      ? 'Browse events to book your first.'
      : 'Tickets move here the morning after the event ends.'
  );

  qrMatrix = computed(() => {
    const t = this.selected();
    if (!t) return [];
    const n = 21;
    const code = String(t.qr_code_id) + String(t.id);
    let h = 2166136261;
    for (let i = 0; i < code.length; i++) {
      h = (h ^ code.charCodeAt(i)) >>> 0;
      h = (h * 16777619) >>> 0;
    }
    const rows = [];
    for (let r = 0; r < n; r++) {
      const row = [];
      for (let c = 0; c < n; c++) {
        const fixed = this.fixedModule(r, c, n);
        if (fixed !== null) {
          row.push(fixed);
        } else {
          h = (h * 1664525 + 1013904223) >>> 0;
          row.push((h >>> 17) & 1);
        }
      }
      rows.push(row);
    }
    return rows;
  });

  fixedModule(r, c, n) {
    const origins = [[0, 0], [0, n - 7], [n - 7, 0]];
    for (let i = 0; i < origins.length; i++) {
      const or = origins[i][0];
      const oc = origins[i][1];
      if (r >= or && r < or + 7 && c >= oc && c < oc + 7) {
        const d = Math.max(Math.abs(r - or - 3), Math.abs(c - oc - 3));
        return d === 2 ? 0 : 1;
      }
      if (r >= or - 1 && r <= or + 7 && c >= oc - 1 && c <= oc + 7) return 0;
    }
    if (r === 6) return c % 2 === 0 ? 1 : 0;
    if (c === 6) return r % 2 === 0 ? 1 : 0;
    return null;
  }

  tint(hex, alpha) {
    const raw = String(hex || '').replace('#', '');
    const full = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw;
    const num = parseInt(full, 16);
    if (isNaN(num)) return 'currentColor';
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }

  statusIcon(status) {
    if (status === 'Valid') return 'CheckCircle';
    if (status === 'Used') return 'Check';
    if (status === 'Expired') return 'Clock';
    return 'AlertCircle';
  }

  setTab(value) {
    if (this.tab() === value) return;
    this.tab.set(value);
    this.selectedId.set(null);
  }

  onTabKey(event) {
    const order = ['upcoming', 'past'];
    let delta = 0;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') delta = 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') delta = -1;
    else if (event.key === 'Home') delta = -99;
    else if (event.key === 'End') delta = 99;
    else return;
    event.preventDefault();
    const current = order.indexOf(this.tab());
    let next = delta === -99 ? 0 : delta === 99 ? order.length - 1 : (current + delta + order.length) % order.length;
    this.setTab(order[next]);
    const strip = event.target.closest('[role="tablist"]');
    if (!strip) return;
    const buttons = strip.querySelectorAll('[role="tab"]');
    if (buttons[next]) buttons[next].focus();
  }

  openTicket(id, event) {
    this.lastTrigger = event && event.currentTarget ? event.currentTarget : null;
    this.selectedId.set(id);
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        const dialog = document.getElementById('ticket-dialog');
        if (dialog) dialog.focus();
      });
    }
  }

  closeTicket() {
    this.selectedId.set(null);
    const trigger = this.lastTrigger;
    this.lastTrigger = null;
    if (trigger && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        if (typeof trigger.focus === 'function') trigger.focus();
      });
    }
  }

  onDialogKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeTicket();
      return;
    }
    if (event.key !== 'Tab') return;
    const dialog = event.currentTarget;
    const focusable = dialog.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
