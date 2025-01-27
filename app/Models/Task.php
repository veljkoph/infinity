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
        'showHelperText',
        'exercise_id',
        'type',
    ];

    protected $casts = ['answers' => 'array'];
    protected $appends = ['nextTaskId', 'lessonId', 'correctSorting', 'sortableItems'];

    public function getCorrectSortingAttribute()
    {

        if ($this->type === 'sorting') {
            return collect($this->answers)
                ->pluck('text')
                ->implode('');
        }

        return null;
    }
    public function getSortableItemsAttribute()
    {
        if ($this->type === 'sorting_columns') {
            return collect($this->answers)
                ->pluck('items')
                ->flatten(1)
                ->shuffle()
                ->all();
        }

        return null;
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
    public function getLessonIdAttribute()
    {
        return $this->exercise()->pluck('lesson_id')->first();
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
        return $nextTask ? $nextTask->id : null;
    }

    use HasFactory;
}
