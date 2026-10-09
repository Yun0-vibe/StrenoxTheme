# StrenoxCloud Theme — Pterodactyl Custom Theme + Addons

A full professional Pterodactyl panel theme built around the StrenoxCloud brand identity.

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#9123D7` | Main brand purple — buttons, accents, links |
| **Primary Light** | `#A855F7` | Hover states, gradients |
| **Primary Dark** | `#7C3AED` | Gradient end, shadows |
| **Background** | `#0D0D12` | Main dark background |
| **Background Light** | `#16161F` | Cards, inputs, secondary surfaces |
| **Background Card** | `#1A1A25` | Elevated cards, content boxes |
| **Border** | `#2A2A3A` | Borders, dividers |
| **Text** | `#E2E2F0` | Primary text |
| **Text Muted** | `#8888A8` | Secondary text, placeholders |

## What's Included

### Theme
- Full Tailwind config with Strenox color palette
- Custom navigation bar with StrenoxCloud branding
- Global stylesheet with dark theme overrides
- Custom scrollbar, selection, focus, and animation styles
- Updated Blade template (title, theme color)

### Addons (6 New Pages)

| Page | Route | Description |
|------|-------|-------------|
| **Knowledge Base** | `/account/knowledge-base` | Help articles, categories, search |
| **Store** | `/account/store` | Server plans with pricing cards, credits wallet, live ordering |
| **Discord** | `/account/discord` | Discord integration, role sync, notifications |
| **Announcements** | `/account/announcements` | Company news from the API with offline fallback |
| **Tickets** | `/account/tickets` | Support tickets with conversation threads and replies |
| **Status** | `/account/status` | Node status, uptime bars, network overview |

### Backend (Laravel)

| File | Purpose |
|------|---------|
| `database/migrations/2026_10_09_000001_create_strenox_addon_tables.php` | `strenox_announcements`, `strenox_store_orders`, `strenox_tickets`, `strenox_ticket_messages` |
| `app/Models/Strenox*.php` | 4 Eloquent models with validation rules |
| `app/Http/Controllers/Api/Client/Strenox/` | Announcement, Store, and Ticket controllers |
| `routes/api-client.php` | 7 new endpoints under `/api/client/account/strenox/*` |
| `resources/scripts/api/strenox.ts` | Typed frontend API client |

### Dashboard Widgets
- Server overview stats (servers, CPU, memory, disk)
- Quick action buttons (Create Server, View Store, Open Ticket, Discord Bot)

## Files Modified

```
tailwind.config.js                                     — Strenox color palette
resources/scripts/components/NavigationBar.tsx         — Branded navbar
resources/scripts/components/elements/SubNavigation.tsx — Restyled sub-nav
resources/scripts/routers/routes.ts                    — 6 addon routes
resources/scripts/routers/AuthenticationRouter.tsx     — Branded auth background + logo
resources/scripts/components/auth/LoginFormContainer.tsx — Dark card, logo, footer
resources/scripts/components/dashboard/DashboardContainer.tsx — Widgets wired in
resources/scripts/components/dashboard/ServerRow.tsx   — Purple hover glow + icon
resources/scripts/components/server/console/ServerConsoleContainer.tsx — Purple title accent
resources/scripts/assets/css/GlobalStylesheet.ts       — Dark bg, transitions, skeleton
resources/views/templates/wrapper.blade.php            — Title & theme color
resources/views/layouts/admin.blade.php                — Admin CSS link + footer
```

## Files Created

```
resources/scripts/components/addons/DashboardWidgets.tsx
resources/scripts/components/addons/KnowledgeBase.tsx
resources/scripts/components/addons/StorePage.tsx
resources/scripts/components/addons/DiscordWidget.tsx
resources/scripts/components/addons/Announcements.tsx
resources/scripts/components/addons/index.ts
resources/scripts/assets/css/GlobalStylesheet.ts (edited, not created)
public/themes/pterodactyl/css/strenoxcloud.css
public/favicons/strenoxcloud.svg
```

## Build & Deploy

```bash
# Install dependencies
yarn install

# Development (hot reload)
yarn watch

# Production build
yarn build:production
```

After building, the compiled assets are in `public/assets/`. Deploy them to your Pterodactyl panel's `public/assets/` directory.

## Applying the Theme

1. Copy the built `public/assets/` files to your panel
2. Update your `.env` to set `APP_NAME=StrenoxCloud`
3. Clear cache: `php artisan cache:clear && php artisan view:clear`
4. Restart your queue workers

## Customization

### Change Colors
Edit `tailwind.config.js` and update the `strenox` color object.

### Add New Pages
1. Create component in `resources/scripts/components/addons/`
2. Add route in `resources/scripts/routers/routes.ts`
3. Add export in `resources/scripts/components/addons/index.ts`

### Modify Navigation
Edit `resources/scripts/components/NavigationBar.tsx` and `SubNavigation.tsx`.
