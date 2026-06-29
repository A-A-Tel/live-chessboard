<?php

namespace App\Http\Controllers;

use App\Events\MatchEnded;
use App\Events\MoveMade;
use App\Http\Requests\MoveRequest;
use App\Models\Game;
use App\Models\GameComment;
use App\Models\GameQueue;
use App\Events\MatchFound;
use Inertia\Inertia;
use PChess\Chess\Chess;
use PChess\Chess\Piece;

class GameController extends Controller
{
    public function queue()
    {
        $user = auth()->user();


        $activeGame = Game::where(function($q) use ($user) {
            $q->where('white_user_id', $user->id)
                ->orWhere('black_user_id', $user->id);
        })->where('ended', false)->latest()->first();

        if ($activeGame) return redirect()->route('play', $activeGame->id);

        GameQueue::where('user_id', $user->id)->delete();
        GameQueue::create(['user_id' => $user->id]);
        $this->tryMatchmaking();


        return Inertia::render('Queue');
    }

    public function leaveQueue()
    {
        GameQueue::where('user_id', auth()->id())->delete();
    }

    public function play(Game $game) {
        $user = auth()->user();

        if (($game->white_user_id !== $user->id && $game->black_user_id !== $user->id) || $game->ended) return redirect()->route('queue');

        return Inertia::render('Play', [ 'game' => $game ]);
    }

    public function move(MoveRequest $request, Game $game) {
        $move = $request->validated()['move'];
        $user = auth()->user();

        if (($game->white_user_id !== $user->id && $game->black_user_id !== $user->id) || $game->ended) return redirect()->route('queue');

        $chess = new Chess();
        $moves = $game->moves ? explode("|", $game->moves) : [];

        foreach ($moves as $existingMove) {
            $chess->move($existingMove);
        }

        $isWhiteTurn = $chess->turn === Piece::WHITE;
        $isUserWhite = $game->white_user_id === $user->id;

        if ($isWhiteTurn !== $isUserWhite) return response(status: 400);

        $result = $chess->move($move);

        if (!$result) return response(status: 400);

        $moves[] = $move;
        $game->moves = implode("|", $moves);
        $game->save();

        broadcast(new MoveMade($move, $game->id))->toOthers();

        if ($chess->inCheckmate()) {
            $winner = $isUserWhite ? $game->white_user_id : $game->black_user_id;
            $this->endGame($game, $winner, 'checkmate');
        } elseif ($chess->inStalemate() || $chess->insufficientMaterial() || $chess->inDraw()) {
            $this->endGame($game, null, 'draw');
        }

        return response()->json(['move' => $move], 203);
    }

    public function forfeit(Game $game)
    {
        $user = auth()->user();

        if ($game->white_user_id !== $user->id && $game->black_user_id !== $user->id) {
            return redirect()->route('queue');
        }

        if ($game->ended) return response(status: 400);

        $winner = $game->white_user_id === $user->id
            ? $game->black_user_id
            : $game->white_user_id;

        $this->endGame($game, $winner, 'forfeit');
        return response(status: 204);
    }

    private function endGame(Game $game, ?int $winnerId, string $reason): void
    {
        $game->ended = true;
        $game->winner_id = $winnerId;
        $game->save();

        broadcast(new MatchEnded($game->id, $game->winner_id));
    }


    private function tryMatchmaking(): void
    {
        $players = GameQueue::lockForUpdate()->oldest()->take(2)->get();

        if ($players->count() < 2) return;

        $game = Game::create([
            'white_user_id' => $players[0]->user_id,
            'black_user_id' => $players[1]->user_id,
        ]);

        GameQueue::whereIn('user_id', $players->pluck('user_id'))->delete();

        broadcast(new MatchFound($game));
    }

    public function show(Game $game) {
        $game->load('blackUser', 'whiteUser', 'winner');

        $comments = GameComment::with(['commenter'])->where('game_id', $game->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Game', ['game' => $game, 'comments' => $comments]);
    }
}
