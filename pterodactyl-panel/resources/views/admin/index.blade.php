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
    <div class="col-xs-12">
        <div class="box
            @if($version->isLatestPanel())
                box-success
            @else
                box-danger
            @endif
        ">
            <div class="box-header with-border">
                <h3 class="box-title">System Information</h3>
            </div>
            <div class="box-body">
                @if ($version->isLatestPanel())
                    You are running StrenoxCloud Panel version <code>{{ config('app.version') }}</code>. Your panel is up-to-date!
                @else
                    Your panel is <strong>not up-to-date!</strong> You are currently running version <code>{{ config('app.version') }}</code>. Please contact your administrator to update.
                @endif
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xs-6 col-sm-3 text-center">
        <a href="/discord"><button class="btn btn-warning" style="width:100%;"><i class="fa fa-fw fa-support"></i> Get Help <small>(via Discord)</small></button></a>
    </div>
    <div class="col-xs-6 col-sm-3 text-center">
        <a href="/knowledge-base"><button class="btn btn-primary" style="width:100%;"><i class="fa fa-fw fa-link"></i> Documentation</button></a>
    </div>
    <div class="clearfix visible-xs-block">&nbsp;</div>
    <div class="col-xs-6 col-sm-3 text-center">
        <a href="https://github.com/Yun0-vibe/StrenoxTheme" target="_blank"><button class="btn btn-primary" style="width:100%;"><i class="fa fa-fw fa-support"></i> GitHub</button></a>
    </div>
    <div class="col-xs-6 col-sm-3 text-center">
        <a href="/store"><button class="btn btn-success" style="width:100%;"><i class="fa fa-fw fa-money"></i> Upgrade Plan</button></a>
    </div>
</div>
@endsection
