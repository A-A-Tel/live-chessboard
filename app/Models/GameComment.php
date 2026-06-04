<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameComment extends Model
{
    protected $fillable = [
        'content',
        'game_id'
    ];

    public function commenter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id');
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class, 'game_id');
    }
}
