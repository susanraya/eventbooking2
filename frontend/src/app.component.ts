import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, type Routes } from "@angular/router";

import { IconComponent } from "@/lib/ui";
import AuthScreen from "@/screens/auth.component";
import EventsScreen from "@/screens/events.component";
import EventDetailScreen from "@/screens/event-detail.component";
import MyTicketsScreen from "@/screens/my-tickets.component";
import OrganizerDashboardScreen from "@/screens/organizer-dashboard.component";
import AccountSettingsScreen from "@/screens/account-settings.component";

/** The app's menu, drawn around every screen except the ones routed outside it. */
@Component({
  selector: "app-shell",
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <header
        class="border-b"
        style="background-color: var(--brand-surface); border-color: var(--brand-border)"
      >
        <div class="flex items-center gap-6 px-6 py-2">
          <p class="shrink-0 text-sm font-semibold" style="font-family: var(--brand-font-heading)">
            TicketSetu
          </p>
        <nav aria-label="App menu" class="flex flex-wrap items-center gap-1">
          <a
            routerLink="/events"
            routerLinkActive
            #link0="routerLinkActive"
            [class]="linkClass(link0.isActive)"
          >
            <ui-icon name="Search" [size]="16" />
            Browse events
          </a>
          <a
            routerLink="/my-tickets"
            routerLinkActive
            #link1="routerLinkActive"
            [class]="linkClass(link1.isActive)"
          >
            My tickets
          </a>
          <a
            routerLink="/organizer-dashboard"
            routerLinkActive
            #link2="routerLinkActive"
            [class]="linkClass(link2.isActive)"
          >
            <ui-icon name="Home" [size]="16" />
            Organizer dashboard
          </a>
          <a
            routerLink="/account-settings"
            routerLinkActive
            #link3="routerLinkActive"
            [class]="linkClass(link3.isActive)"
          >
            <ui-icon name="User" [size]="16" />
            Account
          </a>
        </nav>
        </div>
      </header>
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppShellComponent {
  protected linkClass(active: boolean): string {
    return [
      "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
    ].join(" ");
  }
}

// Screens shown before sign-in, or hidden from the menu, are routed outside it.
export const routes: Routes = [
  { path: "auth", component: AuthScreen },
  {
    path: "",
    component: AppShellComponent,
    children: [
      { path: "events", component: EventsScreen },
      { path: "event-detail", component: EventDetailScreen },
      { path: "my-tickets", component: MyTicketsScreen },
      { path: "organizer-dashboard", component: OrganizerDashboardScreen },
      { path: "account-settings", component: AccountSettingsScreen },
    ],
  },
  { path: "**", redirectTo: "/auth" },
];

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
