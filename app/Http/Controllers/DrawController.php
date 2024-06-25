<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DrawController extends Controller
{
    public function index()
    {

        return Inertia::render('Tasks/Draw', ['letter' => "m"]);
    }
}
