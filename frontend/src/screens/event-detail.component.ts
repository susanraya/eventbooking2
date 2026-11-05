// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, OnInit, OnDestroy, signal, computed, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { apiFetch } from "@/lib/api";
import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";

// GET /events/{id} returns { event: {...}, ticketTypes: [...] }. This is the one place that
// maps that response onto the shape this screen's template renders.
function mapEventDetail(raw) {
  const event = (raw && raw.event) || {};
  const rawTicketTypes = (raw && raw.ticketTypes) || [];
  return {
    id: event.id,
    title: event.title,
    venue: event.venue,
    city: event.city,
    category: event.category,
    description: event.description,
    startsAt: event.startsAt,
    organizerName: event.organizerName,
    ticketTypes: rawTicketTypes.map(function (t) {
      return {
        id: t.id,
        name: t.name,
        price_inr: t.priceInr,
        quantity_total: t.quantityTotal,
        quantity_sold: t.quantitySold,
        sold_out: !!t.soldOut,
      };
    }),
  };
}

const template = `
<style>
  @keyframes decoIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes decoPulse { 0%, 100% { opacity: .2; } 50% { opacity: 1; } }
  .deco-in { animation: decoIn 260ms ease-out both; }
  .deco-pulse { animation: decoPulse 1.1s ease-in-out infinite; }
  .gat-focus:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    .deco-in, .deco-pulse { animation: none; }
  }
</style>

<div class="w-full" [style.background-color]="brand.backgroundColor" [style.font-family]="brand.fontBody" [style.color]="brand.primaryColor">
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

    <!-- ROW 1 -->
    <div class="grid grid-cols-12 items-start gap-4">
      <div class="col-span-12 sm:col-span-2">
        <button
          data-wf="b-0-0"
          type="button"
          uiButton
          variant="ghost"
          size="sm"
          class="gat-focus inline-flex h-11 items-center px-2"
          [style.border-radius]="'0px'"
          [style.color]="brand.primaryColor"
          (click)="navigate('events')">
          <ui-icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true"></ui-icon>
          <span class="ml-2 text-[11px] uppercase tracking-[0.18em]">Back to browse</span>
        </button>
      </div>

      <div class="col-span-12 text-center sm:col-span-10">
        @if (eventData(); as headingEvent) {
          <p class="text-[11px] uppercase tracking-[0.34em]" [style.color]="brand.neutralColor">
            {{ headingEvent.category }} &middot; {{ headingEvent.city }} &middot; {{ dateLabel(headingEvent.startsAt) }}
          </p>
          <h1
            data-wf="b-0-1"
            class="mt-3 text-[28px] leading-tight uppercase tracking-[0.16em] sm:text-[34px] lg:text-[38px]"
            [style.font-family]="brand.fontHeading"
            [style.color]="brand.primaryColor">
            {{ headingEvent.title }}
          </h1>
        }
        <div class="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
          <span class="h-px w-16 sm:w-32" [style.background-color]="brand.accentColor"></span>
          <span class="block h-2 w-2 rotate-45" [style.background-color]="brand.primaryColor"></span>
          <span class="h-px w-16 sm:w-32" [style.background-color]="brand.accentColor"></span>
        </div>
      </div>
    </div>

    @if (loading()) {
      <div role="status" class="mt-10 border bg-white/50 px-6 py-16 text-center" [style.border-color]="brand.accentColor">
        <ui-icon name="Clock" class="mx-auto h-6 w-6" aria-hidden="true"></ui-icon>
        <p class="mt-4 text-[11px] uppercase tracking-[0.28em]" [style.color]="brand.neutralColor">Loading event&hellip;</p>
      </div>
    } @else if (loadError()) {
      <div class="mt-10 border bg-white/60 p-10 text-center" [style.border-color]="brand.accentColor">
        <ui-icon name="AlertCircle" class="mx-auto h-6 w-6" aria-hidden="true"></ui-icon>
        <h2 class="mt-4 text-lg uppercase tracking-[0.18em]" [style.font-family]="brand.fontHeading">We could not load this event</h2>
        <p class="mx-auto mt-3 max-w-md text-sm" [style.color]="brand.neutralColor">
          The event details did not load. Check your connection and try again.
        </p>
        <button uiButton type="button" class="mt-6 rounded-none px-6 text-[11px] uppercase tracking-[0.22em]"
                [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                (click)="retry()">Try again</button>
      </div>
    } @else if (eventData(); as event) {

      <!-- ROW 2 -->
      <div data-wf="b-1-0" class="mt-8">
        <div class="p-1" [style.border]="'1px solid ' + brand.primaryColor">
          <div class="relative overflow-hidden" [style.border]="'1px solid ' + brand.accentColor" [style.background-color]="brand.primaryColor">
            <div
              class="absolute inset-0"
              aria-hidden="true"
              [style.background]="'repeating-conic-gradient(from 200deg at 50% 118%, ' + brand.accentColor + '00 0deg 5deg, ' + brand.accentColor + '2e 5deg 10deg)'"></div>
            <div class="absolute left-3 top-3 h-3 w-3 rotate-45" aria-hidden="true" [style.border]="'1px solid ' + brand.accentColor"></div>
            <div class="absolute right-3 top-3 h-3 w-3 rotate-45" aria-hidden="true" [style.border]="'1px solid ' + brand.accentColor"></div>
            <div class="absolute bottom-3 left-3 h-3 w-3 rotate-45" aria-hidden="true" [style.border]="'1px solid ' + brand.accentColor"></div>
            <div class="absolute bottom-3 right-3 h-3 w-3 rotate-45" aria-hidden="true" [style.border]="'1px solid ' + brand.accentColor"></div>

            <div class="relative flex h-56 flex-col items-center justify-center px-6 text-center sm:h-72 lg:h-80">
              <p class="text-[10px] uppercase tracking-[0.4em]" [style.color]="brand.accentColor">{{ event.organizerName }} presents</p>
              <p class="mt-4 text-xl uppercase leading-snug tracking-[0.24em] sm:text-3xl" [style.font-family]="brand.fontHeading" [style.color]="brand.backgroundColor">
                {{ event.title }}
              </p>
              <div class="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
                <span class="h-px w-10 sm:w-20" [style.background-color]="brand.accentColor"></span>
                <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.accentColor"></span>
                <span class="h-px w-10 sm:w-20" [style.background-color]="brand.accentColor"></span>
              </div>
              <p class="mt-5 text-[11px] uppercase tracking-[0.28em] tabular-nums" [style.color]="brand.backgroundColor">
                {{ dateLabel(event.startsAt) }} &nbsp;&mdash;&nbsp; {{ timeLabel(event.startsAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ROW 3 -->
      <div class="mt-8 grid grid-cols-12 gap-6">
        <section data-wf="b-2-0" class="col-span-12 lg:col-span-8">
          <h2 class="text-xs uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading" [style.color]="brand.primaryColor">About this event</h2>
          <div class="mt-3 h-px w-full" [style.background-color]="brand.accentColor"></div>
          <p class="mt-5 max-w-[68ch] whitespace-pre-line text-[15px] leading-relaxed" [style.color]="brand.primaryColor">
            {{ event.description }}
          </p>
        </section>

        <aside data-wf="b-2-1" class="col-span-12 lg:col-span-4">
          <div class="h-full p-1" [style.border]="'1px solid ' + brand.primaryColor">
            <div class="h-full px-5 py-6" [style.border]="'1px solid ' + brand.accentColor">
              <h2 class="text-center text-[11px] uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading" [style.color]="brand.primaryColor">
                Where &amp; when
              </h2>
              <div class="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                <span class="h-px w-8" [style.background-color]="brand.accentColor"></span>
                <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
                <span class="h-px w-8" [style.background-color]="brand.accentColor"></span>
              </div>
              <dl class="mt-5 space-y-4 text-sm">
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Venue</dt>
                  <dd class="mt-1 leading-snug">{{ event.venue }}</dd>
                </div>
                <div class="h-px w-full" [style.background-color]="brand.accentColor" aria-hidden="true"></div>
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">City</dt>
                  <dd class="mt-1 leading-snug">{{ event.city }}</dd>
                </div>
                <div class="h-px w-full" [style.background-color]="brand.accentColor" aria-hidden="true"></div>
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Date &amp; time</dt>
                  <dd class="mt-1 leading-snug tabular-nums">{{ dateLabel(event.startsAt) }}, {{ timeLabel(event.startsAt) }}</dd>
                </div>
                <div class="h-px w-full" [style.background-color]="brand.accentColor" aria-hidden="true"></div>
                <div>
                  <dt class="text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Category</dt>
                  <dd class="mt-1 leading-snug">{{ event.category }}</dd>
                </div>
                <div class="h-px w-full" [style.background-color]="brand.accentColor" aria-hidden="true"></div>
                <div class="flex items-center gap-3">
                  <ui-avatar [name]="event.organizerName" class="h-8 w-8"></ui-avatar>
                  <div>
                    <dt class="text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Organizer</dt>
                    <dd class="mt-0.5 leading-snug">{{ event.organizerName }}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </aside>
      </div>

      <!-- ROW 4 -->
      <section data-wf="b-3-0" class="mt-10">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 class="text-xs uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading" [style.color]="brand.primaryColor">Ticket options</h2>
          @if (ticketTypes().length > 0) {
            <p class="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">
              <ui-icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
              <span class="tabular-nums">Availability synced {{ syncedAt() }}</span>
            </p>
          }
        </div>
        <div class="mt-3 h-px w-full" [style.background-color]="brand.accentColor"></div>

        @if (ticketTypes().length === 0) {
          <div class="mt-5">
            <ui-empty
              title="No ticket types yet"
              description="The organizer has not added any ticket types for this event yet.">
            </ui-empty>
          </div>
        } @else {
          <div class="mt-5 p-1" [style.border]="'1px solid ' + brand.primaryColor">
            <div class="overflow-x-auto" [style.border]="'1px solid ' + brand.accentColor">
              <table uiTable class="w-full min-w-[640px] text-sm" style="font-variant-numeric: tabular-nums">
                <thead uiTHead>
                  <tr uiTR>
                    <th uiTH scope="col" data-wf="i-3-0-0" class="px-4 py-3 text-left text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Ticket type</th>
                    <th uiTH scope="col" data-wf="i-3-0-1" class="px-4 py-3 text-right text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Price (INR)</th>
                    <th uiTH scope="col" data-wf="i-3-0-2" class="px-4 py-3 text-right text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Available</th>
                    <th uiTH scope="col" data-wf="i-3-0-3" class="px-4 py-3 text-right text-[10px] uppercase tracking-[0.22em]" [style.color]="brand.neutralColor">Quantity</th>
                  </tr>
                </thead>
                <tbody uiTBody>
                  @for (t of ticketTypes(); track t.id) {
                    <tr
                      uiTR
                      class="transition-colors duration-150 hover:bg-black/[0.03]"
                      [style.background-color]="qtyFor(t) > 0 ? brand.accentColor + '26' : 'transparent'"
                      [style.box-shadow]="isOver(t) ? 'inset 3px 0 0 ' + brand.primaryColor : 'none'"
                      [style.border-top]="'1px solid ' + brand.accentColor + '66'">
                      <th scope="row" class="px-4 py-4 text-left align-middle font-normal">
                        <span class="block text-[15px] tracking-[0.04em]" [style.color]="brand.primaryColor">{{ t.name }}</span>
                        <span class="mt-1.5 inline-flex items-center gap-2">
                          @if (t.sold_out) {
                            <span uiBadge variant="secondary" class="text-[10px] uppercase tracking-[0.16em]" [style.border-radius]="'0px'">Sold out</span>
                          } @else if (available(t) <= 10) {
                            <span uiBadge variant="warning" class="text-[10px] uppercase tracking-[0.16em]" [style.border-radius]="'0px'">Last few</span>
                          } @else {
                            <span uiBadge variant="success" class="text-[10px] uppercase tracking-[0.16em]" [style.border-radius]="'0px'">On sale</span>
                          }
                        </span>
                      </th>

                      <td uiTD class="px-4 py-4 text-right align-middle text-[15px]">{{ inr(t.price_inr) }}</td>

                      <td uiTD class="px-4 py-4 text-right align-middle" [attr.id]="'avail-' + t.id">
                        @if (t.sold_out) {
                          <span class="text-[13px]" [style.color]="brand.neutralColor">0 of {{ t.quantity_total }}</span>
                        } @else {
                          <span class="text-[15px]">{{ available(t) }} left</span>
                          <span class="ml-1 text-[11px]" [style.color]="brand.neutralColor">of {{ t.quantity_total }}</span>
                        }
                      </td>

                      <td uiTD class="px-4 py-4 align-middle">
                        @if (t.sold_out) {
                          <div class="flex items-center justify-end gap-2 text-[12px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">
                            <ui-icon name="X" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                            <span>Cannot be selected</span>
                          </div>
                        } @else {
                          <div class="flex items-center justify-end gap-2">
                            <label uiLabel class="sr-only" [attr.for]="'qty-' + t.id">Quantity of {{ t.name }} tickets</label>
                            <button
                              type="button"
                              uiButton
                              variant="outline"
                              size="sm"
                              class="gat-focus h-11 w-11 p-0"
                              [style.border-radius]="'0px'"
                              [style.border-color]="brand.primaryColor"
                              [style.color]="brand.primaryColor"
                              [disabled]="qtyFor(t) === 0"
                              [attr.aria-label]="'Remove one ' + t.name + ' ticket'"
                              (click)="dec(t)">
                              <span class="text-lg leading-none" aria-hidden="true">&minus;</span>
                            </button>
                            <input
                              uiInput
                              type="text"
                              inputmode="numeric"
                              autocomplete="off"
                              class="h-11 w-16 text-center text-[15px]"
                              style="font-variant-numeric: tabular-nums"
                              [style.border-radius]="'0px'"
                              [style.border-color]="brand.primaryColor"
                              [id]="'qty-' + t.id"
                              [value]="qtyFor(t)"
                              [attr.aria-describedby]="'avail-' + t.id"
                              [attr.aria-invalid]="isOver(t)"
                              (input)="onQtyInput(t, $event)" />
                            <button
                              type="button"
                              uiButton
                              variant="outline"
                              size="sm"
                              class="gat-focus h-11 w-11 p-0"
                              [style.border-radius]="'0px'"
                              [style.border-color]="brand.primaryColor"
                              [style.color]="brand.primaryColor"
                              [disabled]="qtyFor(t) >= maxPerOrder"
                              [attr.aria-label]="'Add one ' + t.name + ' ticket'"
                              (click)="inc(t)">
                              <ui-icon name="Plus" class="h-4 w-4" aria-hidden="true"></ui-icon>
                            </button>
                          </div>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <p class="mt-3 text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">
            General admission only &middot; maximum {{ maxPerOrder }} tickets per order
          </p>
        }
      </section>

      <!-- ROW 5 -->
      <section data-wf="b-4-0" class="mt-8" aria-live="polite">
        <h2 class="sr-only">Booking notices</h2>
        <ul class="space-y-3">
          @for (m of messages(); track m.id) {
            <li class="deco-in flex items-start gap-3 px-4 py-3"
                [style.border]="'1px solid ' + (m.tone === 'error' ? brand.primaryColor : brand.accentColor)"
                [style.background-color]="m.tone === 'error' ? brand.accentColor + '33' : 'transparent'">
              <ui-icon [name]="m.icon" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
              <p class="text-[14px] leading-relaxed" [style.color]="m.tone === 'muted' ? brand.neutralColor : brand.primaryColor">
                <span class="mr-1 text-[11px] uppercase tracking-[0.2em]">{{ m.lead }}</span>
                {{ m.text }}
              </p>
            </li>
          }
        </ul>
      </section>

      <!-- ROW 6 -->
      <div class="mt-8 grid grid-cols-12 items-stretch gap-6">
        <section data-wf="b-5-0" class="col-span-12 lg:col-span-6">
          <div class="h-full p-1" [style.border]="'1px solid ' + brand.primaryColor">
            <div class="flex h-full flex-col px-5 py-6" [style.border]="'1px solid ' + brand.accentColor">
              <h2 class="text-center text-[11px] uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading" [style.color]="brand.primaryColor">
                Order summary
              </h2>
              <div class="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                <span class="h-px w-10" [style.background-color]="brand.accentColor"></span>
                <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
                <span class="h-px w-10" [style.background-color]="brand.accentColor"></span>
              </div>

              @if (selected().length === 0) {
                <div class="mt-4">
                  <ui-empty
                    title="No tickets selected yet"
                    description="Choose a ticket type and quantity above and the order total will appear here.">
                  </ui-empty>
                </div>
              } @else {
                <ul class="mt-5 space-y-3" style="font-variant-numeric: tabular-nums">
                  @for (l of selected(); track l.id) {
                    <li class="deco-in flex items-baseline justify-between gap-4 text-[14px]">
                      <span>
                        <span class="tabular-nums">{{ l.qty }}</span> &times; {{ l.name }}
                        <span class="ml-1 text-[12px]" [style.color]="brand.neutralColor">at {{ inr(l.price_inr) }} each</span>
                      </span>
                      <span class="shrink-0">{{ inr(l.qty * l.price_inr) }}</span>
                    </li>
                  }
                </ul>

                <div class="mt-5 h-px w-full" [style.background-color]="brand.accentColor" aria-hidden="true"></div>

                <div class="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p class="text-[10px] uppercase tracking-[0.26em]" [style.color]="brand.neutralColor">Order total</p>
                    <p class="mt-1 text-[12px]" [style.color]="brand.neutralColor">{{ summaryLine() }}</p>
                  </div>
                  <p class="text-[30px] leading-none tracking-[0.04em]" style="font-variant-numeric: tabular-nums"
                     [style.font-family]="brand.fontHeading" [style.color]="brand.primaryColor">{{ inr(total()) }}</p>
                </div>
              }

              <div class="mt-6 flex items-center gap-3 pt-1" [style.border-top]="'1px solid ' + brand.accentColor + '66'">
                <ui-avatar name="Susan Raya" class="mt-4 h-8 w-8"></ui-avatar>
                <p class="mt-4 text-[12px] leading-snug" [style.color]="brand.neutralColor">
                  Booking as Susan Raya &middot; susan.raya&#64;quorq.ai<br />
                  QR passes land in My Tickets the moment payment clears.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="col-span-12 flex flex-col lg:col-span-6">
          <div class="p-1" [style.border]="'1px solid ' + brand.accentColor">
            <button
              data-wf="b-5-1"
              type="button"
              uiButton
              class="gat-focus flex h-20 w-full items-center justify-center px-6 text-center transition-opacity duration-200"
              [style.border-radius]="'0px'"
              [style.background-color]="brand.primaryColor"
              [style.color]="brand.accentColor"
              [style.opacity]="canPay() || payState() === 'processing' ? '1' : '0.45'"
              [disabled]="!canPay()"
              (click)="payNow()">
              @if (payState() === 'processing') {
                <span class="flex items-center gap-3">
                  <span class="flex items-center gap-1.5" aria-hidden="true">
                    <span class="deco-pulse block h-2 w-2 rotate-45" [style.background-color]="brand.accentColor" style="animation-delay: 0ms"></span>
                    <span class="deco-pulse block h-2 w-2 rotate-45" [style.background-color]="brand.accentColor" style="animation-delay: 160ms"></span>
                    <span class="deco-pulse block h-2 w-2 rotate-45" [style.background-color]="brand.accentColor" style="animation-delay: 320ms"></span>
                  </span>
                  <span class="text-[13px] uppercase tracking-[0.24em]">Confirming payment</span>
                </span>
              } @else {
                <span class="text-[13px] uppercase tracking-[0.24em] sm:text-[15px]" style="font-variant-numeric: tabular-nums">{{ payLabel() }}</span>
              }
            </button>
          </div>

          <p class="mt-4 flex items-start gap-2 text-[12px] leading-relaxed" [style.color]="brand.neutralColor">
            <ui-icon [name]="canPay() ? 'CheckCircle' : 'AlertCircle'" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
            <span>{{ payHelp() }}</span>
          </p>

          <p class="mt-auto pt-6 text-[11px] uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">
            Razorpay &middot; UPI, cards, net banking &middot; payment data stored in India
          </p>
        </section>
      </div>

    }

  </div>
</div>
`;

