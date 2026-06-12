<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        if (isset($data['avatar']))
        {
            $string_name = $this->storeAvatar($data['avatar']);
        }

        $data['avatar'] = $string_name?? null;
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        auth()->login($user);
        return redirect()->intended('/');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();

        if ($user === null) return redirect()->intended('/', 401);

        $data = $request->validated();

        if (isset($data['avatar'])) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
            $string_name = $this->storeAvatar($data['avatar']);
        }
        $data['avatar'] = $string_name?? null;

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $user->update($data);

        return redirect()->intended('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        $user = auth()->user();
        if ($user === null) return redirect()->intended('/', 401);

        auth()->logout();
        $user->delete();
        return redirect()->intended('/');
    }

    /**
     * This function stores the user's avatar with a unique key.
     *
     * @param $avatar
     * @return string The name of the avatar file.
     */
    private function storeAvatar($avatar): string
    {
        $extension = $avatar->getClientOriginalExtension();
        if ($extension === 'jpeg')
        {
            $extension = 'jpg';
        }
        do
        {
            $string_name = Str::random() . '.' . $extension;
        } while (Storage::disk('public')->exists('avatars/' . $string_name));

        Storage::disk('public')->putFileAs('avatars/', $avatar, $string_name);
        return $string_name;
    }
}
