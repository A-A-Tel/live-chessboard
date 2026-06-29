<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Game;
use App\Models\User;
use App\Models\UserComment;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index() {
        $user = auth()->user();
        if (!$user) return redirect()->route('login');

        $comments = UserComment::where('user_id', $user->id)
            ->with(['commenter'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Profile', ['user' => $user, 'profileUser' => $user, 'comments' => $comments]);
    }

    public function show(User $user) {

        $comments = UserComment::where('user_id', $user->id)
            ->with(['commenter'])
            ->orderBy('created_at', 'desc')
            ->get();

        $games = Game::where('white_user_id', $user->id)
            ->orWhere('black_user_id', $user->id)
            ->with(['blackUser', 'whiteUser', 'winner'])
            ->get();

        return Inertia::render('Profile', ['user' => auth()->user(), 'profileUser' => $user, 'comments' => $comments, 'games' => $games]);
    }
}
