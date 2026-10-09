<?php

namespace Pterodactyl\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StrenoxTicket extends Model
{
    protected $table = 'strenox_tickets';

    protected $fillable = [
        'user_id',
        'subject',
        'status',
        'priority',
    ];

    public static array $validationRules = [
        'user_id' => ['required', 'integer', 'exists:users,id'],
        'subject' => ['required', 'string', 'max:191'],
        'status' => ['required', 'in:open,answered,closed'],
        'priority' => ['required', 'in:low,medium,high'],
    ];

    public function getRouteKeyName(): string
    {
        return 'id';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(StrenoxTicketMessage::class, 'ticket_id')->orderBy('created_at');
    }
}
