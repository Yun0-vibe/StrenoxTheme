@extends('layouts.admin')

@section('title')
    Support Tickets
@endsection

@section('content-header')
    <h1>Support Tickets<small>Every ticket in the system — open one to read and reply.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Tickets</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">All Tickets</h3>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Subject</th>
                            <th>User</th>
                            <th>Priority</th>
                            <th class="text-right">Status</th>
                            <th class="text-right">Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($tickets as $ticket)
                            <tr>
                                <td><code>#{{ $ticket->id }}</code></td>
                                <td><a href="/tickets?open={{ $ticket->id }}">{{ $ticket->subject }}</a></td>
                                <td class="text-muted">{{ $ticket->user?->username ?? '—' }}<br><small>{{ $ticket->user?->email ?? '' }}</small></td>
                                <td>
                                    @if ($ticket->priority === 'high')
                                        <span class="label label-danger">High</span>
                                    @elseif ($ticket->priority === 'medium')
                                        <span class="label label-warning">Medium</span>
                                    @else
                                        <span class="label label-info">Low</span>
                                    @endif
                                </td>
                                <td class="text-right">
                                    @if ($ticket->status === 'open')
                                        <span class="label label-success">Open</span>
                                    @elseif ($ticket->status === 'answered')
                                        <span class="label label-info">Answered</span>
                                    @else
                                        <span class="label label-default">Closed</span>
                                    @endif
                                </td>
                                <td class="text-right text-muted">{{ $ticket->updated_at->diffForHumans() }}</td>
                            </tr>
                        @empty
                            <tr><td colspan="6" class="text-center text-muted">No tickets yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
