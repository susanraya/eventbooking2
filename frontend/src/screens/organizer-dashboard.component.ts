// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<style>
  @keyframes wfRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes wfFade { from { opacity: 0; } to { opacity: 1; } }
  .wf-rise { animation: wfRise .3s cubic-bezier(.2,.7,.3,1) both; }
  .wf-fade { animation: wfFade .22s ease-out both; }
  @media (prefers-reduced-motion: reduce) {
    .wf-rise, .wf-fade { animation: none !important; }
    * { transition-duration: .001ms !important; }
  }
</style>

<div class="w-full" [style.font-family]="brand.fontBody" [style.color]="brand.primaryColor">
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">

    <!-- ROW 1 -->
    <div class="grid grid-cols-12 items-end gap-6">
      <div data-wf="b-0-0" class="col-span-12 sm:col-span-8">
        <p class="text-[11px] uppercase tracking-[0.4em]" [style.color]="brand.neutralColor">Organizer console</p>
        <h1 class="mt-3 text-[32px] leading-tight sm:text-[40px] uppercase tracking-[0.16em]"
            [style.font-family]="brand.fontHeading">My events</h1>
        <p class="mt-3 max-w-[60ch] text-sm leading-relaxed" style="font-variant-numeric: tabular-nums;"
           [style.color]="brand.neutralColor">
          {{ events().length }} listings &middot; {{ totalSold() }} tickets sold of {{ totalCapacity() }} &middot;
          <span [style.color]="brand.primaryColor">sales figures synced 2 min ago</span>
        </p>
      </div>
      <div class="col-span-12 sm:col-span-4 flex sm:justify-end">
        <button data-wf="b-0-1" uiButton type="button" (click)="openCreate()"
                class="w-full rounded-none px-6 py-3 text-[12px] uppercase tracking-[0.28em] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                [style.background-color]="brand.primaryColor"
                [style.color]="brand.accentColor"
                [style.outline-color]="brand.primaryColor"
                [style.font-family]="brand.fontHeading">
          <ui-icon name="Plus" class="mr-2 inline h-4 w-4" aria-hidden="true"></ui-icon>Create event
        </button>
      </div>
    </div>

    <!-- gilded rule with centre diamond -->
    <div class="my-8 flex items-center gap-3" aria-hidden="true">
      <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
      <span class="block h-2 w-2 rotate-45" [style.background-color]="brand.primaryColor"></span>
      <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
    </div>

    @if (flash(); as f) {
      <div class="wf-rise mb-8 p-1" [style.border]="'1px solid ' + brand.primaryColor" role="status">
        <div class="flex items-start gap-3 p-4" [style.border]="'1px solid ' + brand.accentColor"
             [style.background-color]="tintAccent">
          <ui-icon name="CheckCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
          <p class="flex-1 text-sm leading-relaxed">{{ f }}</p>
        </div>
      </div>
    }

    <!-- ROW 2 -->
    <section data-wf="b-1-0" class="p-1" [style.border]="'1px solid ' + brand.primaryColor">
      <div class="p-4 sm:p-6" [style.border]="'1px solid ' + brand.accentColor" [style.background-color]="panel">

        <div class="flex flex-wrap items-baseline justify-between gap-2 pb-4">
          <h2 class="text-[15px] uppercase tracking-[0.3em]" [style.font-family]="brand.fontHeading">Events</h2>
          <p class="text-xs" [style.color]="brand.neutralColor">Select a title to view its public listing</p>
        </div>

        @if (events().length === 0) {
          <ui-empty title="No events listed yet"
                    description="Your first listing takes about two minutes: venue, date, one general-admission ticket type.">
            <button uiButton type="button" (click)="openCreate()"
                    class="rounded-none px-5 py-3 text-[12px] uppercase tracking-[0.24em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                    [style.outline-color]="brand.primaryColor">
              <ui-icon name="Plus" class="mr-2 inline h-4 w-4" aria-hidden="true"></ui-icon>Create event
            </button>
          </ui-empty>
        } @else {
          <div class="overflow-x-auto">
            <table uiTable class="w-full text-sm" style="font-variant-numeric: tabular-nums;">
              <caption class="sr-only">Your events with date, city, publication status and tickets sold</caption>
              <thead uiTHead>
                <tr uiTR [style.border-bottom]="'1px solid ' + brand.accentColor">
                  <th uiTH data-wf="i-1-0-0" scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.2em]">Title</th>
                  <th uiTH data-wf="i-1-0-1" scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.2em]">Date &amp; time</th>
                  <th uiTH data-wf="i-1-0-2" scope="col" class="hidden py-3 pr-4 text-left text-[11px] uppercase tracking-[0.2em] md:table-cell">City</th>
                  <th uiTH data-wf="i-1-0-3" scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.2em]">Status</th>
                  <th uiTH data-wf="i-1-0-4" scope="col" class="py-3 pr-4 text-left text-[11px] uppercase tracking-[0.2em]">Sold / Available</th>
                  <th uiTH data-wf="i-1-0-5" scope="col" class="py-3 text-right text-[11px] uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody uiTBody>
                @for (e of events(); track e.id) {
                  <tr uiTR class="wf-rise transition-colors" [style.border-top]="'1px solid ' + hairline">
                    <td uiTD class="py-4 pr-4 align-top">
                      <button type="button" (click)="navigate('event-detail')"
                              class="text-left text-[15px] leading-snug underline-offset-4 transition-all hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              [style.outline-color]="brand.primaryColor"
                              [style.font-family]="brand.fontHeading">
                        {{ e.title }}
                      </button>
                      <p class="mt-1 text-xs" [style.color]="brand.neutralColor">{{ e.venue }} &middot; {{ e.category }}</p>
                      <p class="mt-1 text-xs md:hidden" [style.color]="brand.neutralColor">{{ e.city }}</p>
                    </td>
                    <td uiTD class="whitespace-nowrap py-4 pr-4 align-top">
                      <span class="block">{{ e.dateLabel }}</span>
                      <span class="block text-xs" [style.color]="brand.neutralColor">{{ e.timeLabel }} IST</span>
                    </td>
                    <td uiTD class="hidden py-4 pr-4 align-top md:table-cell">{{ e.city }}</td>
                    <td uiTD class="py-4 pr-4 align-top">
                      <span class="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-[0.18em]"
                            [style.border]="'1px solid ' + brand.primaryColor"
                            [style.background-color]="e.status === 'published' ? tintAccent : 'transparent'">
                        <ui-icon [name]="statusIcon(e.status)" class="h-3 w-3" aria-hidden="true"></ui-icon>
                        {{ statusLabel(e.status) }}
                      </span>
                    </td>
                    <td uiTD class="py-4 pr-4 align-top">
                      <span class="block whitespace-nowrap">
                        {{ soldOf(e) }} / {{ capacityOf(e) }}
                        @if (soldOf(e) >= capacityOf(e) && capacityOf(e) > 0) {
                          <span class="ml-2 text-[10px] uppercase tracking-[0.18em]">Sold out</span>
                        }
                      </span>
                      <span class="mt-2 block h-1 w-28 max-w-full" [style.background-color]="hairline">
                        <span class="block h-1 transition-all duration-500"
                              [style.width.%]="pct(e)" [style.background-color]="brand.accentColor"></span>
                      </span>
                    </td>
                    <td uiTD class="py-4 text-right align-top">
                      <button data-wf="i-1-0-5" uiButton type="button" variant="secondary" size="sm"
                              (click)="openEdit(e)"
                              class="rounded-none px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              [style.border]="'1px solid ' + brand.primaryColor"
                              [style.outline-color]="brand.primaryColor">
                        <ui-icon name="Edit" class="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true"></ui-icon>Edit
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </section>
  </div>

  <!-- ROW 3 — MODAL -->
  @if (modalOpen()) {
    <div class="wf-fade fixed inset-0 z-50 overflow-y-auto p-3 sm:p-8" [style.background-color]="scrim">
      <div data-wf="b-2-0" role="dialog" aria-modal="true" aria-labelledby="event-editor-title" tabindex="-1"
           (keydown.escape)="requestClose()"
           class="wf-rise mx-auto w-full max-w-4xl p-1 shadow-2xl"
           [style.border]="'1px solid ' + brand.primaryColor"
           [style.background-color]="brand.backgroundColor">
        <div class="p-5 sm:p-8" [style.border]="'1px solid ' + brand.accentColor">

          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[10px] uppercase tracking-[0.4em]" [style.color]="brand.neutralColor">
                {{ editingId() ? 'Edit listing' : 'New listing' }}
              </p>
              <h2 id="event-editor-title" class="mt-2 text-[22px] uppercase tracking-[0.16em] sm:text-[26px]"
                  [style.font-family]="brand.fontHeading">
                {{ editingId() ? 'Edit event' : 'Create event' }}
              </h2>
            </div>
            <button uiButton type="button" variant="ghost" size="sm" (click)="requestClose()"
                    aria-label="Close event editor without saving"
                    class="rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    [style.outline-color]="brand.primaryColor">
              <ui-icon name="X" class="h-4 w-4" aria-hidden="true"></ui-icon>
            </button>
          </div>

          <div class="my-6 flex items-center gap-3" aria-hidden="true">
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
            <span class="block h-2 w-2 rotate-45" [style.background-color]="brand.primaryColor"></span>
            <span class="h-px flex-1" [style.background-color]="brand.accentColor"></span>
          </div>

          @if (saveError()) {
            <div class="mb-6 flex items-start gap-3 p-4" role="alert"
                 [style.border]="'1px solid ' + brand.primaryColor" [style.background-color]="tintPrimary">
              <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
              <p class="text-sm leading-relaxed">{{ saveError() }}</p>
            </div>
          }

          <form (ngSubmit)="save()" novalidate>

            <!-- ROW 4 — FORM -->
            <fieldset data-wf="b-3-0" class="min-w-0">
              <legend class="mb-4 text-[11px] uppercase tracking-[0.3em]" [style.color]="brand.neutralColor">Event details</legend>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label uiLabel for="f-title" class="text-[11px] uppercase tracking-[0.2em]">Title</label>
                  <input uiInput data-wf="i-3-0-0" id="f-title" name="title" type="text" [(ngModel)]="fTitle"
                         placeholder="Sundowner Sessions: Indian Ocean Live"
                         class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         [attr.aria-invalid]="errors().title ? 'true' : null"
                         [attr.aria-describedby]="errors().title ? 'err-title' : null"
                         [style.border]="'1px solid ' + (errors().title ? brand.primaryColor : hairlineStrong)"
                         [style.outline-color]="brand.primaryColor">
                  @if (errors().title) {
                    <p id="err-title" class="mt-1.5 text-xs">{{ errors().title }}</p>
                  }
                </div>

                <div>
                  <label uiLabel for="f-venue" class="text-[11px] uppercase tracking-[0.2em]">Venue</label>
                  <input uiInput data-wf="i-3-0-1" id="f-venue" name="venue" type="text" [(ngModel)]="fVenue"
                         placeholder="Chowdiah Memorial Hall"
                         class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         [attr.aria-invalid]="errors().venue ? 'true' : null"
                         [style.border]="'1px solid ' + (errors().venue ? brand.primaryColor : hairlineStrong)"
                         [style.outline-color]="brand.primaryColor">
                  @if (errors().venue) { <p class="mt-1.5 text-xs">{{ errors().venue }}</p> }
                </div>

                <div>
                  <label uiLabel for="f-city" class="text-[11px] uppercase tracking-[0.2em]">City</label>
                  <select uiSelect data-wf="i-3-0-2" id="f-city" name="city" [(ngModel)]="fCity"
                          class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          [attr.aria-invalid]="errors().city ? 'true' : null"
                          [style.border]="'1px solid ' + (errors().city ? brand.primaryColor : hairlineStrong)"
                          [style.outline-color]="brand.primaryColor">
                    <option value="">Select a city</option>
                    @for (c of cities; track c) { <option [value]="c">{{ c }}</option> }
                  </select>
                  @if (errors().city) { <p class="mt-1.5 text-xs">{{ errors().city }}</p> }
                </div>

                <div>
                  <label uiLabel for="f-category" class="text-[11px] uppercase tracking-[0.2em]">Category</label>
                  <select uiSelect data-wf="i-3-0-3" id="f-category" name="category" [(ngModel)]="fCategory"
                          class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          [attr.aria-invalid]="errors().category ? 'true' : null"
                          [style.border]="'1px solid ' + (errors().category ? brand.primaryColor : hairlineStrong)"
                          [style.outline-color]="brand.primaryColor">
                    <option value="">Select a category</option>
                    @for (c of categories; track c) { <option [value]="c">{{ c }}</option> }
                  </select>
                  @if (errors().category) { <p class="mt-1.5 text-xs">{{ errors().category }}</p> }
                </div>

                <div>
                  <label uiLabel for="f-starts" class="text-[11px] uppercase tracking-[0.2em]">Date &amp; time</label>
                  <input uiInput data-wf="i-3-0-4" id="f-starts" name="starts_at" type="datetime-local" [(ngModel)]="fStartsAt"
                         class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         style="font-variant-numeric: tabular-nums;"
                         [attr.aria-invalid]="errors().starts_at ? 'true' : null"
                         [style.border]="'1px solid ' + (errors().starts_at ? brand.primaryColor : hairlineStrong)"
                         [style.outline-color]="brand.primaryColor">
                  @if (errors().starts_at) { <p class="mt-1.5 text-xs">{{ errors().starts_at }}</p> }
                </div>

                <div class="sm:col-span-2">
                  <label uiLabel for="f-description" class="text-[11px] uppercase tracking-[0.2em]">Description</label>
                  <textarea uiTextarea data-wf="i-3-0-5" id="f-description" name="description" rows="4" [(ngModel)]="fDescription"
                            placeholder="What happens on the night, who is performing, doors and entry rules."
                            class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            [attr.aria-invalid]="errors().description ? 'true' : null"
                            [style.border]="'1px solid ' + (errors().description ? brand.primaryColor : hairlineStrong)"
                            [style.outline-color]="brand.primaryColor"></textarea>
                  @if (errors().description) { <p class="mt-1.5 text-xs">{{ errors().description }}</p> }
                </div>

                <div class="sm:col-span-2">
                  <label uiLabel for="f-poster" class="text-[11px] uppercase tracking-[0.2em]">Poster image</label>
                  <input uiInput data-wf="i-3-0-6" id="f-poster" name="poster_url" type="url" [(ngModel)]="fPoster"
                         placeholder="https://cdn.quorq.events/posters/sundowner-mumbai.jpg"
                         aria-describedby="poster-hint"
                         class="mt-2 w-full rounded-none bg-transparent px-3 py-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                         [style.border]="'1px solid ' + hairlineStrong"
                         [style.outline-color]="brand.primaryColor">
                  <p id="poster-hint" class="mt-1.5 text-xs" [style.color]="brand.neutralColor">
                    Optional. 3:2 landscape reads best on the listing card.
                  </p>
                </div>
              </div>
            </fieldset>

            <!-- ROW 5 — CONSTRAINT / VALIDATION TEXT -->
            <p data-wf="b-4-0" class="mt-6 flex items-start gap-2.5 p-3 text-sm leading-relaxed"
               [attr.role]="hasErrors() ? 'alert' : null"
               [style.border]="'1px solid ' + (hasErrors() ? brand.primaryColor : hairline)"
               [style.background-color]="hasErrors() ? tintPrimary : 'transparent'">
              <ui-icon [name]="hasErrors() ? 'AlertCircle' : 'Clock'" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
              <span>
                @if (hasErrors()) { <strong class="uppercase tracking-[0.14em]">Fix before publishing &mdash;</strong> }
                City is required. Date &amp; time must be in the future.
              </span>
            </p>

            <!-- ROW 6 — TICKET TYPES -->
            <section data-wf="b-5-0" class="mt-8 p-1" [style.border]="'1px solid ' + brand.primaryColor">
              <div class="p-4 sm:p-5" [style.border]="'1px solid ' + brand.accentColor" [style.background-color]="panel">
                <div class="flex flex-wrap items-baseline justify-between gap-2 pb-3">
                  <h3 class="text-[13px] uppercase tracking-[0.26em]" [style.font-family]="brand.fontHeading">
                    General-admission ticket types
                  </h3>
                  <p class="text-xs" [style.color]="brand.neutralColor">
                    No seat maps &mdash; every ticket is general admission
                  </p>
                </div>

                @if (ticketDraft().length === 0) {
                  <p class="py-6 text-center text-sm" [style.color]="brand.neutralColor">
                    No ticket types yet. Add one &mdash; say Regular at &#8377;799 &mdash; so the event can be booked.
                  </p>
                } @else {
                  <div class="overflow-x-auto">
                    <table uiTable class="w-full text-sm" style="font-variant-numeric: tabular-nums;">
                      <caption class="sr-only">Ticket types for this event</caption>
                      <thead uiTHead>
                        <tr uiTR [style.border-bottom]="'1px solid ' + brand.accentColor">
                          <th uiTH data-wf="i-5-0-0" scope="col" class="py-2 pr-3 text-left text-[10px] uppercase tracking-[0.2em]">Name</th>
                          <th uiTH data-wf="i-5-0-1" scope="col" class="py-2 pr-3 text-left text-[10px] uppercase tracking-[0.2em]">Price (INR)</th>
                          <th uiTH data-wf="i-5-0-2" scope="col" class="py-2 pr-3 text-left text-[10px] uppercase tracking-[0.2em]">Quantity total</th>
                          <th uiTH data-wf="i-5-0-3" scope="col" class="py-2 text-left text-[10px] uppercase tracking-[0.2em]">Quantity sold</th>
                        </tr>
                      </thead>
                      <tbody uiTBody>
                        @for (t of ticketDraft(); track $index) {
                          <tr uiTR class="wf-rise" [style.border-top]="'1px solid ' + hairline">
                            <td uiTD class="py-3 pr-3">
                              <label class="sr-only" [attr.for]="'tt-name-' + $index">Ticket type {{ $index + 1 }} name</label>
                              <input uiInput [id]="'tt-name-' + $index" [name]="'tt_name_' + $index" type="text"
                                     [ngModel]="t.name" (ngModelChange)="updateTicket($index, 'name', $event)"
                                     placeholder="Regular"
                                     class="w-36 rounded-none bg-transparent px-2 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                     [style.border]="'1px solid ' + hairlineStrong" [style.outline-color]="brand.primaryColor">
                            </td>
                            <td uiTD class="py-3 pr-3">
                              <label class="sr-only" [attr.for]="'tt-price-' + $index">Ticket type {{ $index + 1 }} price in rupees</label>
                              <input uiInput [id]="'tt-price-' + $index" [name]="'tt_price_' + $index" type="number" min="0" step="1"
                                     [ngModel]="t.price_inr" (ngModelChange)="updateTicket($index, 'price_inr', $event)"
                                     placeholder="799"
                                     class="w-28 rounded-none bg-transparent px-2 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                     style="font-variant-numeric: tabular-nums;"
                                     [style.border]="'1px solid ' + hairlineStrong" [style.outline-color]="brand.primaryColor">
                            </td>
                            <td uiTD class="py-3 pr-3">
                              <label class="sr-only" [attr.for]="'tt-qty-' + $index">Ticket type {{ $index + 1 }} quantity total</label>
                              <input uiInput [id]="'tt-qty-' + $index" [name]="'tt_qty_' + $index" type="number" min="1" step="1"
                                     [ngModel]="t.quantity_total" (ngModelChange)="updateTicket($index, 'quantity_total', $event)"
                                     placeholder="300"
                                     class="w-28 rounded-none bg-transparent px-2 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                     style="font-variant-numeric: tabular-nums;"
                                     [style.border]="'1px solid ' + hairlineStrong" [style.outline-color]="brand.primaryColor">
                            </td>
                            <td uiTD class="py-3">
                              <span class="inline-block px-2 py-2">{{ t.quantity_sold }}</span>
                              <span class="text-xs" [style.color]="brand.neutralColor"> sold &mdash; set by bookings</span>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                  <p class="mt-3 text-xs" [style.color]="brand.neutralColor" style="font-variant-numeric: tabular-nums;">
                    Draft capacity {{ draftCapacity() }} tickets &middot; gross at full house {{ inr(draftGross()) }}
                  </p>
                }

                @if (errors().tickets) {
                  <p class="mt-3 flex items-start gap-2 text-sm" role="alert">
                    <ui-icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                    <span>{{ errors().tickets }}</span>
                  </p>
                }
              </div>
            </section>

            <!-- ROW 7 — ACTIONS -->
            <div class="mt-8 grid grid-cols-12 gap-3">
              <div class="col-span-12 sm:col-span-4">
                <button data-wf="b-6-0" uiButton type="button" variant="secondary" (click)="addTicket()"
                        class="w-full rounded-none px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        [style.border]="'1px solid ' + brand.primaryColor" [style.outline-color]="brand.primaryColor">
                  <ui-icon name="Plus" class="mr-2 inline h-4 w-4" aria-hidden="true"></ui-icon>Add ticket type
                </button>
              </div>
              <div class="col-span-12 sm:col-span-4">
                <button data-wf="b-6-1" uiButton type="submit"
                        class="w-full rounded-none px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                        [style.outline-color]="brand.primaryColor" [style.font-family]="brand.fontHeading">
                  <ui-icon name="Check" class="mr-2 inline h-4 w-4" aria-hidden="true"></ui-icon>Save &amp; publish
                </button>
              </div>
              <div class="col-span-12 sm:col-span-4">
                <button data-wf="b-6-2" uiButton type="button" variant="secondary" (click)="closeSales()"
                        [disabled]="!canCloseSales()"
                        [attr.aria-describedby]="!canCloseSales() ? 'close-sales-hint' : null"
                        class="w-full rounded-none px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
                        [style.border]="'1px solid ' + brand.primaryColor" [style.outline-color]="brand.primaryColor">
                  <ui-icon name="X" class="mr-2 inline h-4 w-4" aria-hidden="true"></ui-icon>
                  {{ confirmClose() ? 'Confirm: stop sales' : 'Close sales' }}
                </button>
                @if (!canCloseSales()) {
                  <p id="close-sales-hint" class="mt-2 text-xs" [style.color]="brand.neutralColor">
                    Available once the event is published.
                  </p>
                } @else if (confirmClose()) {
                  <p class="mt-2 text-xs" [style.color]="brand.neutralColor">
                    Attendees can no longer book. Issued tickets stay valid.
                  </p>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
</div>
`;

@Component({
  selector: "app-organizer-dashboard-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  cities = ['Mumbai', 'Bengaluru', 'Hyderabad', 'Delhi NCR', 'Kolkata', 'Chennai', 'Pune', 'Jaipur'];
  categories = ['Music', 'Comedy', 'Food & Drink', 'Arts & Culture', 'Business', 'Sports', 'Literature', 'Workshops'];

  now = new Date('2026-11-05T09:00:00');

  events = signal([
    {
      id: 'EVT-4821', title: 'Startup Yatra: Product Night', venue: 'T-Hub Phase 2', city: 'Hyderabad',
      category: 'Business', starts_at: '2026-11-12T18:30', status: 'closed',
      description: 'Four product teams demo in public, then an open floor with Deccan investors.',
      poster_url: '', dateLabel: '12 Nov 2026', timeLabel: '6:30 pm',
      ticket_types: [{ name: 'Regular', price_inr: 499, quantity_total: 120, quantity_sold: 97 }]
    },
    {
      id: 'EVT-4790', title: 'Sundowner Sessions: Indian Ocean Live', venue: 'Phoenix Marketcity Lawns', city: 'Mumbai',
      category: 'Music', starts_at: '2026-11-14T19:30', status: 'published',
      description: 'Indian Ocean play a two-hour set as the sun goes down over Kurla, with Kutle Khan opening.',
      poster_url: '', dateLabel: '14 Nov 2026', timeLabel: '7:30 pm',
      ticket_types: [
        { name: 'Regular', price_inr: 1499, quantity_total: 450, quantity_sold: 318 },
        { name: 'VIP Terrace', price_inr: 3999, quantity_total: 150, quantity_sold: 94 }
      ]
    },
    {
      id: 'EVT-4802', title: 'Bengaluru Comedy Carnival', venue: 'Chowdiah Memorial Hall', city: 'Bengaluru',
      category: 'Comedy', starts_at: '2026-11-21T20:00', status: 'published',
      description: 'Six comics, ninety minutes, strictly no phones in the hall.',
      poster_url: '', dateLabel: '21 Nov 2026', timeLabel: '8:00 pm',
      ticket_types: [
        { name: 'Regular', price_inr: 899, quantity_total: 260, quantity_sold: 221 },
        { name: 'Front Rows', price_inr: 1799, quantity_total: 90, quantity_sold: 67 }
      ]
    },
    {
      id: 'EVT-4833', title: 'Deccan Food & Wine Walk', venue: 'Charminar Quarter, Laad Bazaar', city: 'Hyderabad',
      category: 'Food & Drink', starts_at: '2026-11-28T17:00', status: 'draft',
      description: 'A guided four-stop evening walk through the old city kitchens, finishing with Sula pairings.',
      poster_url: '', dateLabel: '28 Nov 2026', timeLabel: '5:00 pm',
      ticket_types: [{ name: 'Regular', price_inr: 1250, quantity_total: 200, quantity_sold: 0 }]
    },
    {
      id: 'EVT-4845', title: 'Kolkata Jazz Nocturne', venue: 'Kala Mandir', city: 'Kolkata',
      category: 'Music', starts_at: '2026-12-05T19:00', status: 'published',
      description: 'The Bodhisattwa Trio with guest vocals from Sohini Alam. One set, no interval.',
      poster_url: '', dateLabel: '5 Dec 2026', timeLabel: '7:00 pm',
      ticket_types: [{ name: 'Regular', price_inr: 1100, quantity_total: 150, quantity_sold: 150 }]
    },
    {
      id: 'EVT-4851', title: 'Jaipur Lit Fringe: Poetry Hour', venue: 'Diggi Palace, Durbar Hall', city: 'Jaipur',
      category: 'Literature', starts_at: '2026-12-19T16:00', status: 'draft',
      description: 'Readings in Hindi, Rajasthani and English from eight voices outside the main programme.',
      poster_url: '', dateLabel: '19 Dec 2026', timeLabel: '4:00 pm',
      ticket_types: [{ name: 'Regular', price_inr: 350, quantity_total: 180, quantity_sold: 0 }]
    },
    {
      id: 'EVT-4712', title: 'Diwali Dhun: Classical Evening', venue: 'NCPA Tata Theatre', city: 'Mumbai',
      category: 'Arts & Culture', starts_at: '2026-10-29T18:00', status: 'completed',
      description: 'Kaushiki Chakraborty in recital, accompanied on sarangi by Murad Ali Khan.',
      poster_url: '', dateLabel: '29 Oct 2026', timeLabel: '6:00 pm',
      ticket_types: [
        { name: 'Regular', price_inr: 1200, quantity_total: 400, quantity_sold: 400 },
        { name: 'Patron', price_inr: 4500, quantity_total: 140, quantity_sold: 140 }
      ]
    }
  ]);

  modalOpen = signal(false);
  editingId = signal(null);
  confirmClose = signal(false);
  flash = signal(null);
  saveError = signal(null);
  errors = signal({});

  fTitle = signal('');
  fVenue = signal('');
  fCity = signal('');
  fCategory = signal('');
  fStartsAt = signal('');
  fDescription = signal('');
  fPoster = signal('');
  ticketDraft = signal([]);

  totalSold = computed(() => this.events().reduce((s, e) => s + this.soldOf(e), 0).toLocaleString('en-IN'));
  totalCapacity = computed(() => this.events().reduce((s, e) => s + this.capacityOf(e), 0).toLocaleString('en-IN'));
  hasErrors = computed(() => Object.keys(this.errors()).length > 0);
  draftCapacity = computed(() => this.ticketDraft().reduce((s, t) => s + (Number(t.quantity_total) || 0), 0));
  draftGross = computed(() => this.ticketDraft().reduce((s, t) => s + (Number(t.quantity_total) || 0) * (Number(t.price_inr) || 0), 0));
  canCloseSales = computed(() => {
    const id = this.editingId();
    if (!id) return false;
    const ev = this.events().find((e) => e.id === id);
    return !!ev && ev.status === 'published';
  });

  get hairline() { return 'color-mix(in srgb, ' + this.brand.primaryColor + ' 15%, transparent)'; }
  get hairlineStrong() { return 'color-mix(in srgb, ' + this.brand.primaryColor + ' 38%, transparent)'; }
  get panel() { return 'color-mix(in srgb, ' + this.brand.backgroundColor + ' 55%, white)'; }
  get tintAccent() { return 'color-mix(in srgb, ' + this.brand.accentColor + ' 26%, transparent)'; }
  get tintPrimary() { return 'color-mix(in srgb, ' + this.brand.primaryColor + ' 8%, transparent)'; }
  get scrim() { return 'color-mix(in srgb, ' + this.brand.primaryColor + ' 72%, transparent)'; }

  soldOf(e) { return e.ticket_types.reduce((s, t) => s + (Number(t.quantity_sold) || 0), 0); }
  capacityOf(e) { return e.ticket_types.reduce((s, t) => s + (Number(t.quantity_total) || 0), 0); }
  pct(e) {
    const cap = this.capacityOf(e);
    return cap ? Math.min(100, Math.round((this.soldOf(e) / cap) * 100)) : 0;
  }
  inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }

  statusLabel(s) {
    if (s === 'published') return 'Published';
    if (s === 'draft') return 'Draft';
    if (s === 'closed') return 'Sales closed';
    return 'Completed';
  }
  statusIcon(s) {
    if (s === 'published') return 'CheckCircle';
    if (s === 'draft') return 'Edit';
    if (s === 'closed') return 'X';
    return 'Check';
  }

  openCreate() {
    this.editingId.set(null);
    this.fTitle.set('');
    this.fVenue.set('');
    this.fCity.set('');
    this.fCategory.set('');
    this.fStartsAt.set('');
    this.fDescription.set('');
    this.fPoster.set('');
    this.ticketDraft.set([{ name: 'Regular', price_inr: '', quantity_total: '', quantity_sold: 0 }]);
    this.errors.set({});
    this.saveError.set(null);
    this.confirmClose.set(false);
    this.flash.set(null);
    this.modalOpen.set(true);
  }

  openEdit(e) {
    this.editingId.set(e.id);
    this.fTitle.set(e.title);
    this.fVenue.set(e.venue);
    this.fCity.set(e.city);
    this.fCategory.set(e.category);
    this.fStartsAt.set(e.starts_at);
    this.fDescription.set(e.description);
    this.fPoster.set(e.poster_url);
    this.ticketDraft.set(e.ticket_types.map((t) => ({ name: t.name, price_inr: t.price_inr, quantity_total: t.quantity_total, quantity_sold: t.quantity_sold })));
    this.errors.set({});
    this.saveError.set(null);
    this.confirmClose.set(false);
    this.flash.set(null);
    this.modalOpen.set(true);
  }

  requestClose() {
    this.modalOpen.set(false);
    this.confirmClose.set(false);
  }

  addTicket() {
    this.ticketDraft.update((rows) => rows.concat([{ name: '', price_inr: '', quantity_total: '', quantity_sold: 0 }]));
  }

  updateTicket(i, key, value) {
    this.ticketDraft.update((rows) => rows.map((r, idx) => (idx === i ? Object.assign({}, r, { [key]: value }) : r)));
  }

  validate() {
    const errs = {};
    if (!this.fTitle().trim()) errs.title = 'Give the event a title attendees will recognise.';
    if (!this.fVenue().trim()) errs.venue = 'Name the venue, including the hall or lawn.';
    if (!this.fCity()) errs.city = 'City is required for discovery filters.';
    if (!this.fCategory()) errs.category = 'Pick the category it should appear under.';
    const when = this.fStartsAt();
    if (!when) {
      errs.starts_at = 'Set the date and start time.';
    } else {
      const d = new Date(when);
      if (isNaN(d.getTime())) errs.starts_at = 'That date could not be read. Use the picker.';
      else if (d.getTime() <= this.now.getTime()) errs.starts_at = 'Date & time must be in the future.';
    }
    if (this.fDescription().trim().length < 20) errs.description = 'Write at least a line or two — this is what sells the ticket.';

    const rows = this.ticketDraft();
    const valid = rows.filter((t) => String(t.name).trim() && Number(t.quantity_total) > 0 && Number(t.price_inr) >= 0);
    if (rows.length === 0 || valid.length === 0) {
      errs.tickets = 'Add at least one ticket type with a name, a price in INR and a quantity above zero.';
    } else if (valid.length !== rows.length) {
      errs.tickets = 'One ticket type is incomplete. Each needs a name, a price and a quantity above zero.';
    }
    return errs;
  }

  save() {
    const errs = this.validate();
    this.errors.set(errs);
    this.saveError.set(null);
    if (Object.keys(errs).length > 0) return;

    const title = this.fTitle().trim();
    const clash = this.events().find((e) => e.title.toLowerCase() === title.toLowerCase() && e.id !== this.editingId());
    if (clash) {
      this.saveError.set('You already list an event titled “' + clash.title + '” on ' + clash.dateLabel + ' in ' + clash.city + '. Rename this one or edit the original — nothing you typed has been lost.');
      return;
    }

    const when = new Date(this.fStartsAt());
    const dateLabel = when.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeLabel = when.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
    const tickets = this.ticketDraft().map((t) => ({
      name: String(t.name).trim(),
      price_inr: Number(t.price_inr) || 0,
      quantity_total: Number(t.quantity_total) || 0,
      quantity_sold: Number(t.quantity_sold) || 0
    }));

    const id = this.editingId();
    if (id) {
      this.events.update((list) => list.map((e) => (e.id === id ? Object.assign({}, e, {
        title: title, venue: this.fVenue().trim(), city: this.fCity(), category: this.fCategory(),
        starts_at: this.fStartsAt(), description: this.fDescription().trim(), poster_url: this.fPoster().trim(),
        status: e.status === 'completed' ? 'completed' : 'published',
        dateLabel: dateLabel, timeLabel: timeLabel, ticket_types: tickets
      }) : e)));
      this.flash.set('“' + title + '” updated and live. ' + tickets.length + ' ticket type' + (tickets.length === 1 ? '' : 's') + ' on sale for ' + dateLabel + '.');
    } else {
      const newEvent = {
        id: 'EVT-' + (4860 + this.events().length), title: title, venue: this.fVenue().trim(),
        city: this.fCity(), category: this.fCategory(), starts_at: this.fStartsAt(),
        status: 'published', description: this.fDescription().trim(), poster_url: this.fPoster().trim(),
        dateLabel: dateLabel, timeLabel: timeLabel, ticket_types: tickets
      };
      this.events.update((list) => [newEvent].concat(list));
      this.flash.set('“' + title + '” published to Browse events — ' + dateLabel + ', ' + this.fCity() + ', ' + tickets.reduce((s, t) => s + t.quantity_total, 0) + ' tickets on sale.');
    }

    this.modalOpen.set(false);
    this.confirmClose.set(false);
    this.errors.set({});
  }

  closeSales() {
    if (!this.canCloseSales()) return;
    if (!this.confirmClose()) {
      this.confirmClose.set(true);
      return;
    }
    const id = this.editingId();
    const ev = this.events().find((e) => e.id === id);
    this.events.update((list) => list.map((e) => (e.id === id ? Object.assign({}, e, { status: 'closed' }) : e)));
    this.flash.set('Sales closed for “' + ev.title + '”. It is no longer bookable; the ' + this.soldOf(ev) + ' tickets already issued stay valid for entry.');
    this.modalOpen.set(false);
    this.confirmClose.set(false);
  }
}
