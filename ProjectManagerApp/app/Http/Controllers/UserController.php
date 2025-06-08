<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    
    public static $wrap = false;

    /**
     * Constructor to bind route model by code
     */
    public function __construct()
    {
        // Bind route model by code instead of id
        $this->middleware(function ($request, $next) {
            if ($request->route('user') && is_string($request->route('user'))) {
                $user = User::where('code', $request->route('user'))->firstOrFail();
                $request->route()->setParameter('user', $user);
            }
            return $next($request);
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query= User::query();

        $sortField= request('sort_field', 'created_at');
        $sortDirection= request('sort_direction',"desc");

        if (request('search')) { 
            $searchTerm = request('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('email', 'like', '%' . $searchTerm . '%');
            });
        }
       

        $users = $query->orderBy($sortField,$sortDirection) 
        ->paginate(10);
        
        $users->appends(request()->query());

        return inertia('Users/Index', [
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'current_query_params' => request()->query() ?: []
                ]
            ]),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() 
    {
        return inertia('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        
        // Handle password encryption
        $data['password'] = bcrypt($data['password']);
        
        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $data['avatar_path'] = $avatarPath;
        }
        
        // Set default timezone if not provided
        if (!isset($data['timezone'])) {
            $data['timezone'] = 'UTC';
        }
        
        $user = User::create($data);

        // Add additional informative message
        if ($user->email_verified_at === null) {
            return to_route('users.index')
                ->with('success', 'User created successfully.')
                ->with('info', 'The user will need to verify their email address.');
        }

        return to_route('users.index') 
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query= $user->tasks();

        $sortField= request('sort_field', 'created_at');
        $sortDirection= request('sort_direction',"desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField,$sortDirection) 
        ->paginate(10);
        
        return Inertia::render('Users/Show', [
            'user' => (new UserResource($user))->resolve(),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('Users/Edit', [
            'user' => (new UserResource($user))->resolve(),
        ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $name = $user->name;
        
        // Handle password encryption
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        
        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $data['avatar_path'] = $avatarPath;
        }
        
        $user->update($data);

        return to_route('users.index')->with('success', "User \"$name\" edited successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        
        // Example validation to show different toast types
        if ($user->tasks()->count() > 0) {
            return to_route('users.index')
                ->with('warning', "User \"$name\" has active tasks. Consider reassigning them before deletion.");
        }
        
        if ($user->id === auth()->id()) {
            return to_route('users.index')
                ->with('error', "You cannot delete your own account.");
        }
        
        // Delete avatar if exists
        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }
        
        $user->delete();

        return to_route('users.index')
            ->with('success', "User \"$name\" deleted successfully.");
    }
}
