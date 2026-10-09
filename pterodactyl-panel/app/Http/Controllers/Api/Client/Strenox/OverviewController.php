<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Models\StrenoxTicket;
use Pterodactyl\Models\StrenoxAnnouncement;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class OverviewController extends ClientApiController
{
    /**
     * Returns small home-page counters in a single request so the
     * command center does not fan out parallel API calls against the
     * single-threaded development server. All values are scoped to the
     * authenticated user, except published announcement counts.
     */
    public function __invoke(ClientApiRequest $request): array
    {
        return [
            'data' => [
                'open_tickets' => StrenoxTicket::query()
                    ->where('user_id', $request->user()->id)
                    ->where('status', 'open')
                    ->count(),
                'announcements' => StrenoxAnnouncement::query()
                    ->where('published', true)
                    ->count(),
            ],
        ];
    }
}
