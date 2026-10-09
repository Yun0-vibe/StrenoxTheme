<?php

namespace Pterodactyl\Http\Controllers\Admin\Settings;

use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Prologue\Alerts\AlertsMessageBag;
use Illuminate\Contracts\Console\Kernel;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Services\Discord\StatusWebhookService;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;
use Pterodactyl\Http\Requests\Admin\Settings\DiscordSettingsFormRequest;

class DiscordController extends Controller
{
    /**
     * DiscordController constructor.
     */
    public function __construct(
        private AlertsMessageBag $alert,
        private Kernel $kernel,
        private SettingsRepositoryInterface $settings,
        private StatusWebhookService $webhook,
    ) {
    }

    /**
     * Render the UI for Discord integration settings.
     */
    public function index(): View
    {
        return view('admin.settings.discord');
    }

    /**
     * Handle Discord settings update.
     */
    public function update(DiscordSettingsFormRequest $request): RedirectResponse
    {
        foreach ($request->normalize() as $key => $value) {
            $this->settings->set('settings::' . $key, $value);
        }

        $this->kernel->call('queue:restart');
        $this->alert->success('Discord settings have been updated successfully.')->flash();

        return redirect()->route('admin.settings.discord');
    }

    /**
     * Post the live status embed to the configured webhook right now.
     */
    public function test(): RedirectResponse
    {
        [$ok, $message] = $this->webhook->postStatus(true);

        if ($ok) {
            $this->alert->success($message)->flash();
        } else {
            $this->alert->danger($message)->flash();
        }

        return redirect()->route('admin.settings.discord');
    }
}
