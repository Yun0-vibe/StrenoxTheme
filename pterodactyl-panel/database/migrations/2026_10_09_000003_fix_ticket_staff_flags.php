<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class () extends Migration {
    /**
     * Clear the staff flag from messages written by the ticket owner
     * themselves. Only replies by somebody else count as staff replies.
     */
    public function up(): void
    {
        DB::table('strenox_ticket_messages as m')
            ->join('strenox_tickets as t', 't.id', '=', 'm.ticket_id')
            ->whereColumn('m.user_id', 't.user_id')
            ->where('m.is_staff', true)
            ->update(['m.is_staff' => false]);
    }

    public function down(): void
    {
        // Intentionally not reversible: ownership of past messages is factual.
    }
};
