<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Game;
use App\Models\GameComment;
use App\Models\User;
use App\Models\UserComment;
use Illuminate\Http\Request;

class GameCommentController extends Controller
{
    public function store(StoreCommentRequest $request, Game $game) {
        $data = $request->validated();
        $commenter = auth()->user();

        $data['commenter_id'] = $commenter->id;
        $data['game_id'] = $game->id;

        GameComment::create($data);

        return redirect()->route('game.show', ['game' => $game->id]);
    }

    public function destroy(Request $request, GameComment $comment) {
        $user = auth()->user();

        if (!$user || $user->id !== $comment->commenter_id) return redirect()->route('profile.show', ['game' => $comment->game_id]);

        $comment->delete();
        return redirect()->route('game.show', ['game' => $comment->game_id]);
    }
}
