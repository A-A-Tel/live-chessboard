<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserComment extends Model
{
    protected $fillable = [
        'content',
        'user_id'
    ];

    public function commenter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
