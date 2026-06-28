<?php

namespace App\Events;

use App\Models\Game;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MatchFound implements ShouldBroadcast
{
    public function __construct(public Game $game) {}

    public function broadcastOn(): array
    {
        return [new PresenceChannel('game-queue')];
    }

    public function broadcastWith(): array
    {
        return ['gameId' => $this->game->id];
    }
}
