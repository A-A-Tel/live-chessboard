<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserCommentRequest;
use App\Models\User;
use App\Models\UserComment;
use Illuminate\Http\Request;

class UserCommentController extends Controller {

    public function store(StoreUserCommentRequest $request, User $user) {
        $data = $request->validated();
        $commenter = auth()->user();

        $data['commenter_id'] = $commenter->id;
        $data['user_id'] = $user->id;

        UserComment::create($data);

        return redirect()->route('profile.show', ['user' => $user->id]);
    }

    public function destroy(Request $request, UserComment $comment) {
        $user = auth()->user();

        if (!$user || $user->id !== $comment->commenter_id) return redirect()->route('profile.show', ['user' => $comment->user_id]);

        $comment->delete();
        return redirect()->route('profile.show', ['user' => $comment->user_id]);
    }
}
