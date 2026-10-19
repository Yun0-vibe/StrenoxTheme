# YETIMC PANEL — Pterodactyl Custom Theme + Addons

A full Pterodactyl-based game server panel with the **YETIMC PANEL** theme,
custom pages (Knowledge Base, Store, Discord, Announcements, Tickets, Status),
a Laravel addon backend, and a reskinned admin area.

## Brand

| Token | Value |
|-------|-------|
| Primary accent | `#2B9DE8` (Yeti blue) |
| Accent light | `#55B8F0` |
| Accent dark | `#1E86D6` |
| Background | `#07070D` / `#101016` |
| Surface | `#16161F` / `#1A1A25` |
| Text | `#E2E2F0` · muted `#9AA1B8` |
| Logo | `/favicons/yetimc-logo.png` (and `.webp`) |

## What's Included

### Theme
- Blue accent palette across every component (gradients, glows, focus rings)
- Full sidebar shell (Overview / Cloud / Account Settings, mobile drawer)
- Slim topbar with search, account, logout
- Animated aurora background (drifting blobs, starfield, dotted globe arc)
- Display font (Anton) for wordmarks; Inter for UI text
- Custom terminal, file manager, stat blocks, modal, and table styling
- Staggered entrances and hover motion (disabled under reduced-motion)

### Addons (client pages)
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Stats + actions + servers + latest news |
| Servers | `/servers` | Server list |
| Support | `/tickets` | Own tickets, chat-style threads |
| Guides | `/knowledge-base` | Searchable knowledge base |
| Store | `/store` | Plans, credits, order history |
| Discord | `/discord` | Link account, prefs, invite |
| News | `/announcements` | Announcement feed |

### Admin
- Overview with analytics charts (Chart.js), activity, tickets
- News manager (publish / hide / delete)
- Ticket table: clickable rows, inline search + status filter, chat threads,
  status controls
- Settings → Discord tab: webhook URL, invite URL, guild ID, OAuth keys,
  role-sync switch, Send-status-now test

## Requirements

- PHP 8.2/8.3 with `bcmath`, `ctype`, `curl`, `fileinfo`, `json`, `mbstring`,
  `openssl`, `pdo`, `pdo_mysql`, `tokenizer`, `xml`, `zip`, `sodium`
- Composer 2.x · MySQL/MariaDB 8+/10.6+ · Redis 6+ · Node 22+ · Yarn 1.22+

## Install

```bash
cd pterodactyl-panel
composer install --no-dev --optimize-autoloader
php artisan key:generate

# .env essentials
APP_NAME="YETIMC PANEL"
APP_URL=https://your-domain.com
DB_HOST=127.0.0.1
DB_DATABASE=panel
DB_USERNAME=pterodactyl
DB_PASSWORD=secret
REDIS_HOST=127.0.0.1

php artisan migrate --force
php artisan p:user:make --email=you@example.com --username=admin \
  --name-first=YETIMC --name-last=Admin --password=<strong-password> --admin=1

yarn install
yarn build:production
php artisan view:clear && php artisan config:clear
```

Serve via Nginx/Apache in production (queue worker + scheduler cron recommended);
for testing: `php artisan serve --host=0.0.0.0 --port=8000`.

## Updating

```bash
git pull
php artisan migrate --force
yarn build:production
php artisan view:clear && php artisan config:clear
# restart php-fpm / queue workers / artisan serve afterwards
```

Always restart long-running processes after pulling — they keep old code.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Blank page | Rebuild assets fully (`yarn build:production`, don't interrupt) |
| Old CSS after update | Hard refresh (Ctrl+Shift+R) + `php artisan view:clear` |
| localhost links | Set `APP_URL`, `config:clear`, restart server |
| Avatar upload fails | Use JPEG/PNG/WebP/GIF under 2 MB (server-side GD rules removed) |

## License

Theme & addon code: MIT. Pterodactyl © Pterodactyl Software — this theme is
not affiliated with or endorsed by them.
