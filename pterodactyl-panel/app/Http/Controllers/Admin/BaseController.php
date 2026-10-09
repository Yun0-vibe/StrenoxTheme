<?php

namespace Pterodactyl\Http\Controllers\Admin;

use Illuminate\View\View;
use Pterodactyl\Models\Location;
use Pterodactyl\Models\Node;
use Pterodactyl\Models\Server;
use Pterodactyl\Models\User;
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
        ]);
    }
}
