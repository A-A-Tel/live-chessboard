<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
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
        $auth = auth()->user();
        $search = $request->query('search');
        $key = intval($request->query('key'));

        $users = User::query()
            ->when($auth, fn ($q) =>
            $q->where('users.id', '!=', $auth->id)
            )
            ->when($search, fn ($q) =>
            $q->where('users.username', 'like', "%{$search}%")
            )
            ->when($key, fn ($q) =>
            $q->where('users.id', '>', $key)
            )
            ->addSelect(['users.id', 'users.username'])

            ->when($auth, function ($q) use ($auth) {

                $relation = DB::table('relations')
                    ->selectRaw("
                    json_object(
                        'id', id,
                        'status', status,
                        'sender', sender_id
                    )
                ")
                    ->where(function ($q) use ($auth) {
                        $q->whereColumn('user1_id', 'users.id')
                            ->where('user2_id', $auth->id);
                    })
                    ->orWhere(function ($q) use ($auth) {
                        $q->whereColumn('user2_id', 'users.id')
                            ->where('user1_id', $auth->id);
                    })
                    ->limit(1);

                $q->addSelect([
                    'relation' => $relation,
                ]);
            })

            ->paginate();

        foreach ($users->items() as $user) {
            $user->relation = json_decode($user->relation);
        }

        return Inertia::render('Users', [
            'user'    => $auth,
            'users'   => $users
        ]);
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
