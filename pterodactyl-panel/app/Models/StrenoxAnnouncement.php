<?php

namespace Pterodactyl\Models;

class StrenoxAnnouncement extends Model
{
    protected $table = 'strenox_announcements';

    protected $fillable = [
        'title',
        'content',
        'priority',
        'tag',
        'published',
    ];

    protected $casts = [
        'published' => 'bool',
    ];

    public static array $validationRules = [
        'title' => ['required', 'string', 'max:191'],
        'content' => ['required', 'string'],
        'priority' => ['required', 'in:info,warning,critical'],
        'tag' => ['nullable', 'string', 'max:64'],
        'published' => ['boolean'],
    ];

    public function getRouteKeyName(): string
    {
        return 'id';
    }
}
