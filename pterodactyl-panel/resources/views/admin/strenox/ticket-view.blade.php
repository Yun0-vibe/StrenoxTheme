@extends('layouts.admin')

@section('title')
    Ticket #{{ $ticket->id }}
@endsection

@section('content-header')
    <h1>Ticket #{{ $ticket->id }}<small>{{ $ticket->subject }}</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li><a href="{{ route('admin.strenox.tickets') }}">Tickets</a></li>
        <li class="active">#{{ $ticket->id }}</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Conversation</h3>
                <div class="box-tools pull-right">
                    <a href="{{ route('admin.strenox.tickets') }}" class="btn btn-xs btn-default"><i class="fa fa-fw fa-arrow-left"></i> All Tickets</a>
                </div>
            </div>
            <div class="box-body">
                <div class="strenox-thread">
                    @forelse ($ticket->messages as $message)
                        <div class="strenox-msg {{ $message->is_staff ? 'strenox-msg-staff' : 'strenox-msg-user' }}">
                            @if ($message->is_staff)
                                <div class="strenox-msg-tag">StrenoxCloud Staff</div>
                            @else
                                <div class="strenox-msg-tag strenox-msg-tag-user">{{ $message->user?->username ?? 'User' }}</div>
                            @endif
                            <div class="strenox-msg-body">{{ $message->message }}</div>
                            <div class="strenox-msg-date">{{ $message->created_at->toDateTimeString() }}</div>
                        </div>
                    @empty
                        <p class="text-center text-muted">No messages yet.</p>
                    @endforelse
                </div>
            </div>
            <div class="box-footer">
                <form action="{{ route('admin.strenox.ticket.reply', $ticket->id) }}" method="POST">
                    {!! csrf_field() !!}
                    <div class="input-group">
                        <input type="text" name="message" class="form-control" placeholder="Write a staff reply and press Enter…" required maxlength="65535" autocomplete="off" />
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-fw fa-paper-plane"></i> Reply</button>
                        </span>
                    </div>
                    <p class="text-muted" style="margin:8px 0 0;"><small>Enter sends the reply. Your message posts as <strong>StrenoxCloud Staff</strong>.</small></p>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Details</h3>
            </div>
            <div class="box-body">
                <p><strong>Subject</strong><br>{{ $ticket->subject }}</p>
                <p><strong>Opened by</strong><br>{{ $ticket->user?->username ?? '—' }} <span class="text-muted">{{ $ticket->user?->email ?? '' }}</span></p>
                <p><strong>Priority</strong><br>
                    @if ($ticket->priority === 'high')
                        <span class="label label-danger">High</span>
                    @elseif ($ticket->priority === 'medium')
                        <span class="label label-warning">Medium</span>
                    @else
                        <span class="label label-info">Low</span>
                    @endif
                </p>
                <p><strong>Status</strong><br>
                    @if ($ticket->status === 'open')
                        <span class="label label-success">Open</span>
                    @elseif ($ticket->status === 'answered')
                        <span class="label label-info">Answered</span>
                    @else
                        <span class="label label-default">Closed</span>
                    @endif
                </p>
                <p class="text-muted"><small>Opened {{ $ticket->created_at->diffForHumans() }}</small></p>
            </div>
            <div class="box-footer">
                <form action="{{ route('admin.strenox.ticket.status', $ticket->id) }}" method="POST" style="display:flex;gap:8px;">
                    {!! csrf_field() !!}
                    <button type="submit" name="status" value="open" class="btn btn-xs btn-success" @if($ticket->status === 'open') disabled @endif>Open</button>
                    <button type="submit" name="status" value="answered" class="btn btn-xs btn-primary" @if($ticket->status === 'answered') disabled @endif>Answered</button>
                    <button type="submit" name="status" value="closed" class="btn btn-xs btn-default" @if($ticket->status === 'closed') disabled @endif>Close</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
