<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        $task = Question::find(1);
        return Inertia::render('Tasks/Questions', ['task' => $task]);
    }
}
