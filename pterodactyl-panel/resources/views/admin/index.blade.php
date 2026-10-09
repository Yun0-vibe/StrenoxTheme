@extends('layouts.admin')

@section('title')
    Administration
@endsection

@section('content-header')
    <h1>Administrative Overview<small>A quick glance at your system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Index</li>
    </ol>
@endsection

@section('content')
<div class="strenox-hero">
    <img src="/favicons/strenoxcloud-logo.png" alt="StrenoxCloud">
    <div class="strenox-hero-text">
        <h2>StrenoxCloud Control</h2>
        <p>Panel <code>{{ config('app.version') }}</code> · {{ $serverCount }} servers · {{ $userCount }} users · {{ $nodeCount }} nodes</p>
    </div>
    <div class="strenox-hero-actions">
        <a href="{{ route('admin.servers.new') }}" class="btn btn-primary"><i class="fa fa-fw fa-server"></i> New Server</a>
        <a href="{{ route('admin.users.new') }}" class="btn btn-primary"><i class="fa fa-fw fa-user"></i> New User</a>
        <a href="{{ route('admin.nodes.new') }}" class="btn btn-primary"><i class="fa fa-fw fa-sitemap"></i> New Node</a>
        <a href="{{ route('admin.settings.discord') }}" class="btn btn-default"><i class="fa fa-fw fa-comments"></i> Discord</a>
    </div>
</div>
<div class="row">
    <div class="col-sm-6 col-md-3">
        <a href="{{ route('admin.servers') }}" style="text-decoration:none;">
            <div class="strenox-stat">
                <div class="strenox-stat-icon"><i class="fa fa-server"></i></div>
                <div>
                    <div class="strenox-stat-value">{{ $serverCount }}</div>
                    <div class="strenox-stat-label">Servers</div>
                </div>
            </div>
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="{{ route('admin.users') }}" style="text-decoration:none;">
            <div class="strenox-stat">
                <div class="strenox-stat-icon"><i class="fa fa-users"></i></div>
                <div>
                    <div class="strenox-stat-value">{{ $userCount }}</div>
                    <div class="strenox-stat-label">Users</div>
                </div>
            </div>
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="{{ route('admin.nodes') }}" style="text-decoration:none;">
            <div class="strenox-stat">
                <div class="strenox-stat-icon"><i class="fa fa-sitemap"></i></div>
                <div>
                    <div class="strenox-stat-value">{{ $nodeCount }}</div>
                    <div class="strenox-stat-label">Nodes</div>
                </div>
            </div>
        </a>
    </div>
    <div class="col-sm-6 col-md-3">
        <a href="{{ route('admin.locations') }}" style="text-decoration:none;">
            <div class="strenox-stat">
                <div class="strenox-stat-icon"><i class="fa fa-globe"></i></div>
                <div>
                    <div class="strenox-stat-value">{{ $locationCount }}</div>
                    <div class="strenox-stat-label">Locations</div>
                </div>
            </div>
        </a>
    </div>
</div>
<div class="row">
    <div class="col-md-8">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">User Growth <small style="color:#8888A8;">· signups per day, last 14 days</small></h3>
            </div>
            <div class="box-body">
                <div class="strenox-chart-wrap"><canvas id="sxUsersChart" height="110"></canvas></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Servers by Status</h3>
            </div>
            <div class="box-body">
                <div class="strenox-chart-wrap"><canvas id="sxServersChart" height="168"></canvas></div>
            </div>
        </div>
    </div>
