<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        @hasSection('title')
        <title>@yield('title') · StrenoxCloud</title>
        @else
        <title>StrenoxCloud</title>
        @endif
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <meta name="_token" content="{{ csrf_token() }}">

        <link rel="apple-touch-icon" href="/favicons/strenoxcloud-logo.png">
        <link rel="icon" type="image/png" href="/favicons/strenoxcloud-logo.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicons/strenoxcloud-logo.png" sizes="16x16">
        <link rel="mask-icon" href="/favicons/strenoxcloud-logo.png" color="#9123D7">
        <link rel="shortcut icon" href="/favicons/strenoxcloud-logo.png">
        <meta name="msapplication-config" content="/favicons/browserconfig.xml">
        <meta name="theme-color" content="#9123D7">
        <meta name="color-scheme" content="dark">
        <meta name="color-scheme" content="dark">

        @include('layouts.scripts')

        @section('scripts')
            {!! Theme::css('vendor/select2/select2.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/bootstrap/bootstrap.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/adminlte/admin.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/adminlte/colors/skin-blue.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/sweetalert/sweetalert.min.css?t={cache-version}') !!}
            {!! Theme::css('vendor/animate/animate.min.css?t={cache-version}') !!}
            {!! Theme::css('css/pterodactyl.css?t={cache-version}') !!}
            {!! Theme::css('css/strenoxcloud.css?t=v' . filemtime(public_path('themes/pterodactyl/css/strenoxcloud.css'))) !!}

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        @show
    </head>
    <body class="hold-transition skin-blue fixed sidebar-mini strenox-admin">
        <div class="wrapper">
            <button class="sx-fab-toggle" data-toggle="push-menu" aria-label="Toggle navigation">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
            </button>
            <aside class="main-sidebar sx-sidebar">
                <section class="sidebar">
                    <a href="{{ route('admin.index') }}" class="sx-brand">
                        <img src="/favicons/strenoxcloud-logo.png" alt="StrenoxCloud">
                        <span><strong>StrenoxCloud</strong><small>Control Center</small></span>
                    </a>
                    <a href="{{ route('index') }}" class="sx-back">
                        <span class="sx-ico"><i class="fa fa-arrow-left"></i></span><span class="sx-txt">Back to Panel</span>
                    </a>
                    @php
                        $sxActive = fn ($cond) => $cond ? 'sx-active' : '';
                    @endphp
                    <div class="sx-nav-label">Control Center</div>
                    <nav class="sx-nav">
                        <a href="{{ route('admin.index') }}" class="{{ $sxActive(Route::currentRouteName() === 'admin.index') }}">
                            <span class="sx-ico"><i class="fa fa-home"></i></span><span class="sx-txt">Overview</span>
                        </a>
                        <a href="{{ route('admin.settings') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.settings')) }}">
                            <span class="sx-ico"><i class="fa fa-wrench"></i></span><span class="sx-txt">Settings</span>
                        </a>
                        <a href="{{ route('admin.api.index') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.api')) }}">
                            <span class="sx-ico"><i class="fa fa-gamepad"></i></span><span class="sx-txt">Application API</span>
                        </a>
                    </nav>
                    <div class="sx-nav-label">Fleet</div>
                    <nav class="sx-nav">
                        <a href="{{ route('admin.databases') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.databases')) }}">
                            <span class="sx-ico"><i class="fa fa-database"></i></span><span class="sx-txt">Databases</span>
                        </a>
                        <a href="{{ route('admin.locations') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.locations')) }}">
                            <span class="sx-ico"><i class="fa fa-globe"></i></span><span class="sx-txt">Locations</span>
                        </a>
                        <a href="{{ route('admin.nodes') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.nodes')) }}">
                            <span class="sx-ico"><i class="fa fa-sitemap"></i></span><span class="sx-txt">Nodes</span>
                        </a>
                        <a href="{{ route('admin.servers') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.servers')) }}">
                            <span class="sx-ico"><i class="fa fa-server"></i></span><span class="sx-txt">Servers{{ ($serverCount ?? 0) ? ' · ' . $serverCount : '' }}</span>
                        </a>
                        <a href="{{ route('admin.users') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.users')) }}">
                            <span class="sx-ico"><i class="fa fa-users"></i></span><span class="sx-txt">Users{{ ($userCount ?? 0) ? ' · ' . $userCount : '' }}</span>
                        </a>
                    </nav>
                    <div class="sx-nav-label">Services</div>
                    <nav class="sx-nav">
                        <a href="{{ route('admin.mounts') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.mounts')) }}">
                            <span class="sx-ico"><i class="fa fa-magic"></i></span><span class="sx-txt">Mounts</span>
                        </a>
                        <a href="{{ route('admin.nests') }}" class="{{ $sxActive(starts_with(Route::currentRouteName(), 'admin.nests')) }}">
                            <span class="sx-ico"><i class="fa fa-th-large"></i></span><span class="sx-txt">Nests</span>
                        </a>
                    </nav>
                    <a href="{{ route('account') }}" class="sx-profile">
                        <img src="https://www.gravatar.com/avatar/{{ md5(strtolower(Auth::user()->email)) }}?s=160" alt="User">
                        <span class="sx-txt">
                            <strong>{{ Auth::user()->name_first }} {{ Auth::user()->name_last }}</strong>
                            <small><i class="fa fa-circle"></i> Administrator</small>
                        </span>
                        <span id="logoutButton" class="sx-logout" title="Logout"><i class="fa fa-sign-out"></i></span>
                    </a>
                </section>
            </aside>
            <div class="content-wrapper">
                <section class="content-header">
                    @yield('content-header')
                </section>
                <section class="content">
                    <div class="row">
                        <div class="col-xs-12">
                            @if (count($errors) > 0)
                                <div class="alert alert-danger">
                                    There was an error validating the data provided.<br><br>
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            @foreach (Alert::getMessages() as $type => $messages)
                                @foreach ($messages as $message)
                                    <div class="alert alert-{{ $type }} alert-dismissable" role="alert">
                                        {{ $message }}
                                    </div>
                                @endforeach
                            @endforeach
                        </div>
                    </div>
                    @yield('content')
                </section>
            </div>
            <footer class="main-footer">
                <div class="pull-right small text-gray" style="margin-right:10px;margin-top:-7px;">
                    <strong><i class="fa fa-fw {{ $appIsGit ? 'fa-git-square' : 'fa-code-fork' }}"></i></strong> {{ $appVersion }}<br />
                    <strong><i class="fa fa-fw fa-clock-o"></i></strong> {{ round(microtime(true) - LARAVEL_START, 3) }}s
                </div>
                Copyright &copy; {{ date('Y') }} StrenoxCloud. All rights reserved.
            </footer>
        </div>
        @section('footer-scripts')
            <script src="/js/keyboard.polyfill.js" type="application/javascript"></script>
            <script>keyboardeventKeyPolyfill.polyfill();</script>

            {!! Theme::js('vendor/jquery/jquery.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/sweetalert/sweetalert.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/bootstrap/bootstrap.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/slimscroll/jquery.slimscroll.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/adminlte/app.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/bootstrap-notify/bootstrap-notify.min.js?t={cache-version}') !!}
            {!! Theme::js('vendor/select2/select2.full.min.js?t={cache-version}') !!}
            {!! Theme::js('js/admin/functions.js?t={cache-version}') !!}
            {!! Theme::js('js/admin/strenox-admin.js?t=2') !!}
            <script src="/js/autocomplete.js" type="application/javascript"></script>

            @if(Auth::user()->root_admin)
                <script>
                    $('#logoutButton').on('click', function (event) {
                        event.preventDefault();

                        var that = this;
                        swal({
                            title: 'Do you want to log out?',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#d9534f',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Log out'
                        }, function () {
                             $.ajax({
                                type: 'POST',
                                url: '{{ route('auth.logout') }}',
                                data: {
                                    _token: '{{ csrf_token() }}'
                                },complete: function () {
                                    window.location.href = '{{route('auth.login')}}';
                                }
                        });
                    });
                </script>
            @endif

            <script>
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                })
            </script>
        @show
    </body>
</html>
