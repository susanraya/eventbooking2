// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
const template = `
<div class="min-h-screen pb-24" [style.background-color]="brand.backgroundColor" [style.font-family]="brand.fontBody" [style.color]="brand.primaryColor">
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

    <!-- ===== Page title ===== -->
    <header data-wf="b-0-0" class="pt-12 pb-8 text-center">
      <p class="text-[11px] uppercase opacity-70" style="letter-spacing:0.38em">Live events across India &middot; December 2026</p>
      <h1 class="mt-4 text-3xl sm:text-[40px] leading-tight uppercase" [style.font-family]="brand.fontHeading" style="letter-spacing:0.2em">Browse events</h1>
      <div class="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
        <span class="h-px w-12 sm:w-24" [style.background-color]="brand.accentColor"></span>
        <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
        <span class="h-px w-20 sm:w-40" [style.background-color]="brand.accentColor"></span>
        <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
        <span class="h-px w-12 sm:w-24" [style.background-color]="brand.accentColor"></span>
      </div>
    </header>

    <!-- ===== Search ===== -->
    <section data-wf="b-1-0" class="mx-auto max-w-3xl">
      <h2 class="sr-only">Search events</h2>
      <label uiLabel for="event-search" class="block text-center text-[11px] uppercase opacity-70" style="letter-spacing:0.3em">Find your evening</label>
      <div class="relative mt-3" [style.outline]="'1px solid ' + brand.primaryColor" style="outline-offset:4px">
        <ui-icon name="Search" class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true"></ui-icon>
        <input uiInput id="event-search" type="search" autocomplete="off"
               class="h-14 w-full rounded-none border bg-transparent pl-12 pr-4 text-base shadow-none"
               [style.border-color]="brand.accentColor"
               [ngModel]="query()" (ngModelChange)="setQuery($event)"
               aria-describedby="search-hint"
               placeholder="Search events, artists or venues">
      </div>
      <p id="search-hint" class="mt-3 text-center text-xs opacity-70">Try &ldquo;Nucleya&rdquo;, &ldquo;Ranga Shankara&rdquo; or &ldquo;stand-up&rdquo;.</p>
    </section>

    <!-- ===== Filters ===== -->
    <section data-wf="b-2-0" class="mt-10 border bg-white/50 p-5 sm:p-6"
             [style.border-color]="brand.accentColor"
             [style.outline]="'1px solid ' + brand.primaryColor" style="outline-offset:4px">
      <h2 class="flex items-center justify-center gap-2 text-[11px] uppercase" style="letter-spacing:0.3em">
        <ui-icon name="Filter" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
        <span>Refine the bill</span>
      </h2>
      <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div>
          <label uiLabel for="filter-city" class="block text-[11px] uppercase opacity-70" style="letter-spacing:0.22em">City</label>
          <select uiSelect id="filter-city" data-wf="i-2-0-0"
                  class="mt-2 h-11 w-full rounded-none border bg-transparent px-3 text-sm shadow-none"
                  [style.border-color]="brand.accentColor"
                  [ngModel]="city()" (ngModelChange)="setCity($event)">
            <option value="all">All cities</option>
            @for (c of cities; track c) { <option [value]="c">{{ c }}</option> }
          </select>
        </div>

        <div>
          <label uiLabel for="filter-date" class="block text-[11px] uppercase opacity-70" style="letter-spacing:0.22em">Date</label>
          <select uiSelect id="filter-date" data-wf="i-2-0-1"
                  class="mt-2 h-11 w-full rounded-none border bg-transparent px-3 text-sm shadow-none"
                  [style.border-color]="brand.accentColor"
                  [ngModel]="dateRange()" (ngModelChange)="setDate($event)">
            @for (d of dateOptions; track d.value) { <option [value]="d.value">{{ d.label }}</option> }
          </select>
        </div>

        <div>
          <label uiLabel for="filter-category" class="block text-[11px] uppercase opacity-70" style="letter-spacing:0.22em">Category</label>
          <select uiSelect id="filter-category" data-wf="i-2-0-2"
                  class="mt-2 h-11 w-full rounded-none border bg-transparent px-3 text-sm shadow-none"
                  [style.border-color]="brand.accentColor"
                  [ngModel]="category()" (ngModelChange)="setCategory($event)">
            <option value="all">All categories</option>
            @for (c of categories; track c) { <option [value]="c">{{ c }}</option> }
          </select>
        </div>

        <div>
          <span class="block text-[11px] uppercase opacity-0" style="letter-spacing:0.22em" aria-hidden="true">Reset</span>
          <button uiButton variant="outline" type="button" data-wf="i-2-0-3"
                  class="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-none border text-[11px] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                  style="letter-spacing:0.2em"
                  [style.border-color]="brand.primaryColor"
                  [disabled]="!hasFilters()"
                  (click)="clearFilters()">
            <ui-icon name="X" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
            <span>Clear filters</span>
          </button>
        </div>
      </div>
      @if (!hasFilters()) {
        <p class="mt-4 text-center text-xs opacity-70">Showing the full programme &mdash; {{ allEvents.length }} published events.</p>
      }
    </section>

    <!-- ===== Result count ===== -->
    <section class="mt-12">
      <div data-wf="b-3-0" class="flex flex-col gap-2 border-b pb-3 sm:flex-row sm:items-end sm:justify-between"
           [style.border-color]="brand.accentColor">
        <h2 class="text-sm uppercase tabular-nums" [style.font-family]="brand.fontHeading" style="letter-spacing:0.22em">{{ resultsPhrase() }}</h2>
        <p class="text-xs tabular-nums opacity-70">{{ filterSummary() }} &middot; Listings synced 09:12 IST</p>
      </div>

      <!-- ===== Card grid ===== -->
      <div data-wf="b-4-0" class="mt-8">

        @if (loading()) {
          <p role="status" class="mb-6 flex items-center justify-center gap-2 text-[11px] uppercase opacity-70" style="letter-spacing:0.28em">
            <ui-icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
            <span>Consulting the box office&hellip;</span>
          </p>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
            @for (s of skeletons; track s) {
              <div class="border bg-white/40" [style.border-color]="brand.accentColor">
                <div class="h-24 animate-pulse motion-reduce:animate-none" [style.background-color]="brand.neutralColor"></div>
                <div class="space-y-3 p-5">
                  <div class="h-2 w-24 animate-pulse motion-reduce:animate-none" [style.background-color]="brand.accentColor"></div>
                  <div class="h-4 w-3/4 animate-pulse motion-reduce:animate-none" [style.background-color]="brand.neutralColor"></div>
                  <div class="h-3 w-1/2 animate-pulse motion-reduce:animate-none" [style.background-color]="brand.accentColor"></div>
                  <div class="h-3 w-2/3 animate-pulse motion-reduce:animate-none" [style.background-color]="brand.accentColor"></div>
                </div>
              </div>
            }
          </div>

        } @else if (loadError()) {
          <div class="border bg-white/60 p-10 text-center" [style.border-color]="brand.accentColor"
               [style.outline]="'1px solid ' + brand.primaryColor" style="outline-offset:4px">
            <ui-icon name="AlertCircle" class="mx-auto h-6 w-6" aria-hidden="true"></ui-icon>
            <h3 class="mt-4 text-lg uppercase" [style.font-family]="brand.fontHeading" style="letter-spacing:0.18em">The box office did not answer</h3>
            <p class="mx-auto mt-3 max-w-md text-sm opacity-70">Our listings service timed out while fetching {{ city() === 'all' ? 'all cities' : city() }}. Your search and filters are kept exactly as you left them.</p>
            <button uiButton type="button" class="mt-6 rounded-none px-6 text-[11px] uppercase" style="letter-spacing:0.22em"
                    [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                    (click)="retry()">Try again</button>
          </div>

        } @else if (filtered().length > 0) {
          <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            @for (e of filtered(); track e.id; let i = $index) {
              <li class="transition duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100"
                  [class.opacity-0]="!reveal()" [class.translate-y-2]="!reveal()"
                  [style.transition-delay]="delayFor(i)">
                <article class="relative flex h-full flex-col border bg-white/55 transition duration-200 hover:-translate-y-0.5 hover:bg-white/85 motion-reduce:transition-none"
                         [style.border-color]="brand.accentColor"
                         [style.outline]="'1px solid ' + brand.primaryColor" style="outline-offset:4px">

                  <!-- monogram plaque -->
                  <div class="relative flex h-24 items-center justify-center"
                       [style.background-color]="brand.primaryColor"
                       [class.opacity-60]="isSoldOut(e)">
                    <span class="absolute inset-2 border" [style.border-color]="brand.accentColor" aria-hidden="true"></span>
                    <span class="relative text-xl" aria-hidden="true" [style.font-family]="brand.fontHeading"
                          [style.color]="brand.accentColor" style="letter-spacing:0.34em">{{ e.monogram }}</span>
                  </div>

                  <div class="flex flex-1 flex-col gap-3 p-5">
                    <p class="text-[11px] uppercase opacity-70" style="letter-spacing:0.22em">{{ e.category }} &middot; {{ e.city }}</p>

                    <h3 class="text-base leading-snug" [style.font-family]="brand.fontHeading">
                      <button type="button"
                              [attr.data-wf]="wf(e)"
                              (click)="openEvent(e)"
                              [attr.aria-label]="'View ' + e.title + ', ' + e.starts_label + ' at ' + e.venue"
                              class="text-left uppercase after:absolute after:inset-0 after:content-[&quot;&quot;] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                              style="letter-spacing:0.08em">{{ e.title }}</button>
                    </h3>

                    <p class="flex items-center gap-2 text-sm tabular-nums">
                      <ui-icon name="Calendar" class="h-4 w-4 shrink-0" aria-hidden="true"></ui-icon>
                      <span>{{ e.starts_label }}</span>
                    </p>
                    <p class="text-sm opacity-70">{{ e.venue }}</p>

                    <div class="mt-auto flex items-end justify-between gap-3 border-t pt-4" [style.border-color]="brand.accentColor">
                      <p>
                        <span class="block text-[10px] uppercase opacity-70" style="letter-spacing:0.22em">From</span>
                        <span class="text-lg tabular-nums" [style.font-family]="brand.fontHeading">{{ money(e.from_price_inr) }}</span>
                      </p>
                      <span class="inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] uppercase whitespace-nowrap"
                            style="letter-spacing:0.16em"
                            [style.border-color]="brand.primaryColor"
                            [style.background-color]="isSoldOut(e) ? brand.primaryColor : 'transparent'"
                            [style.color]="isSoldOut(e) ? brand.accentColor : brand.primaryColor">
                        <ui-icon [name]="statusIcon(e)" class="h-3 w-3" aria-hidden="true"></ui-icon>
                        <span>{{ statusLabel(e) }}</span>
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            }
          </ul>

          <div class="mt-12 flex items-center justify-center gap-3" aria-hidden="true">
            <span class="h-px w-16 sm:w-28" [style.background-color]="brand.accentColor"></span>
            <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
            <span class="h-px w-16 sm:w-28" [style.background-color]="brand.accentColor"></span>
          </div>
          <p class="mt-4 text-center text-xs tabular-nums opacity-70">End of the programme &mdash; {{ filtered().length }} of {{ allEvents.length }} published events shown.</p>
        }
      </div>
    </section>

    <!-- ===== Empty state ===== -->
    @if (!loading() && !loadError() && filtered().length === 0) {
      <section data-wf="b-5-0" class="mt-8 border bg-white/50 px-6 py-12 text-center"
               [style.border-color]="brand.accentColor"
               [style.outline]="'1px solid ' + brand.primaryColor" style="outline-offset:4px">
        <div class="mb-6 flex items-center justify-center gap-3" aria-hidden="true">
          <span class="h-px w-10 sm:w-20" [style.background-color]="brand.accentColor"></span>
          <span class="block h-2 w-2 rotate-45 border" [style.border-color]="brand.primaryColor"></span>
          <span class="block h-1.5 w-1.5 rotate-45" [style.background-color]="brand.primaryColor"></span>
          <span class="block h-2 w-2 rotate-45 border" [style.border-color]="brand.primaryColor"></span>
          <span class="h-px w-10 sm:w-20" [style.background-color]="brand.accentColor"></span>
        </div>
        @if (allEvents.length === 0) {
          <ui-empty title="The season programme opens soon"
                    description="No organizer has published an event yet. New shows are listed here the moment they go on sale.">
            <button uiButton type="button" class="rounded-none px-6 text-[11px] uppercase" style="letter-spacing:0.22em"
                    [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                    (click)="navigate('organizer-dashboard')">List an event</button>
          </ui-empty>
        } @else {
          <ui-empty title="The hall is empty tonight"
                    description="No events match your filters. Try another city, date or category.">
            <button uiButton type="button" class="rounded-none px-6 text-[11px] uppercase" style="letter-spacing:0.22em"
                    [style.background-color]="brand.primaryColor" [style.color]="brand.accentColor"
                    (click)="clearFilters()">Clear filters</button>
          </ui-empty>
        }
      </section>
    }

  </div>
</div>
`;

