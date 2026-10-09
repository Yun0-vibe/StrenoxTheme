<?php

namespace Pterodactyl\Http\Controllers\Admin;

use Illuminate\View\View;
use Pterodactyl\Models\StrenoxTicket;
use Pterodactyl\Http\Controllers\Controller;

class StrenoxTicketController extends Controller
{
    /**
     * Show every support ticket for staff triage. Read-only list —
     * conversations happen in the panel thread each row links into.
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
}
