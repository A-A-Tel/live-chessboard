<?php

use App\Models\Game;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('game-queue', function (User $user) {
    return ['id' => $user->id, 'name' => $user->name];
});

Broadcast::channel('play.{gameId}', function (User $user, int $gameId) {
    $game = Game::find($gameId);
    if (!$game) return false;
    if ($user->id !== $game->white_user_id && $user->id !== $game->black_user_id) return false;
    return ['id' => $user->id, 'name' => $user->name];
});
