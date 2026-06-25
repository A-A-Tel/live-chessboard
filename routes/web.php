<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelationController;
use App\Http\Controllers\UserCommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSettingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', ['user' => auth()->user()]);
})->name('page.home');

Route::get('/register', function () {
    return Inertia::render('Register', ['user' => auth()->user()]);
})->name('page.register');

Route::get('/login', function () {
    return Inertia::render('Login',['user' => auth()->user()]);
})->name('page.login');

Route::controller(ProfileController::class)->group(function () {
    Route::get('/profile', 'index')->name('profile');
    Route::get('/profile/{user}', 'show')->name('profile.show');
});

Route::controller(UserCommentController::class)->middleware('auth')->group(function () {
    Route::post('/user/comments/{user}', 'store')->name('user.comments.store');
    Route::delete('/user/comments/{comment}', 'destroy')->name('user.comments.destroy');
});

Route::middleware('auth')->group(function () {
    Route::prefix('relations')->group(function () {

        Route::post('/request/{user}', [RelationController::class, 'sendRequest'])
            ->name('relations.request');

        Route::patch('/{relation}/accept', [RelationController::class, 'accept'])
            ->name('relations.accept');

        Route::patch('/{relation}/block', [RelationController::class, 'block'])
            ->name('relations.block');

        Route::delete('/{relation}', [RelationController::class, 'destroy'])
            ->name('relations.destroy');
    });
    Route::get('/friends', [RelationController::class, 'index'])
        ->name('relations.index');
});

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index')->name('users');
    Route::post('/users', 'store')->name('users.store');
    Route::middleware('auth')->group(function () {
        Route::put('/users', 'update')->name('users.update');
        Route::patch('/users', 'changeAvatar')->name('users.changeAvatar');
        Route::delete('/users', 'destroy')->name('users.destroy');
    });
});

Route::middleware('auth')->controller(UserSettingController::class)->group(function () {
    Route::get('/settings', 'index')->name('settings');
    Route::put('/settings', 'update')->name('settings.update');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name("login");
    Route::get('/logout', 'logout')->name("logout");
});

