<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginAuthRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) return redirect()->back()->withErrors(['Login' => 'Onjuiste gegevens']);

        auth()->login($user);

        return redirect()->intended('/');
    }

    public function logout(Request $request) {
        if (auth()->check()) auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
