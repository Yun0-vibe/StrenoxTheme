# StrenoxTheme — StrenoxCloud Theme for Pterodactyl

A full professional theme and addon pack for the [Pterodactyl](https://pterodactyl.io) game server
management panel, built around the **StrenoxCloud** brand identity.

Dark surfaces, signature purple (`#9123D7`), custom layouts, and six addon pages —
plus a real Laravel backend so the addons actually store data.

## Features

### Theme
- StrenoxCloud rebrand: purple accents, dark `#0D0D12` backgrounds, custom glow effects
- Branded login / password / checkpoint pages with logo and gradient backdrop
- Restyled server list (hover glow), server console (accent bar), and navigation
- Full admin-area (AdminLTE) reskin via `strenoxcloud.css`
- Custom favicon, browser theme-color, and page-transition animations

### Addon pages (under `/account/*`)

| Page | Route | What it does |
|------|-------|--------------|
| Knowledge Base | `/account/knowledge-base` | Help categories, search, popular articles |
| Store | `/account/store` | Server plans, credits wallet, live ordering |
| Discord | `/account/discord` | Connect account, role sync, notification toggles |
| Announcements | `/account/announcements` | News feed, served live from the API with offline fallback |
| Tickets | `/account/tickets` | Support tickets with conversation threads and replies |
| Status | `/account/status` | Node status cards, uptime bars, network overview |

### Backend
- Migration with 4 tables: `strenox_announcements`, `strenox_store_orders`,
  `strenox_tickets`, `strenox_ticket_messages`
- Eloquent models with validation (`app/Models/Strenox*.php`)
- 7 client API endpoints under `/api/client/account/strenox/*`
- Typed frontend API client (`resources/scripts/api/strenox.ts`)

## Requirements

- A working Pterodactyl panel (source access, e.g. GitHub Codespace)
- Node.js **22+** and Yarn (frontend build)
- PHP with Composer dependencies installed (migrations)

## Installation

```bash
# 1. Copy the theme files over your panel source
#    (see "What's included" below for the exact file list)

# 2. Build the frontend (Node 22+)
yarn install
yarn build:production

# 3. Run the backend migration
php artisan migrate --force

# 4. Clear caches
php artisan cache:clear
php artisan view:clear
php artisan config:clear

# 5. Set your panel name in .env
APP_NAME=StrenoxCloud
```

Hard-refresh the panel when done. The new pages appear automatically
in the account sub-navigation.

### First announcement (optional)

```bash
php artisan tinker
>>> Pterodactyl\Models\StrenoxAnnouncement::create([
...     'title' => 'Welcome to StrenoxCloud',
...     'content' => 'Our new panel theme is live.',
...     'priority' => 'info',
...     'tag' => 'General',
...     'published' => true,
... ]);
```

## What's included

**Modified panel files** (13):

```
tailwind.config.js
resources/scripts/assets/css/GlobalStylesheet.ts
resources/scripts/components/NavigationBar.tsx
resources/scripts/components/auth/LoginFormContainer.tsx
resources/scripts/components/dashboard/DashboardContainer.tsx
resources/scripts/components/dashboard/ServerRow.tsx
resources/scripts/components/elements/SubNavigation.tsx
resources/scripts/components/server/console/ServerConsoleContainer.tsx
resources/scripts/routers/AuthenticationRouter.tsx
resources/scripts/routers/routes.ts
resources/views/layouts/admin.blade.php
resources/views/templates/wrapper.blade.php
routes/api-client.php
```

**New files** (9 paths):

```
app/Http/Controllers/Api/Client/Strenox/   (Announcement, Store, Ticket controllers)
app/Models/Strenox*.php                    (4 models)
database/migrations/2026_10_09_000001_create_strenox_addon_tables.php
public/favicons/strenoxcloud.svg
public/themes/pterodactyl/css/strenoxcloud.css
resources/scripts/api/strenox.ts
resources/scripts/components/addons/       (7 components + index)
```

## API reference

All endpoints require client authentication.

```
GET  /api/client/account/strenox/announcements
GET  /api/client/account/strenox/store/plans
POST /api/client/account/strenox/store/orders        { plan: droplet|cloud|enterprise }
GET  /api/client/account/strenox/tickets
POST /api/client/account/strenox/tickets             { subject, priority, message }
GET  /api/client/account/strenox/tickets/{ticket}
POST /api/client/account/strenox/tickets/{ticket}/reply   { message }
```

## Customization

- **Colors** — edit the `strenox` palette in `tailwind.config.js`
- **New page** — add a component in `resources/scripts/components/addons/`,
  register it in `resources/scripts/routers/routes.ts`, export it from `addons/index.ts`
- **Store plans** — edit `PLANS` in `StoreController.php` and the `plans` array in `StorePage.tsx`

## Brand

| Token | Value |
|-------|-------|
| Primary | `#9123D7` |
| Primary light | `#A855F7` |
| Primary dark | `#7C3AED` |
| Background | `#0D0D12` |
| Surface | `#16161F` / `#1A1A25` |
| Border | `#2A2A3A` |
| Text | `#E2E2F0` / muted `#8888A8` |

## License

Theme and addon code in this repo are released under the MIT license,
consistent with the upstream Pterodactyl panel.

Pterodactyl itself is a separate project by Pterodactyl Software —
this theme is not affiliated with or endorsed by them.
