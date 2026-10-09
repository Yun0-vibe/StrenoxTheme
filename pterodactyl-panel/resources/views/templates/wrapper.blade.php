<!DOCTYPE html>
<html>
    <head>
        <title>{{ config('app.name', 'StrenoxCloud') }}</title>

        @section('meta')
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <meta name="robots" content="noindex, nofollow">
            <meta
                name="description"
                content="StrenoxCloud — liquid-fast game server hosting. Deploy, manage, and scale your worlds from one sleek panel."
            >
            <meta name="theme-color" content="#9123D7">
            <meta name="color-scheme" content="dark">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
                rel="stylesheet"
            >
            <link rel="canonical" href="{{ url()->current() }}">

            {{-- Open Graph --}}
            <meta property="og:type" content="website">
            <meta property="og:site_name" content="{{ config('app.name', 'StrenoxCloud') }}">
            <meta property="og:title" content="{{ config('app.name', 'StrenoxCloud') }} — Game Server Panel">
            <meta
                property="og:description"
                content="StrenoxCloud — liquid-fast game server hosting. Deploy, manage, and scale your worlds from one sleek panel."
            >
            <meta property="og:image" content="{{ url('/favicons/strenoxcloud-logo.png') }}">

            {{-- Twitter --}}
            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="{{ config('app.name', 'StrenoxCloud') }} — Game Server Panel">
            <meta
                name="twitter:description"
                content="StrenoxCloud — liquid-fast game server hosting. Deploy, manage, and scale your worlds from one sleek panel."
            >
            <meta name="twitter:image" content="{{ url('/favicons/strenoxcloud-logo.png') }}">

            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/strenoxcloud-logo.png">
            <link rel="icon" type="image/png" href="/favicons/strenoxcloud-logo.png" sizes="32x32">
            <link rel="icon" type="image/png" href="/favicons/strenoxcloud-logo.png" sizes="16x16">
            <link rel="manifest" href="/favicons/manifest.json">
            <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#9123D7">
            <link rel="shortcut icon" href="/favicons/strenoxcloud-logo.png">
            <meta name="msapplication-config" content="/favicons/browserconfig.xml">
            <meta name="theme-color" content="#9123D7">
        @show

        @section('user-data')
            @if(!is_null(Auth::user()))
                <script>
                    window.PterodactylUser = {!! json_encode(Auth::user()->toVueObject()) !!};
                </script>
            @endif
            @if(!empty($siteConfiguration))
                <script>
                    window.SiteConfiguration = {!! json_encode($siteConfiguration) !!};
                </script>
            @endif
        @show

        @yield('assets')

        @include('layouts.scripts')
    </head>
    <body class="{{ $css['body'] ?? 'bg-neutral-50' }}">
        @section('content')
            @yield('above-container')
            @yield('container')
            @yield('below-container')
        @show
        @section('scripts')
            {!! $asset->js('main.js') !!}
        @show
    </body>
</html>
