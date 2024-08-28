<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'lesson_id'
    ];
    protected $appends = ['firstTaskId'];
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('order', 'asc');;
    }
    public function firstTask()
    {
        return $this->tasks()->where('exercise_id', $this->id)->first();
    }
    public function getFirstTaskIdAttribute()
    {
        return $this->tasks()->where('exercise_id', $this->id)->pluck('id')->first();
    }
}
