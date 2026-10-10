<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Illuminate\Http\Request;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AvatarController extends ClientApiController
{
    private const DISK_DIR = 'avatars';

    /**
     * Returns the URL of the user's custom avatar, if one is set.
     */
    public function show(ClientApiRequest $request): array
    {
        return [
            'data' => [
                'avatar_url' => $this->avatarUrl($request),
            ],
        ];
    }

    /**
     * Serves the authenticated user's avatar file.
     */
    public function file(ClientApiRequest $request): BinaryFileResponse
    {
        $path = $request->user()->avatar_path;

        abort_unless(
            is_string($path) && $path !== '' && \Storage::disk('local')->exists($path),
            404
        );

        return response()->file(\Storage::disk('local')->path($path));
    }

    /**
     * Uploads a custom profile picture (square images work best).
     */
    public function store(ClientApiRequest $request): array
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,webp,gif', 'max:2048'],
        ]);

        /** @var \Pterodactyl\Models\User $user */
        $user = $request->user();

        if (is_string($user->avatar_path) && $user->avatar_path !== '') {
            \Storage::disk('local')->delete($user->avatar_path);
        }

        $path = $request->file('avatar')->store(self::DISK_DIR, 'local');
        $user->update(['avatar_path' => $path]);

        return [
            'data' => [
                'avatar_url' => $this->avatarUrl($request),
            ],
        ];
    }

    /**
     * Removes the custom profile picture and falls back to generated avatars.
     */
    public function destroy(ClientApiRequest $request): array
    {
        /** @var \Pterodactyl\Models\User $user */
        $user = $request->user();

        if (is_string($user->avatar_path) && $user->avatar_path !== '') {
            \Storage::disk('local')->delete($user->avatar_path);
        }

        $user->update(['avatar_path' => null]);

        return ['data' => ['avatar_url' => null]];
    }

    private function avatarUrl(ClientApiRequest $request): ?string
    {
        $path = $request->user()->avatar_path;

        if (!is_string($path) || $path === '') {
            return null;
        }

        return url('/api/client/account/strenox/avatar/file');
    }
}
