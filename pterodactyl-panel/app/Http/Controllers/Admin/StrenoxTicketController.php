<?php

namespace Pterodactyl\Http\Controllers\Admin;

use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Pterodactyl\Models\StrenoxTicket;
use Pterodactyl\Http\Controllers\Controller;

class StrenoxTicketController extends Controller
{
    /**
     * Show every support ticket for staff triage.
     */
    public function index(): View
    {
        $tickets = StrenoxTicket::query()
            ->with('user:id,username,email')
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        return view('admin.strenox.tickets', ['tickets' => $tickets]);
    }

    /**
     * Show a single ticket thread for staff triage.
     */
    public function view(StrenoxTicket $ticket): View
    {
        $ticket->load(['user:id,username,email', 'messages.user:id,username']);

        return view('admin.strenox.ticket-view', ['ticket' => $ticket]);
    }

    /**
     * Post a staff reply. Owner's own messages never count as staff.
     */
    public function reply(Request $request, StrenoxTicket $ticket): RedirectResponse
    {
        $request->validate([
            'message' => ['required', 'string', 'max:65535'],
        ]);

        $user = $request->user();
        $isStaff = (bool) $user->root_admin && $ticket->user_id !== $user->id;

        $ticket->messages()->create([
            'user_id' => $user->id,
            'message' => $request->input('message'),
            'is_staff' => $isStaff,
        ]);

        if ($isStaff && $ticket->status === 'open') {
            $ticket->update(['status' => 'answered']);
        } elseif (!$isStaff && $ticket->status !== 'open') {
            $ticket->update(['status' => 'open']);
        }

        return redirect()->route('admin.strenox.ticket.view', $ticket->id);
    }

    /**
     * Change a ticket's status (open / answered / closed).
     */
    public function status(Request $request, StrenoxTicket $ticket): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'in:open,answered,closed'],
        ]);

        $ticket->update(['status' => $request->input('status')]);

        return redirect()->route('admin.strenox.ticket.view', $ticket->id);
    }
}
