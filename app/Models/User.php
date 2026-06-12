<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'email', 'username', 'password', 'avatar'
    ];

    protected $hidden = [
        'remember_token',
        'password'
    ];

    public function userSetting(): HasOne
    {
        return $this->hasOne(UserSetting::class);
    }

    public function gamesAsWhite(): HasMany
    {
        return $this->hasMany(Game::class, 'white_user_id');
    }

    public function gamesAsBlack(): HasMany
    {
        return $this->hasMany(Game::class, 'black_user_id');
    }

    public function gamesAsWinner(): HasMany
    {
        return $this->hasMany(Game::class, 'winner_id');
    }

    public function profileComments(): HasMany
    {
        return $this->hasMany(UserComment::class, 'user_id');
    }

    public function userComments(): HasMany
    {
        return $this->hasMany(UserComment::class, 'commenter_id');
    }

    public function gameComments(): HasMany
    {
        return $this->hasMany(GameComment::class, 'commenter_id');
    }

    public function friendshipsAsUser1(): HasMany
    {
        return $this->hasMany(Friendship::class, 'user1_id');
    }

    public function friendshipsAsUser2(): HasMany
    {
        return $this->hasMany(Friendship::class, 'user2_id');
    }
}
