<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Older migration 2018_02_25_160152 calls ->default(null)->change() without ->nullable(),
     * which rebuilds `users.external_id` as NOT NULL when the schema dump is unavailable and
     * migrations are run from scratch. That breaks `p:user:make` (it cannot insert NULL).
     * This ensures the column is nullable again.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'external_id')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('external_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        // This should not be rolled back.
    }
};
