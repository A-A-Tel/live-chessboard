<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
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
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Profile', ['user' => $user, 'profileUser' => $user]);
    }

    public function show(User $user) {
        return Inertia::render('Profile', ['user' => auth()->user(), 'profileUser' => $user]);
    }

    public function store(StoreProfileRequest $request, User $user) {
        $data = $request->validated();
        $commenter = auth()->user();

        $data['user_id'] = $user->id;
        $data['commenter_id'] = $commenter->id;

        UserComment::create($data);

        redirect()->route('profile.show', ['user' => $user->id]);
    }
}
