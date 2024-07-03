<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'subject_id'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
