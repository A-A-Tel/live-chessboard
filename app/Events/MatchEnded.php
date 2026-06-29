<?php

namespace App\Events;

use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class MatchEnded implements ShouldBroadcastNow
{
    public int $gameId;
    public ?int $winnerId;

    public function __construct(
        int $gameId,
        ?int $winnerId
    ) {
        $this->gameId = $gameId;
        $this->winnerId = $winnerId;
    }

    public function broadcastOn(): array
    {
        return [new PresenceChannel("play.{$this->gameId}")];
    }

    public function broadcastAs(): string
    {
        return 'MatchEnded';
    }
}
