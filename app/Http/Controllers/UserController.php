<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeAvatarRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Relation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $auth   = auth()->user();
        $search = $request->query('search');
        $key    = intval($request->query('key'));

        $users = User::query()
            ->select(['id', 'username'])
            ->when($auth,   fn ($q) => $q->where('id', '!=', $auth->id))
            ->when($search, fn ($q) => $q->where('username', 'like', "%{$search}%"))
            ->when($key,    fn ($q) => $q->where('id', '>', $key))
            ->paginate();

        if ($auth) {
            $userIds = $users->pluck('id');

            $relations = Relation::query()
                ->where(fn ($q) => $q
                    ->whereIn('user1_id', $userIds)->where('user2_id', $auth->id)
                )
                ->orWhere(fn ($q) => $q
                    ->whereIn('user2_id', $userIds)->where('user1_id', $auth->id)
                )
                ->get()
                ->keyBy(fn ($r) => $r->user1_id === $auth->id ? $r->user2_id : $r->user1_id);

            $users->through(function ($user) use ($relations) {
                $relation = $relations->get($user->id);
                $user->relation = $relation ? [
                    'id'     => $relation->id,
                    'status' => $relation->status,
                    'sender' => $relation->sender_id,
                ] : null;
                return $user;
            });
        }

        return Inertia::render('Users', [
            'user'  => $auth,
            'users' => $users,
        ]);
    }    /**
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

        $data = array_filter(
            $request->validated(),
            fn ($value) => $value !== null && $value !== ''
        );

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $user->update($data);

        return redirect()->intended('/settings');
    }

    public function changeAvatar(ChangeAvatarRequest $request) {
        $user = auth()->user();

        if ($user === null) return redirect()->intended('/', 401);

        $data = array_filter(
            $request->validated(),
            fn ($value) => $value !== null && $value !== ''
        );


        if (isset($data['avatar'])) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
            $string_name = $this->storeAvatar($data['avatar']);
        }
        $data['avatar'] = $string_name?? null;

        $user->update($data);
        return redirect()->intended('/settings');
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
