<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commenter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('game_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->string('content', 1024);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_comments');
    }
};
