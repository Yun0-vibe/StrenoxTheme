@extends('layouts.admin')

@section('title')
    News Manager
@endsection

@section('content-header')
    <h1>News Manager<small>Publish announcements to the panel news feed.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">News</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-md-4">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">New Announcement</h3>
            </div>
            <form action="{{ route('admin.strenox.announcements.store') }}" method="POST">
                <div class="box-body">
                    {!! csrf_field() !!}
                    <div class="form-group">
                        <label class="control-label">Title</label>
                        <input type="text" name="title" class="form-control" required maxlength="191" placeholder="Scheduled maintenance" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">Content</label>
                        <textarea name="content" class="form-control" rows="5" required placeholder="What should users know?"></textarea>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label class="control-label">Priority</label>
                            <select name="priority" class="form-control">
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6">
                            <label class="control-label">Tag</label>
                            <input type="text" name="tag" class="form-control" maxlength="64" placeholder="Maintenance" />
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-sm btn-primary pull-right"><i class="fa fa-fw fa-bullhorn"></i> Publish</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-8">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">All Announcements</h3>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>State</th>
                            <th class="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($announcements as $announcement)
                            <tr>
                                <td>
                                    <strong>{{ $announcement->title }}</strong><br>
                                    <small class="text-muted">{{ Str::limit($announcement->content, 80) }} · {{ $announcement->created_at->diffForHumans() }}</small>
                                </td>
                                <td>
                                    @if ($announcement->priority === 'critical')
                                        <span class="label label-danger">Critical</span>
                                    @elseif ($announcement->priority === 'warning')
                                        <span class="label label-warning">Warning</span>
                                    @else
                                        <span class="label label-info">Info</span>
                                    @endif
                                </td>
                                <td>
                                    @if ($announcement->published)
                                        <span class="label label-success">Published</span>
                                    @else
                                        <span class="label label-default">Hidden</span>
                                    @endif
                                </td>
                                <td class="text-right" style="white-space:nowrap;">
                                    <form action="{{ route('admin.strenox.announcements.toggle', $announcement->id) }}" method="POST" style="display:inline;">
                                        {!! csrf_field() !!}
                                        <button type="submit" class="btn btn-xs btn-default" title="{{ $announcement->published ? 'Hide' : 'Publish' }}">
                                            <i class="fa fa-fw fa-eye{{ $announcement->published ? '-slash' : '' }}"></i>
                                        </button>
                                    </form>
                                    <form action="{{ route('admin.strenox.announcements.destroy', $announcement->id) }}" method="POST" style="display:inline;" onsubmit="return confirm('Delete this announcement permanently?');">
                                        {!! csrf_field() !!}
                                        <input type="hidden" name="_method" value="DELETE" />
                                        <button type="submit" class="btn btn-xs btn-danger" title="Delete">
                                            <i class="fa fa-fw fa-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr><td colspan="4" class="text-center text-muted">No announcements yet.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
