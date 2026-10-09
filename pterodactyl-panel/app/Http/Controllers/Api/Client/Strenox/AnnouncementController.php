<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Models\StrenoxAnnouncement;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class AnnouncementController extends ClientApiController
{
    /**
     * Returns all published StrenoxCloud announcements, newest first.
     */
    public function __invoke(ClientApiRequest $request): array
    {
        $announcements = StrenoxAnnouncement::query()
            ->where('published', true)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return [
            'data' => $announcements->map(fn (StrenoxAnnouncement $a) => [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'priority' => $a->priority,
                'tag' => $a->tag,
                'date' => $a->created_at->toDateString(),
            ])->all(),
        ];
    }
}