</div>
<script src="/themes/pterodactyl/vendor/chartjs/chart.min.js"></script>
<script>
(function () {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.global.defaultFontColor = '#8888A8';
    Chart.defaults.global.defaultFontFamily = "'Inter', sans-serif";

    var usersEl = document.getElementById('sxUsersChart');
    if (usersEl) {
        new Chart(usersEl, {
            type: 'line',
            data: {
                labels: {!! json_encode($userGrowth['labels']) !!},
                datasets: [{
                    data: {!! json_encode($userGrowth['data']) !!},
                    borderColor: '#A855F7',
                    backgroundColor: 'rgba(145,35,215,0.16)',
                    pointBackgroundColor: '#A855F7',
                    pointBorderColor: '#fff',
                    pointRadius: 3,
                    borderWidth: 2,
                    lineTension: 0.35,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                    xAxes: [{ gridLines: { display: false }, ticks: { maxTicksLimit: 7 } }],
                    yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 }, gridLines: { color: 'rgba(255,255,255,0.06)' } }]
                }
            }
        });
    }

    var serversEl = document.getElementById('sxServersChart');
    if (serversEl) {
        new Chart(serversEl, {
            type: 'doughnut',
            data: {
                labels: {!! json_encode($serverStatus['labels']) !!},
                datasets: [{
                    data: {!! json_encode($serverStatus['data']) !!},
                    backgroundColor: ['#9123D7', '#22C55E', '#F59E0B', '#EF4444', '#3B82F6'],
                    borderColor: '#1A1A25',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12 } },
                cutoutPercentage: 62
            }
        });
    }
})();
</script>
<div class="row">
    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Latest Servers</h3>
                <div class="box-tools pull-right">
                    <a href="{{ route('admin.servers') }}" class="btn btn-xs btn-primary">View All</a>
                </div>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <tbody>
                        @forelse ($latestServers as $server)
                            <tr>
                                <td><a href="{{ route('admin.servers.view', $server->id) }}">{{ $server->name }}</a></td>
                                <td class="text-right text-muted">{{ $server->created_at->diffForHumans() }}</td>
                            </tr>
                        @empty
                            <tr><td class="text-center text-muted">No servers yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Latest Users</h3>
                <div class="box-tools pull-right">
                    <a href="{{ route('admin.users') }}" class="btn btn-xs btn-primary">View All</a>
                </div>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <tbody>
                        @forelse ($latestUsers as $user)
                            <tr>
                                <td><a href="{{ route('admin.users.view', $user->id) }}">{{ $user->username }}</a></td>
                                <td class="text-muted">{{ $user->email }}</td>
                                <td class="text-right text-muted">{{ $user->created_at->diffForHumans() }}</td>
                            </tr>
                        @empty
                            <tr><td class="text-center text-muted">No users yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Recent Activity</h3>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <tbody>
                        @forelse ($recentActivity as $log)
                            <tr>
                                <td>
                                    <span class="strenox-event">{{ ucfirst(str_replace([':', '_', '.'], ' ', $log->event)) }}</span>
                                    <span class="text-muted">· {{ $log->actor->username ?? 'System' }}</span>
                                </td>
                                <td class="text-right text-muted" style="white-space:nowrap;">{{ $log->timestamp->diffForHumans() }}</td>
                            </tr>
                        @empty
                            <tr><td class="text-center text-muted">No activity recorded yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Support Tickets @if($openTickets)<span class="label label-warning" style="margin-left:6px;">{{ $openTickets }} open</span>@endif</h3>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <tbody>
                        @forelse ($latestTickets as $ticket)
                            <tr>
                                <td><span class="text-muted">#{{ $ticket->id }}</span> {{ Str::limit($ticket->subject, 42) }}</td>
                                <td class="text-right">
                                    @if ($ticket->status === 'open')
                                        <span class="label label-success">Open</span>
                                    @elseif ($ticket->status === 'answered')
                                        <span class="label label-info">Answered</span>
                                    @else
                                        <span class="label label-default">Closed</span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr><td class="text-center text-muted">No tickets yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Fleet Status</h3>
                <div class="box-tools pull-right">
                    <a href="{{ route('admin.nodes') }}" class="btn btn-xs btn-primary">Manage Nodes</a>
                </div>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Node</th>
                            <th>Address</th>
                            <th class="text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($fleetNodes as $node)
                            <tr>
                                <td><a href="{{ route('admin.nodes.view', $node->id) }}">{{ $node->name }}</a></td>
                                <td class="text-muted">{{ $node->fqdn }}</td>
                                <td class="text-right">
                                    @if ($node->maintenance_mode)
                                        <span class="label label-warning">Maintenance</span>
                                    @else
                                        <span class="label label-success">Operational</span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="3" class="text-center text-muted">No nodes configured yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
