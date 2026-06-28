<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('game-queue', function (User $user) {
    return $user;
});
