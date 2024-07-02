<?php

use App\Http\Controllers\DrawController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\Test;
use App\Models\Subject;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return redirect('/region');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/subjects/{slug}', [SubjectController::class, 'index'])->name('subjects.home');
Route::get('/region', [LanguageController::class, 'index'])->name('subjects.languages');
Route::get('/draw', [DrawController::class, 'index'])->name('draw.home');
Route::get('/questions', [QuestionController::class, 'index'])->name('questions.home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
