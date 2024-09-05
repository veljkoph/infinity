<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'name',
        'image',
        'slug',
    ];

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'language_slug', 'slug');
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }

    use HasFactory;
}
