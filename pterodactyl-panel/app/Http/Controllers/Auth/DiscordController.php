<?php

namespace Pterodactyl\Http\Controllers\Auth;

use GuzzleHttp\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Contracts\Repository\SettingsRepositoryInterface;

class DiscordController extends Controller
{
    private const AUTHORIZE_URL = 'https://discord.com/oauth2/authorize';
    private const TOKEN_URL = 'https://discord.com/api/oauth2/token';
    private const USER_URL = 'https://discord.com/api/users/@me';

    public function __construct(private SettingsRepositoryInterface $settings)
    {
    }

    /**
     * Send the user to Discord to authorize the link.
     */
    public function redirect(Request $request): RedirectResponse
    {
        $clientId = $this->settings->get('settings::strenox:discord:client_id');
        if (!is_string($clientId) || $clientId === '') {
            return redirect('/discord?error=not-configured');
        }

        $state = Str::random(40);
        $request->session()->put('strenox_discord_state', $state);

        $query = http_build_query([
            'client_id' => $clientId,
            'redirect_uri' => route('auth.discord.callback'),
            'response_type' => 'code',
            'scope' => 'identify',
            'state' => $state,
        ]);

        return redirect(self::AUTHORIZE_URL . '?' . $query);
    }

    /**
     * Handle the Discord callback and link the account.
     */
    public function callback(Request $request): RedirectResponse
    {
        $expected = $request->session()->pull('strenox_discord_state');
        if (is_null($expected) || $request->query('state') !== $expected) {
            return redirect('/discord?error=invalid-state');
        }

        if ($request->missing('code')) {
            return redirect('/discord?error=denied');
        }

        $clientId = $this->settings->get('settings::strenox:discord:client_id');
        $clientSecret = $this->settings->get('settings::strenox:discord:client_secret');
        if (!is_string($clientId) || $clientId === '' || !is_string($clientSecret) || $clientSecret === '') {
            return redirect('/discord?error=not-configured');
        }

        try {
            $http = new Client(['timeout' => 10]);

            $token = $http->post(self::TOKEN_URL, [
                'form_params' => [
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                    'grant_type' => 'authorization_code',
                    'code' => $request->query('code'),
                    'redirect_uri' => route('auth.discord.callback'),
                ],
            ]);
            $tokenData = json_decode((string) $token->getBody(), true);

            if (empty($tokenData['access_token'])) {
                return redirect('/discord?error=token-failed');
            }

            $me = $http->get(self::USER_URL, [
                'headers' => ['Authorization' => 'Bearer ' . $tokenData['access_token']],
            ]);
            $discord = json_decode((string) $me->getBody(), true);

            if (empty($discord['id'])) {
                return redirect('/discord?error=profile-failed');
            }

            $request->user()->update([
                'discord_id' => $discord['id'],
                'discord_username' => $discord['username'] ?? null,
                'discord_avatar' => $discord['avatar'] ?? null,
            ]);
        } catch (\Exception) {
            return redirect('/discord?error=request-failed');
        }

        return redirect('/discord?linked=1');
    }
}
