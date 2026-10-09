<?php

namespace Pterodactyl\Services\Discord;

use Carbon\CarbonImmutable;
use GuzzleHttp\Client;
use Pterodactyl\Models\Node;
use Pterodactyl\Models\Server;
use Pterodactyl\Models\User;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class StatusWebhookService
{
    private const COLOR = 0x9123D7;

    public function __construct(private SettingsRepositoryInterface $settings)
    {
    }

    public function getWebhookUrl(): ?string
    {
        $url = $this->settings->get('settings::strenox:discord:webhook_url');
        return is_string($url) && $url !== '' ? $url : null;
    }

    public function getInviteUrl(): ?string
    {
        $url = $this->settings->get('settings::strenox:discord:invite_url');
        return is_string($url) && $url !== '' ? $url : null;
    }

    public function getGuildId(): ?string
    {
        $id = $this->settings->get('settings::strenox:discord:guild_id');
        return is_string($id) && $id !== '' ? $id : null;
    }

    public function getClientId(): ?string
    {
        $id = $this->settings->get('settings::strenox:discord:client_id');
        return is_string($id) && $id !== '' ? $id : null;
    }

    /**
     * Best-effort guild member count via Discord's public widget API.
     * Returns null when no guild is configured or the widget is disabled.
     */
    public function getMemberCount(): ?int
    {
        $guildId = $this->getGuildId();
        if (is_null($guildId)) {
            return null;
        }

        try {
            $response = (new Client(['timeout' => 8]))->get(
                "https://discord.com/api/guilds/{$guildId}/widget.json"
            );
            $data = json_decode((string) $response->getBody(), true);
            return isset($data['presence_count']) ? (int) $data['presence_count'] : null;
        } catch (\Exception) {
            return null;
        }
    }

    /**
     * Post the current network status embed to the configured webhook.
     *
     * @return array{0: bool, 1: string}
     */
    public function postStatus(bool $manual = false): array
    {
        $webhook = $this->getWebhookUrl();
        if (is_null($webhook)) {
            return [false, 'No Discord webhook URL is configured. Set one in Admin → Settings → Discord.'];
        }

        $nodes = Node::query()->orderBy('name')->get();
        $online = $nodes->where('maintenance_mode', false)->count();

        $nodeLines = $nodes->map(fn (Node $node) => sprintf(
            '%s %s%s',
            $node->maintenance_mode ? '🟡' : '🟢',
            $node->name,
            $node->maintenance_mode ? ' (maintenance)' : ''
        ))->all();

        $payload = [
            'username' => 'StrenoxCloud Status',
            'embeds' => [[
                'title' => '☁️ StrenoxCloud Network Status',
                'description' => $manual
                    ? 'Manual status check requested from the admin panel.'
                    : 'Scheduled network status update.',
                'color' => self::COLOR,
                'timestamp' => CarbonImmutable::now()->toIso8601String(),
                'fields' => [
                    [
                        'name' => '🖥️ Nodes Online',
                        'value' => "{$online}/{$nodes->count()}",
                        'inline' => true,
                    ],
                    [
                        'name' => '👥 Total Users',
                        'value' => (string) User::count(),
                        'inline' => true,
                    ],
                    [
                        'name' => '📦 Total Servers',
                        'value' => (string) Server::count(),
                        'inline' => true,
                    ],
                    [
                        'name' => '📡 Nodes',
                        'value' => count($nodeLines) > 0 ? implode("\n", $nodeLines) : 'No nodes configured.',
                        'inline' => false,
                    ],
                ],
                'footer' => ['text' => 'StrenoxCloud Panel'],
            ]],
        ];

        try {
            (new Client(['timeout' => 10]))->post($webhook, ['json' => $payload]);
        } catch (\Exception $exception) {
            return [false, 'Webhook post failed: ' . $exception->getMessage()];
        }

        return [true, 'Status embed posted to Discord.'];
    }
}
