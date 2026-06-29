<?php

namespace App\Events;

use App\Models\Game;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class MatchFound implements ShouldBroadcast
{
    public int $gameId;

    public function __construct(Game $game)
    {
        $this->gameId = $game->id;
    }

    public function broadcastOn(): array
    {
        return [new PresenceChannel('game-queue')];
    }

    public function broadcastAs(): string {
        return 'MatchFound';
    }
}