@Component({
  selector: "app-events-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  cities = ["Bengaluru", "Chennai", "Delhi NCR", "Goa", "Hyderabad", "Mumbai", "Pune"];
  categories = ["Comedy", "Food & Drink", "Music", "Sports", "Technology", "Theatre"];
  dateOptions = [
    { value: "any", label: "Any date" },
    { value: "weekend", label: "This weekend · 12–13 Dec" },
    { value: "dec", label: "1–31 Dec 2026" },
    { value: "jan", label: "1–31 Jan 2027" },
  ];
  skeletons = [1, 2, 3, 4, 5, 6];

  wfByEventId = {
    "e-4821": "i-4-0-0",
    "e-4833": "i-4-0-1",
    "e-4807": "i-4-0-2",
    "e-4866": "i-4-0-3",
  };

  allEvents = [
    {
      id: "e-4821",
      monogram: "SA",
      title: "Sunburn Arena ft. DJ Nucleya",
      venue: "Phoenix Marketcity",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-12T19:00",
      starts_label: "Sat 12 Dec 2026, 7:00 PM",
      from_price_inr: 999,
      quantity_total: 2400,
      quantity_sold: 2287,
    },
    {
      id: "e-4833",
      monogram: "BC",
      title: "Bengaluru Comedy Nights",
      venue: "Ranga Shankara, JP Nagar",
      city: "Bengaluru",
      category: "Comedy",
      starts_at: "2026-12-18T20:30",
      starts_label: "Fri 18 Dec 2026, 8:30 PM",
      from_price_inr: 499,
      quantity_total: 320,
      quantity_sold: 148,
    },
    {
      id: "e-4807",
      monogram: "IW",
      title: "Indie Weekender 2026",
      venue: "Jayamahal Palace Grounds",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-20T17:00",
      starts_label: "Sun 20 Dec 2026, 5:00 PM",
      from_price_inr: 1200,
      quantity_total: 5000,
      quantity_sold: 3110,
    },
    {
      id: "e-4866",
      monogram: "ST",
      title: "Startup Tech Summit",
      venue: "KTPO Whitefield",
      city: "Bengaluru",
      category: "Technology",
      starts_at: "2026-12-23T10:00",
      starts_label: "Wed 23 Dec 2026, 10:00 AM",
      from_price_inr: 2000,
      quantity_total: 900,
      quantity_sold: 612,
    },
    {
      id: "e-4790",
      monogram: "RD",
      title: "Raghu Dixit Project Live",
      venue: "Manpho Convention Centre",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-05T20:00",
      starts_label: "Sat 5 Dec 2026, 8:00 PM",
      from_price_inr: 1499,
      quantity_total: 1200,
      quantity_sold: 1200,
    },
    {
      id: "e-4795",
      monogram: "CM",
      title: "Carnatic Mornings: Sanjay Subrahmanyan",
      venue: "Chowdiah Memorial Hall",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-06T09:00",
      starts_label: "Sun 6 Dec 2026, 9:00 AM",
      from_price_inr: 750,
      quantity_total: 640,
      quantity_sold: 529,
    },
    {
      id: "e-4801",
      monogram: "OM",
      title: "Bangalore Open Mic Vol. 42",
      venue: "Atta Galatta, Indiranagar",
      city: "Bengaluru",
      category: "Comedy",
      starts_at: "2026-12-08T19:30",
      starts_label: "Tue 8 Dec 2026, 7:30 PM",
      from_price_inr: 250,
      quantity_total: 120,
      quantity_sold: 41,
    },
    {
      id: "e-4812",
      monogram: "IF",
      title: "The Improv Factory",
      venue: "That Comedy Club, Koramangala",
      city: "Bengaluru",
      category: "Comedy",
      starts_at: "2026-12-10T21:00",
      starts_label: "Thu 10 Dec 2026, 9:00 PM",
      from_price_inr: 399,
      quantity_total: 90,
      quantity_sold: 68,
    },
    {
      id: "e-4840",
      monogram: "AM",
      title: "Angular India Meetup",
      venue: "Prestige Tech Park, Marathahalli",
      city: "Bengaluru",
      category: "Technology",
      starts_at: "2026-12-11T18:30",
      starts_label: "Fri 11 Dec 2026, 6:30 PM",
      from_price_inr: 300,
      quantity_total: 250,
      quantity_sold: 196,
    },
    {
      id: "e-4823",
      monogram: "KF",
      title: "Koramangala Food Walk",
      venue: "Jyoti Nivas Circle",
      city: "Bengaluru",
      category: "Food & Drink",
      starts_at: "2026-12-13T11:00",
      starts_label: "Sun 13 Dec 2026, 11:00 AM",
      from_price_inr: 1100,
      quantity_total: 60,
      quantity_sold: 60,
    },
    {
      id: "e-4818",
      monogram: "MV",
      title: "Madhyama Vyayoga: Theatre Week",
      venue: "Ranga Shankara, JP Nagar",
      city: "Bengaluru",
      category: "Theatre",
      starts_at: "2026-12-14T19:30",
      starts_label: "Mon 14 Dec 2026, 7:30 PM",
      from_price_inr: 350,
      quantity_total: 280,
      quantity_sold: 95,
    },
    {
      id: "e-4836",
      monogram: "JH",
      title: "Jazz at The Humming Tree",
      venue: "The Humming Tree, Indiranagar",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-16T21:00",
      starts_label: "Wed 16 Dec 2026, 9:00 PM",
      from_price_inr: 850,
      quantity_total: 180,
      quantity_sold: 180,
    },
    {
      id: "e-4845",
      monogram: "AB",
      title: "AI Builders Conclave",
      venue: "Taj Yeshwantpur",
      city: "Bengaluru",
      category: "Technology",
      starts_at: "2026-12-17T09:30",
      starts_label: "Thu 17 Dec 2026, 9:30 AM",
      from_price_inr: 3500,
      quantity_total: 400,
      quantity_sold: 352,
    },
    {
      id: "e-4855",
      monogram: "BF",
      title: "Bengaluru FC vs Mumbai City FC",
      venue: "Sree Kanteerava Stadium",
      city: "Bengaluru",
      category: "Sports",
      starts_at: "2026-12-19T19:30",
      starts_label: "Sat 19 Dec 2026, 7:30 PM",
      from_price_inr: 400,
      quantity_total: 18000,
      quantity_sold: 17460,
    },
    {
      id: "e-4868",
      monogram: "NB",
      title: "Namma Brew Fest 2026",
      venue: "Embassy Golflinks",
      city: "Bengaluru",
      category: "Food & Drink",
      starts_at: "2026-12-20T12:00",
      starts_label: "Sun 20 Dec 2026, 12:00 PM",
      from_price_inr: 1600,
      quantity_total: 2500,
      quantity_sold: 1884,
    },
    {
      id: "e-4860",
      monogram: "SC",
      title: "Bollywood Night with Sunidhi Chauhan",
      venue: "Palace Grounds, Gate 7",
      city: "Bengaluru",
      category: "Music",
      starts_at: "2026-12-25T20:00",
      starts_label: "Fri 25 Dec 2026, 8:00 PM",
      from_price_inr: 1800,
      quantity_total: 7000,
      quantity_sold: 4290,
    },
    {
      id: "e-4871",
      monogram: "WC",
      title: "Whitefield Wine & Cheese Evening",
      venue: "The Den, Whitefield",
      city: "Bengaluru",
      category: "Food & Drink",
      starts_at: "2026-12-26T18:00",
      starts_label: "Sat 26 Dec 2026, 6:00 PM",
      from_price_inr: 2400,
      quantity_total: 150,
      quantity_sold: 38,
    },
    {
      id: "e-4877",
      monogram: "SB",
      title: "Shakespeare Under the Banyan",
      venue: "Cubbon Park Bandstand",
      city: "Bengaluru",
      category: "Theatre",
      starts_at: "2026-12-27T18:30",
      starts_label: "Sun 27 Dec 2026, 6:30 PM",
      from_price_inr: 600,
      quantity_total: 200,
      quantity_sold: 44,
    },

    {
      id: "e-5102",
      monogram: "ZK",
      title: "Zakir Khan: Papa Yaar",
      venue: "NSCI Dome, Worli",
      city: "Mumbai",
      category: "Comedy",
      starts_at: "2026-12-12T20:00",
      starts_label: "Sat 12 Dec 2026, 8:00 PM",
      from_price_inr: 1299,
      quantity_total: 4000,
      quantity_sold: 3880,
    },
    {
      id: "e-5110",
      monogram: "SO",
      title: "Symphony Orchestra of India: Beethoven 9",
      venue: "NCPA Jamshed Bhabha",
      city: "Mumbai",
      category: "Music",
      starts_at: "2026-12-13T18:00",
      starts_label: "Sun 13 Dec 2026, 6:00 PM",
      from_price_inr: 2500,
      quantity_total: 1000,
      quantity_sold: 640,
    },
    {
      id: "e-5288",
      monogram: "DW",
      title: "India Design Week Talks",
      venue: "Bikaner House",
      city: "Delhi NCR",
      category: "Technology",
      starts_at: "2026-12-10T10:00",
      starts_label: "Thu 10 Dec 2026, 10:00 AM",
      from_price_inr: 1500,
      quantity_total: 500,
      quantity_sold: 500,
    },
    {
      id: "e-5301",
      monogram: "PK",
      title: "Prateek Kuhad: Silhouettes Tour",
      venue: "Jawaharlal Nehru Stadium",
      city: "Delhi NCR",
      category: "Music",
      starts_at: "2027-01-15T20:00",
      starts_label: "Fri 15 Jan 2027, 8:00 PM",
      from_price_inr: 1999,
      quantity_total: 12000,
      quantity_sold: 4320,
    },
    {
      id: "e-5407",
      monogram: "DT",
      title: "Deccan Tech Fest 2027",
      venue: "HITEX Exhibition Centre",
      city: "Hyderabad",
      category: "Technology",
      starts_at: "2027-01-16T09:00",
      starts_label: "Sat 16 Jan 2027, 9:00 AM",
      from_price_inr: 2200,
      quantity_total: 3000,
      quantity_sold: 1180,
    },
    {
      id: "e-5520",
      monogram: "BJ",
      title: "Margazhi Season: Bombay Jayashri",
      venue: "The Music Academy",
      city: "Chennai",
      category: "Music",
      starts_at: "2026-12-19T18:30",
      starts_label: "Sat 19 Dec 2026, 6:30 PM",
      from_price_inr: 900,
      quantity_total: 1400,
      quantity_sold: 1400,
    },
    {
      id: "e-5614",
      monogram: "PS",
      title: "Pune Stand-Up Festival",
      venue: "Balgandharva Rangmandir",
      city: "Pune",
      category: "Comedy",
      starts_at: "2026-12-27T19:00",
      starts_label: "Sun 27 Dec 2026, 7:00 PM",
      from_price_inr: 599,
      quantity_total: 900,
      quantity_sold: 710,
    },
    {
      id: "e-5700",
      monogram: "SG",
      title: "Sunburn Festival Goa 2026",
      venue: "Vagator Beach",
      city: "Goa",
      category: "Music",
      starts_at: "2026-12-31T16:00",
      starts_label: "Thu 31 Dec 2026, 4:00 PM",
      from_price_inr: 4999,
      quantity_total: 25000,
      quantity_sold: 24100,
    },
  ];

  query = signal("");
  city = signal("Bengaluru");
  dateRange = signal("dec");
  category = signal("all");

  loading = signal(false);
  loadError = signal(false);
  reveal = signal(true);

  timer = null;
  revealTimer = null;

  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const city = this.city();
    const range = this.dateRange();
    const cat = this.category();
    return this.allEvents.filter((e) => {
      if (city !== "all" && e.city !== city) return false;
      if (cat !== "all" && e.category !== cat) return false;
      if (range === "dec" && !(e.starts_at >= "2026-12-01" && e.starts_at <= "2026-12-31T23:59"))
        return false;
      if (range === "jan" && !(e.starts_at >= "2027-01-01" && e.starts_at <= "2027-01-31T23:59"))
        return false;
      if (
        range === "weekend" &&
        !(e.starts_at.indexOf("2026-12-12") === 0 || e.starts_at.indexOf("2026-12-13") === 0)
      )
        return false;
      if (q) {
        const hay = (e.title + " " + e.venue + " " + e.city + " " + e.category).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  });

  hasFilters = computed(
    () =>
      this.query().trim() !== "" ||
      this.city() !== "all" ||
      this.dateRange() !== "any" ||
      this.category() !== "all",
  );

  resultsPhrase = computed(() => {
    const n = this.filtered().length;
    const c = this.city();
    if (n === 0) return c === "all" ? "No events found" : "No events found in " + c;
    const noun = n === 1 ? "event" : "events";
    return n + " " + noun + " found" + (c === "all" ? " across India" : " in " + c);
  });

  filterSummary = computed(() => {
    const parts = [];
    const d = this.dateOptions.find((o) => o.value === this.dateRange());
    parts.push(d ? d.label : "Any date");
    parts.push(this.category() === "all" ? "All categories" : this.category());
    const q = this.query().trim();
    if (q) parts.push("“" + q + "”");
    return parts.join(" · ");
  });

  setQuery(value) {
    this.query.set(value || "");
  }

  setCity(value) {
    this.city.set(value);
    this.refresh();
  }

  setDate(value) {
    this.dateRange.set(value);
    this.refresh();
  }

  setCategory(value) {
    this.category.set(value);
    this.refresh();
  }

  clearFilters() {
    this.query.set("");
    this.city.set("all");
    this.dateRange.set("any");
    this.category.set("all");
    this.refresh();
  }

  retry() {
    this.loadError.set(false);
    this.refresh();
  }

  refresh() {
    if (this.timer) clearTimeout(this.timer);
    if (this.revealTimer) clearTimeout(this.revealTimer);
    this.loadError.set(false);
    this.loading.set(true);
    this.reveal.set(false);
    this.timer = setTimeout(() => {
      this.loading.set(false);
      this.revealTimer = setTimeout(() => this.reveal.set(true), 30);
    }, 380);
  }

  delayFor(i) {
    return (i < 9 ? i * 45 : 405) + "ms";
  }

  remaining(e) {
    return e.quantity_total - e.quantity_sold;
  }

  isSoldOut(e) {
    return this.remaining(e) <= 0;
  }

  isScarce(e) {
    const left = this.remaining(e);
    return left > 0 && (left <= 60 || left / e.quantity_total <= 0.08);
  }

  statusLabel(e) {
    if (this.isSoldOut(e)) return "Sold out";
    if (this.isScarce(e)) return "Only " + this.remaining(e) + " left";
    return "On sale";
  }

  statusIcon(e) {
    if (this.isSoldOut(e)) return "X";
    if (this.isScarce(e)) return "AlertCircle";
    return "CheckCircle";
  }

  money(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  }

  wf(e) {
    return this.wfByEventId[e.id] || null;
  }

  openEvent(e) {
    this.navigate("event-detail/" + e.id);
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
    if (this.revealTimer) clearTimeout(this.revealTimer);
  }
}
