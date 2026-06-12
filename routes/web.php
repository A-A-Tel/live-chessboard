<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', ['user' => auth()->user()]);
})->name('page.home');

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/profile', function () {
    return Inertia::render('Profile', ['user' => auth()->user()]);
});


Route::controller(UserController::class)->group(function () {
    Route::post('/users', 'store');
    Route::put('/users', 'update');
    Route::delete('/users', 'destroy');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::get('/logout', 'logout');
});

