<?php

namespace Pterodactyl\Console\Commands\Strenox;

use Illuminate\Console\Command;
use Pterodactyl\Services\Discord\StatusWebhookService;

class SendDiscordStatusCommand extends Command
{
    protected $signature = 'strenox:discord-status';

    protected $description = 'Post the StrenoxCloud network status embed to the configured Discord webhook.';

    public function handle(StatusWebhookService $service): int
    {
        [$ok, $message] = $service->postStatus();

        if ($ok) {
            $this->info($message);
            return self::SUCCESS;
        }

        $this->warn($message);
        return self::FAILURE;
    }
}
