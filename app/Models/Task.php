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
        'type',

    ];

    protected $casts = ['answers' => 'array'];
    protected $appends = ['nextTaskId'];
    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }

    public function getNextTaskIdAttribute()
    {
        $nextTask = Task::where('exercise_id', $this->exercise_id)
            ->where(function ($query) {
                $query->where('order', '>', $this->order)
                    ->orWhere(function ($query) {
                        $query->where('order', $this->order)
                            ->where('id', '>', $this->id);
                    });
            })
            ->orderBy('order', 'asc')
            ->orderBy('id', 'asc')
            ->first();

        // Vrati ID sledećeg taska ili `null` ako ne postoji
        return $nextTask ? $nextTask->id : null;
    }

    use HasFactory;
}
