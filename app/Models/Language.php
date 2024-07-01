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

    public function subjectLang()
    {
        return $this->hasMany(Subject::class, 'id');
    }

    use HasFactory;
}
