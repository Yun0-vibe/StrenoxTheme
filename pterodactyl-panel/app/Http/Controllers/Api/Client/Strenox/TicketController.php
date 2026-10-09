<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Strenox;

use Pterodactyl\Models\StrenoxTicket;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Http\Requests\Api\Client\ClientApiRequest;

class TicketController extends ClientApiController
{
    /**
     * Returns the authenticated user's support tickets, newest first.
     */
    public function index(ClientApiRequest $request): array
    {
        $tickets = StrenoxTicket::query()
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return [
            'data' => $tickets->map(fn (StrenoxTicket $t) => [
                'id' => $t->id,
                'subject' => $t->subject,
                'status' => $t->status,
                'priority' => $t->priority,
                'date' => $t->created_at->toDateString(),
            ])->all(),
        ];
    }

    /**
     * Returns every ticket in the system with its owner attached.
     * Root administrators only — this is what powers the staff view.
     * Regular users can never reach this: they only ever see their own
     * tickets through index().
     */
    public function adminIndex(ClientApiRequest $request): array
    {
        if (!$request->user()->root_admin) {
            abort(403, 'Only administrators can view all tickets.');
        }

        $tickets = StrenoxTicket::query()
            ->with('user:id,username,email')
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        return [
            'data' => $tickets->map(fn (StrenoxTicket $t) => [
                'id' => $t->id,
                'subject' => $t->subject,
                'status' => $t->status,
                'priority' => $t->priority,
                'date' => $t->created_at->toDateString(),
                'user_name' => $t->user?->username,
                'user_email' => $t->user?->email,
            ])->all(),
        ];
    }

    /**
     * Creates a new support ticket with the first message.
     */
    public function store(ClientApiRequest $request): array
    {
        $request->validate([
            'subject' => ['required', 'string', 'max:191'],
            'priority' => ['required', 'in:low,medium,high'],
            'message' => ['required', 'string', 'max:65535'],
        ]);

        $ticket = StrenoxTicket::create([
            'user_id' => $request->user()->id,
            'subject' => $request->input('subject'),
            'priority' => $request->input('priority'),
            'status' => 'open',
        ]);

        $ticket->messages()->create([
            'user_id' => $request->user()->id,
            'message' => $request->input('message'),
            'is_staff' => false,
        ]);

        return [
            'data' => [
                'id' => $ticket->id,
                'subject' => $ticket->subject,
                'status' => $ticket->status,
                'priority' => $ticket->priority,
            ],
        ];
    }

    /**
     * Returns a single ticket with all of its messages.
     */
    public function view(ClientApiRequest $request, StrenoxTicket $ticket): array
    {
        $this->authorizeTicket($request, $ticket);

        return [
            'data' => [
                'id' => $ticket->id,
                'subject' => $ticket->subject,
                'status' => $ticket->status,
                'priority' => $ticket->priority,
                'messages' => $ticket->messages->map(fn ($m) => [
                    'id' => $m->id,
                    'message' => $m->message,
                    'is_staff' => (bool) $m->is_staff,
                    'date' => $m->created_at->toDateTimeString(),
                ])->all(),
            ],
        ];
    }

    /**
     * Posts a reply to an open ticket.
     */
    public function reply(ClientApiRequest $request, StrenoxTicket $ticket): array
    {
        $this->authorizeTicket($request, $ticket);

        $request->validate([
            'message' => ['required', 'string', 'max:65535'],
        ]);

        $message = $ticket->messages()->create([
            'user_id' => $request->user()->id,
            'message' => $request->input('message'),
            'is_staff' => (bool) $request->user()->root_admin,
        ]);

        if ($ticket->status === 'closed') {
            $ticket->update(['status' => 'open']);
        }

        return [
            'data' => [
                'id' => $message->id,
                'message' => $message->message,
                'is_staff' => (bool) $message->is_staff,
            ],
        ];
    }

    /**
     * Ensures the ticket belongs to the requesting user (or they are an admin).
     */
    protected function authorizeTicket(ClientApiRequest $request, StrenoxTicket $ticket): void
    {
        if ($ticket->user_id !== $request->user()->id && !$request->user()->root_admin) {
            abort(404);
        }
    }
}
