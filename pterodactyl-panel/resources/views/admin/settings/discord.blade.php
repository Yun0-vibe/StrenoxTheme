@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'discord'])

@section('title')
    Settings &raquo; Discord
@endsection

@section('content-header')
    <h1>Discord Settings<small>Connect StrenoxCloud to your Discord server.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.settings') }}">Settings</a></li>
        <li class="active">Discord</li>
    </ol>
@endsection

@section('content')
    @yield('settings::nav')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Status Webhook</h3>
                </div>
                <form action="{{ route('admin.settings.discord') }}" method="POST">
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label class="control-label">Status Webhook URL</label>
                                <div>
                                    <input type="text" class="form-control" name="strenox:discord:webhook_url" value="{{ old('strenox:discord:webhook_url', config('strenox.discord.webhook_url')) }}" placeholder="https://discord.com/api/webhooks/…" />
                                    <p class="text-muted"><small>Hourly network stats (nodes, users, servers) are posted here. Only admins configure this — the URL is never shown to users.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="control-label">Discord Invite URL</label>
                                <div>
                                    <input type="text" class="form-control" name="strenox:discord:invite_url" value="{{ old('strenox:discord:invite_url', config('strenox.discord.invite_url')) }}" placeholder="https://discord.gg/…" />
                                    <p class="text-muted"><small>Shown on the panel Discord page with a copy button.</small></p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">Guild (Server) ID</label>
                                <div>
                                    <input type="text" class="form-control" name="strenox:discord:guild_id" value="{{ old('strenox:discord:guild_id', config('strenox.discord.guild_id')) }}" placeholder="1234567890" />
                                    <p class="text-muted"><small>Used for the live member count. Enable the Server Widget in Discord for this to work.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">OAuth Client ID</label>
                                <div>
                                    <input type="text" class="form-control" name="strenox:discord:client_id" value="{{ old('strenox:discord:client_id', config('strenox.discord.client_id')) }}" />
                                    <p class="text-muted"><small>From your Discord application. Enables "Connect with Discord" on the panel.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">OAuth Client Secret</label>
                                <div>
                                    <input type="password" class="form-control" name="strenox:discord:client_secret" value="{{ old('strenox:discord:client_secret', config('strenox.discord.client_secret')) }}" autocomplete="new-password" />
                                    <p class="text-muted"><small>Never shared. Add <code>{{ route('auth.discord.callback') }}</code> as a redirect URL in your Discord app.</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        {!! csrf_field() !!}
                        <button type="submit" name="_method" value="PATCH" class="btn btn-sm btn-primary pull-right">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Send Status Now</h3>
                </div>
                <div class="box-body">
                    <p class="text-muted">Post the live network embed to the webhook immediately, without waiting for the hourly schedule. For automatic posts, run <code>php artisan schedule:run</code> every minute via cron.</p>
                </div>
                <div class="box-footer">
                    <form action="{{ route('admin.settings.discord.test') }}" method="POST" style="display:inline;">
                        {!! csrf_field() !!}
                        <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-fw fa-paper-plane"></i> Send Status Embed</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