@Component({
  selector: "app-event-detail-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);

  maxPerOrder = 10;

  loading = signal(true);
  loadError = signal(false);
  eventData = signal(null);
  syncedAt = signal("");
  qty = signal({});
  payState = signal("idle");

  ticketTypes = computed(() => (this.eventData() ? this.eventData().ticketTypes : []));

  selected = computed(() => {
    const q = this.qty();
    return this.ticketTypes()
      .filter(function (t) {
        return (q[t.id] || 0) > 0;
      })
      .map(function (t) {
        return { id: t.id, name: t.name, price_inr: t.price_inr, qty: q[t.id] };
      });
  });

  total = computed(() =>
    this.selected().reduce(function (sum, l) {
      return sum + l.qty * l.price_inr;
    }, 0),
  );

  ticketCount = computed(() =>
    this.selected().reduce(function (sum, l) {
      return sum + l.qty;
    }, 0),
  );

  overLines = computed(() => {
    const q = this.qty();
    const self = this;
    return this.ticketTypes().filter(function (t) {
      return !t.sold_out && (q[t.id] || 0) > self.available(t);
    });
  });

  soldOutTypes = computed(() =>
    this.ticketTypes().filter(function (t) {
      return t.sold_out;
    }),
  );

  canPay = computed(
    () => this.payState() === "idle" && this.selected().length > 0 && this.overLines().length === 0,
  );

  summaryLine = computed(() => {
    return this.selected()
      .map(function (l) {
        return l.qty + " × " + l.name;
      })
      .join("  +  ");
  });

  payLabel = computed(() => {
    if (this.total() === 0) {
      return "Select tickets to continue";
    }
    return "Pay " + this.inr(this.total()) + " with UPI or card";
  });

  payHelp = computed(() => {
    if (this.payState() === "processing") {
      return "Waiting for the gateway to confirm. Keep this page open — your tickets are issued the second it clears.";
    }
    if (this.overLines().length > 0) {
      return "Lower the quantity to match what is left, then the payment button unlocks.";
    }
    if (this.selected().length === 0) {
      return "Add at least one ticket above to continue to payment.";
    }
    return (
      "You will be handed to Razorpay for UPI, card or net banking. " +
      this.ticketCount() +
      " QR pass(es) are issued on success."
    );
  });

  messages = computed(() => {
    const out = [];
    const self = this;

    this.overLines().forEach(function (t) {
      out.push({
        id: "over-" + t.id,
        tone: "error",
        icon: "AlertCircle",
        lead: "Not enough left —",
        text:
          "Only " +
          self.available(t) +
          " " +
          t.name +
          " tickets remain of " +
          t.quantity_total +
          ". Reduce your quantity to " +
          self.available(t) +
          " or fewer to continue.",
      });
    });

    const so = this.soldOutTypes();
    if (so.length > 0) {
      const names = so.map(function (t) {
        return t.name;
      });
      const joined =
        names.length === 1
          ? names[0]
          : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
      out.push({
        id: "soldout",
        tone: "muted",
        icon: "X",
        lead: "Sold out —",
        text: joined + (names.length === 1 ? " is" : " are") + " sold out and cannot be selected.",
      });
    }

    if (this.ticketTypes().length > 0 && this.selected().length === 0) {
      out.push({
        id: "nothing",
        tone: "muted",
        icon: "AlertCircle",
        lead: "Nothing selected —",
        text: "Pick a ticket type and quantity above to build your order.",
      });
    }

    return out;
  });

  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    const id = this.route.snapshot.paramMap.get("id");
    this.loading.set(true);
    this.loadError.set(false);
    apiFetch("/events/" + id)
      .then((raw) => {
        this.eventData.set(mapEventDetail(raw));
        this.qty.set({});
        this.syncedAt.set(
          new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }) + " IST",
        );
        this.loading.set(false);
      })
      .catch(() => {
        this.loading.set(false);
        this.loadError.set(true);
      });
  }

  retry() {
    this.loadEvent();
  }

  available(t) {
    return t.quantity_total - t.quantity_sold;
  }

  qtyFor(t) {
    return this.qty()[t.id] || 0;
  }

  isOver(t) {
    return this.qtyFor(t) > this.available(t);
  }

  setQty(t, value) {
    let v = value;
    if (v < 0 || isNaN(v)) {
      v = 0;
    }
    if (v > this.maxPerOrder) {
      v = this.maxPerOrder;
    }
    const next = Object.assign({}, this.qty());
    next[t.id] = v;
    this.qty.set(next);
  }

  inc(t) {
    this.setQty(t, this.qtyFor(t) + 1);
  }

  dec(t) {
    this.setQty(t, this.qtyFor(t) - 1);
  }

  onQtyInput(t, event) {
    const raw = (event && event.target ? event.target.value : "") + "";
    const digits = raw.replace(/[^0-9]/g, "");
    const parsed = digits === "" ? 0 : parseInt(digits, 10);
    this.setQty(t, parsed);
    if (event && event.target) {
      event.target.value = this.qtyFor(t);
    }
  }

  inr(amount) {
    return "₹" + Number(amount || 0).toLocaleString("en-IN");
  }

  dateLabel(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  timeLabel(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  payNow() {
    if (!this.canPay()) {
      return;
    }
    this.payState.set("processing");
    const self = this;
    this.payTimer = setTimeout(function () {
      self.payState.set("idle");
      self.navigate("my-tickets");
    }, 1400);
  }

  ngOnDestroy() {
    if (this.payTimer) {
      clearTimeout(this.payTimer);
    }
  }
}
