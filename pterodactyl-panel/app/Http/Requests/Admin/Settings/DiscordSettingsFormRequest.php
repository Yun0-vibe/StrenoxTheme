<?php

namespace Pterodactyl\Http\Requests\Admin\Settings;

use Pterodactyl\Http\Requests\Admin\AdminFormRequest;

class DiscordSettingsFormRequest extends AdminFormRequest
{
    public function rules(): array
    {
        return [
            'strenox:discord:webhook_url' => 'nullable|url|max:191',
            'strenox:discord:invite_url' => 'nullable|url|max:191',
            'strenox:discord:client_id' => 'nullable|string|max:191',
            'strenox:discord:client_secret' => 'nullable|string|max:191',
            'strenox:discord:guild_id' => 'nullable|string|max:191',
            'strenox:discord:role_sync_enabled' => 'nullable|in:0,1',
        ];
    }

    public function attributes(): array
    {
        return [
            'strenox:discord:webhook_url' => 'Status Webhook URL',
            'strenox:discord:invite_url' => 'Discord Invite URL',
            'strenox:discord:client_id' => 'Discord Client ID',
            'strenox:discord:client_secret' => 'Discord Client Secret',
            'strenox:discord:guild_id' => 'Discord Guild ID',
            'strenox:discord:role_sync_enabled' => 'Role Synchronization',
        ];
    }
}
