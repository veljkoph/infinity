<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LanguageController extends Controller
{

    public function index()
    {

        $languages = Language::all();
        return Inertia::render('Languages/LanguagesHome', ['languages' => $languages]);
    }
}
