<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Models\StrenoxStoreOrder;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class StoreController extends ClientApiController
{
    /**
     * The plans available for purchase. Prices are in USD per month.
     */
    public const PLANS = [
        'droplet' => ['name' => 'Droplet', 'price' => '5.00'],
        'cloud' => ['name' => 'Cloud', 'price' => '12.00'],
        'enterprise' => ['name' => 'Enterprise', 'price' => '29.00'],
        'topup_5' => ['name' => 'Credit Top-Up $5', 'price' => '5.00'],
        'topup_10' => ['name' => 'Credit Top-Up $10', 'price' => '10.00'],
        'topup_25' => ['name' => 'Credit Top-Up $25', 'price' => '25.00'],
    ];

    /**
     * Returns the available store plans.
     */
    public function index(ClientApiRequest $request): array
    {
        return ['data' => self::PLANS];
    }

    /**
     * Creates a pending store order for the authenticated user.
     */
    public function store(ClientApiRequest $request): array
    {
        $request->validate([
            'plan' => ['required', 'string', 'in:' . implode(',', array_keys(self::PLANS))],
        ]);

        $plan = self::PLANS[$request->input('plan')];

        $order = StrenoxStoreOrder::create([
            'user_id' => $request->user()->id,
            'plan' => $plan['name'],
            'amount' => $plan['price'],
            'status' => 'pending',
        ]);

        return [
            'data' => [
                'id' => $order->id,
                'plan' => $order->plan,
                'amount' => $order->amount,
                'status' => $order->status,
            ],
        ];
    }

    /**
     * Returns the authenticated user's store orders, newest first.
     */
    public function orders(ClientApiRequest $request): array
    {
        $orders = StrenoxStoreOrder::query()
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->limit(20)
            ->get();

        return [
            'data' => $orders->map(fn (StrenoxStoreOrder $o) => [
                'id' => $o->id,
                'plan' => $o->plan,
                'amount' => $o->amount,
                'status' => $o->status,
                'date' => $o->created_at->toDateString(),
            ])->all(),
        ];
    }
}
