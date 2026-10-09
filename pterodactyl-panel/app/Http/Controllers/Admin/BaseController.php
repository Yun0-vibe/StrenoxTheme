<?php

namespace Pterodactyl\Http\Controllers\Admin;

use Illuminate\View\View;
use Illuminate\Support\Carbon;
use Pterodactyl\Models\Location;
use Pterodactyl\Models\Node;
use Pterodactyl\Models\Server;
use Pterodactyl\Models\User;
use Pterodactyl\Models\ActivityLog;
use Pterodactyl\Models\StrenoxTicket;
use Pterodactyl\Http\Controllers\Controller;
use Pterodactyl\Services\Helpers\SoftwareVersionService;

class BaseController extends Controller
{
    /**
     * BaseController constructor.
     */
    public function __construct(private SoftwareVersionService $version)
    {
    }

    /**
     * Return the admin index view.
     */
    public function index(): View
    {
        return view('admin.index', [
            'version' => $this->version,
            'userCount' => User::count(),
            'serverCount' => Server::count(),
            'nodeCount' => Node::count(),
            'locationCount' => Location::count(),
            'latestUsers' => User::query()->orderByDesc('created_at')->limit(5)->get(['id', 'username', 'email', 'created_at']),
            'latestServers' => Server::query()->orderByDesc('created_at')->limit(5)->get(['id', 'name', 'created_at']),
            'fleetNodes' => Node::query()->orderBy('name')->get(['id', 'name', 'fqdn', 'maintenance_mode']),
            'userGrowth' => $this->userGrowth(),
            'serverStatus' => $this->serverStatus(),
            'recentActivity' => $this->recentActivity(),
            'openTickets' => StrenoxTicket::query()->where('status', 'open')->count(),
            'latestTickets' => StrenoxTicket::query()->orderByDesc('created_at')->limit(5)->get(['id', 'subject', 'status', 'created_at']),
        ]);
    }

    /**
     * New user signups per day for the last 14 days, oldest first.
     *
     * @return array{labels: string[], data: int[]}
     */
    protected function userGrowth(): array
    {
        $labels = [];
        $data = [];
        for ($i = 13; $i >= 0; $i--) {
            $day = Carbon::today()->subDays($i);
            $labels[] = $day->format('M j');
            $data[] = User::query()
                ->whereDate('created_at', $day)
                ->count();
        }

        return ['labels' => $labels, 'data' => $data];
    }

    /**
     * Server counts grouped by status for the doughnut chart.
     *
     * @return array{labels: string[], data: int[]}
     */
    protected function serverStatus(): array
    {
        $rows = Server::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->all();

        $labels = [];
        $data = [];
        foreach ($rows as $status => $total) {
            $labels[] = ucfirst(str_replace('_', ' ', (string) $status ?: 'active'));
            $data[] = (int) $total;
        }

        if (empty($data)) {
            $labels = ['No servers'];
            $data = [1];
        }

        return ['labels' => $labels, 'data' => $data];
    }

    /**
     * Latest panel activity with the actor attached.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function recentActivity()
    {
        return ActivityLog::query()
            ->with('actor')
            ->orderByDesc('timestamp')
            ->limit(8)
            ->get();
    }
}
