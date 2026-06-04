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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('white_user_id')->constrained('users')->nullOnDelete();
            $table->foreignId('black_user_id')->constrained('users')->nullOnDelete();
            $table->foreignId('winner_id')->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->mediumText('moves');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
