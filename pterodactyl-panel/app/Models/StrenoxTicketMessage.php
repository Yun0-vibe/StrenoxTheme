<?php

namespace Pterodactyl\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StrenoxTicketMessage extends Model
{
    protected $table = 'strenox_ticket_messages';

    protected $fillable = [
        'ticket_id',
        'user_id',
        'message',
        'is_staff',
    ];

    protected $casts = [
        'is_staff' => 'bool',
    ];

    public static array $validationRules = [
        'ticket_id' => ['required', 'integer', 'exists:strenox_tickets,id'],
        'user_id' => ['required', 'integer', 'exists:users,id'],
        'message' => ['required', 'string', 'max:65535'],
        'is_staff' => ['boolean'],
    ];

    public function getRouteKeyName(): string
    {
        return 'id';
    }

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(StrenoxTicket::class, 'ticket_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
