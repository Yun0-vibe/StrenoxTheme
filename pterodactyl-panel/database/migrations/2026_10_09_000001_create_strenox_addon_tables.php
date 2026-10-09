<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('strenox_announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('priority', ['info', 'warning', 'critical'])->default('info');
            $table->string('tag')->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        Schema::create('strenox_store_orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->string('plan');
            $table->decimal('amount', 8, 2);
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('strenox_tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->string('subject');
            $table->enum('status', ['open', 'answered', 'closed'])->default('open');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('strenox_ticket_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedInteger('user_id');
            $table->text('message');
            $table->boolean('is_staff')->default(false);
            $table->timestamps();

            $table->foreign('ticket_id')->references('id')->on('strenox_tickets')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('strenox_ticket_messages');
        Schema::dropIfExists('strenox_tickets');
        Schema::dropIfExists('strenox_store_orders');
        Schema::dropIfExists('strenox_announcements');
    }
};
