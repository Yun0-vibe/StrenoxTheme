<?php

namespace Pterodactyl\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StrenoxStoreOrder extends Model
{
    protected $table = 'strenox_store_orders';

    protected $fillable = [
        'user_id',
        'plan',
        'amount',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public static array $validationRules = [
        'user_id' => ['required', 'integer', 'exists:users,id'],
        'plan' => ['required', 'string', 'max:64'],
        'amount' => ['required', 'numeric', 'min:0'],
        'status' => ['required', 'in:pending,completed,cancelled'],
    ];

    public function getRouteKeyName(): string
    {
        return 'id';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
