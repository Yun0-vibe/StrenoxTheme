<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;
use Pterodactyl\Services\Discord\StatusWebhookService;

class DiscordController extends ClientApiController
{
    public function __construct(private StatusWebhookService $webhook)
    {
    }

    /**
     * Returns the user's Discord link state plus public integration info.
     * Never exposes panel-wide totals.
     */
    public function status(ClientApiRequest $request): array
    {
        $user = $request->user();

        return [
            'data' => [
                'linked' => !is_null($user->discord_id),
                'username' => $user->discord_username,
                'avatar_url' => !is_null($user->discord_id) && !is_null($user->discord_avatar)
                    ? "https://cdn.discordapp.com/avatars/{$user->discord_id}/{$user->discord_avatar}.png"
                    : null,
                'notifications' => (bool) $user->discord_notifications,
                'role_sync' => (bool) $user->discord_role_sync,
                'invite_url' => $this->webhook->getInviteUrl(),
                'member_count' => $this->webhook->getMemberCount(),
                'oauth_configured' => !is_null($this->webhook->getClientId()),
            ],
        ];
    }

    /**
     * Updates the user's Discord notification preferences.
     */
    public function update(ClientApiRequest $request): array
    {
        $request->validate([
            'notifications' => ['required', 'boolean'],
            'role_sync' => ['required', 'boolean'],
        ]);

        $request->user()->update([
            'discord_notifications' => $request->boolean('notifications'),
            'discord_role_sync' => $request->boolean('role_sync'),
        ]);

        return [
            'data' => [
                'notifications' => (bool) $request->user()->discord_notifications,
                'role_sync' => (bool) $request->user()->discord_role_sync,
            ],
        ];
    }

    /**
     * Unlinks the user's Discord account.
     */
    public function unlink(ClientApiRequest $request): array
    {
        $request->user()->update([
            'discord_id' => null,
            'discord_username' => null,
            'discord_avatar' => null,
        ]);

        return ['data' => ['linked' => false]];
    }
}
