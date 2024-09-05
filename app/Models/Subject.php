<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{

    protected $fillable = [
        'name',
        'image',
        'language_id'
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    use HasFactory;
}
