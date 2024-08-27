<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'sound',
        'image',
        'question',
        'answers',
        'helperText',
        'exercise_id',
        'type'
    ];

    protected $casts = ['answers' => 'array'];
    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
    use HasFactory;
}
