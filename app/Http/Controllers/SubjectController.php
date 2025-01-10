<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index($slug)
    {

        $subjects = Subject::where('language_id', $slug)->get();
        return Inertia::render('Subjects/SubjectsHome', ['subjects' => $subjects]);
    }
}
