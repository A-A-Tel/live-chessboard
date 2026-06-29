<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Game extends Model
{
    protected $fillable = [
        'moves',
        'white_user_id',
        'black_user_id',
        'winner_id',
        'ended'
    ];

    public function whiteUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'white_user_id');
    }

    public function blackUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'black_user_id');
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'winner_id');
    }
}
