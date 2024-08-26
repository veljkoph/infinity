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
    ];

    protected $casts = ['answers' => 'array'];

    use HasFactory;
}
