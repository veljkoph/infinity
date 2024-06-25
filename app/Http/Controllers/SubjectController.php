<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return Inertia::render('Subjects/AllSubjects', ['subjects' => $subjects]);
    }
}
