<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Carbon\Carbon;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index() {
        $games = Game::with(['winner', 'blackUser', 'whiteUser'])->get();

        $day = Game::with(['winner', 'blackUser', 'whiteUser'])
            ->whereDate('created_at', Carbon::today())
            ->get();

        $week = Game::with(['winner', 'blackUser', 'whiteUser'])
            ->whereBetween('created_at', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])
            ->get();

        return Inertia::render('Home', ['games' => $games, 'day' => $day, 'week' => $week]);
    }
}
