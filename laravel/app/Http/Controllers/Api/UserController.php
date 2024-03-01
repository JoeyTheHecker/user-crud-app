<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  UserResource::collection(User::query()->orderby('id', 'desc')->paginate(5));
    }

    public function search(Request $request)
    {
        $query  = $request->input('query');

        $usersQuery = User::query();

        $usersQuery->where(function ($queryBuilder) use ($query) {
            $queryBuilder->where('firstname', 'like', "%$query%")
                    ->orWhere('middlename', 'like', "%$query%")
                    ->orWhere('lastname', 'like', "%$query%")
                    ->orWhere('gender', 'like', "%$query%")
                    ->orWhere('age', '=', $query)
                    ->orWhere('id', '=', $query)
                    ->orWhereDate('date_of_birth', $query);
        });

        $users = $usersQuery->orderBy('id', 'desc')->paginate(5);

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response("",204);
    }
}
