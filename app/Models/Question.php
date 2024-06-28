<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'title',
        'audio_url',
        'question',
        'answers'
    ];
    protected $casts = [
        'answers' => 'array',
    ];
    use HasFactory;
}
