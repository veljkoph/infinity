<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        //     dd($request->test);
        $lessons = Lesson::where('subject_id', $request->id)->get();
        return Inertia::render('Lessons/LessonsHome', ['lessons' => $lessons]);
    }
}
