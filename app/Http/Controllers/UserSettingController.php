<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserSettingsRequest;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $userSetting = UserSetting::where('user_id', $user->id)->first();

        return Inertia::render('Settings', ['user' => auth()->user(), 'settings' => $userSetting->bitmap]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserSettingsRequest $request)
    {
        $data = $request->validated();

        $user = auth()->user();

        if (!$user) return redirect()->route('page.login');

        $userSetting = UserSetting::where('user_id', $user->id)->first();

        if (!$userSetting) return redirect()->route('settings');
        $userSetting->update($data);
        return redirect()->route('settings');
    }
}
