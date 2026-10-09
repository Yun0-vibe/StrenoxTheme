<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Models\Node;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class NodeStatusController extends ClientApiController
{
    /**
     * Returns node reachability info for the public status page.
     * Deliberately excludes all panel-wide totals (users, servers) so
     * regular users never see data that belongs to admins.
     */
    public function __invoke(ClientApiRequest $request): array
    {
        $nodes = Node::query()->with('location')->orderBy('name')->get();

        return [
            'data' => $nodes->map(fn (Node $node) => [
                'name' => $node->name,
                'location' => $node->location?->short ?? '',
                'maintenance' => (bool) $node->maintenance_mode,
                'status' => $node->maintenance_mode ? 'maintenance' : 'operational',
            ])->all(),
        ];
    }
}
