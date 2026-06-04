<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Friendship extends Model
{
    protected $fillable = [];

    public function userAsUser1(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user1_id');
    }

    public function userAsUser2(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user2_id');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
