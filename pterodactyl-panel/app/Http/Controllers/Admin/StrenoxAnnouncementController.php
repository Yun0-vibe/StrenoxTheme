<?php

namespace Pterodactyl\Http\Controllers\Admin;

use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Pterodactyl\Models\StrenoxAnnouncement;
use Pterodactyl\Http\Controllers\Controller;

class StrenoxAnnouncementController extends Controller
{
    /**
     * List every announcement with management controls.
     */
    public function index(): View
    {
        $announcements = StrenoxAnnouncement::query()
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        return view('admin.strenox.announcements', ['announcements' => $announcements]);
    }

    /**
     * Publish a new announcement for the panel news feed.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:191'],
            'content' => ['required', 'string'],
            'priority' => ['required', 'in:info,warning,critical'],
            'tag' => ['nullable', 'string', 'max:64'],
        ]);

        StrenoxAnnouncement::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'priority' => $request->input('priority'),
            'tag' => $request->input('tag'),
            'published' => true,
        ]);

        return redirect()->route('admin.strenox.announcements');
    }

    /**
     * Toggle an announcement between published and hidden.
     */
    public function toggle(StrenoxAnnouncement $announcement): RedirectResponse
    {
        $announcement->update(['published' => !$announcement->published]);

        return redirect()->route('admin.strenox.announcements');
    }

    /**
     * Delete an announcement permanently.
     */
    public function destroy(StrenoxAnnouncement $announcement): RedirectResponse
    {
        $announcement->delete();

        return redirect()->route('admin.strenox.announcements');
    }
}
