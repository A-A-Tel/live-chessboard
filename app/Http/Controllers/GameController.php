<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameQueue;
use App\Events\MatchFound;
use Inertia\Inertia;

class GameController extends Controller
{
    public function queue()
    {
        $user = auth()->user();

        // Idempotent — don't double-insert
        GameQueue::firstOrCreate(['user_id' => $user->id]);

        $this->tryMatchmaking();

        return Inertia::render('Queue');
    }

    public function leaveQueue()
    {
        GameQueue::where('user_id', auth()->id())->delete();
    }

    public function play() {
        $user = auth()->user();


    }

    private function tryMatchmaking(): void
    {
        // Lock to prevent race conditions if two players join simultaneously
        $players = GameQueue::lockForUpdate()->oldest()->take(2)->get();

        if ($players->count() < 2) return;

        $game = Game::create([
            'white_user_id' => $players[0]->user_id,
            'black_user_id' => $players[1]->user_id,
        ]);

        GameQueue::whereIn('user_id', $players->pluck('user_id'))->delete();

        broadcast(new MatchFound($game))->toOthers();

        // Broadcast to both players (including current user)
        broadcast(new MatchFound($game));
    }
}
