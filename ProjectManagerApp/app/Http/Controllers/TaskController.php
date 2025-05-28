<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()->with(['project', 'assignedUser', 'createdBy', 'updatedBy']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('search')) {
            $searchTerm = request('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%');
            });
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        $tasks->appends(request()->query());

        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks)->additional([
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
        $projects = Project::all();
        $users = User::all();

        return inertia('Tasks/Create', [
            'projects' => UserResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        Task::create($data);

        return to_route('tasks.index')
            ->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Tasks/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        return inertia('Tasks/Edit', [
            'projects' => UserResource::collection($projects),
            'users' => UserResource::collection($users),
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->delete($task->image_path);
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        
        $task->update($data);

        return to_route('tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        if ($task->image_path) {
            Storage::disk('public')->delete($task->image_path);

            $directory = dirname($task->image_path);
            if (Storage::disk('public')->exists($directory) && count(Storage::disk('public')->files($directory)) === 0) {
                Storage::disk('public')->deleteDirectory($directory);
            }
        }

        $task->delete();

        return to_route('tasks.index')
            ->with('success', "Task \"$name\" deleted successfully.");
    }

    public function myTasks(){
        $user = Auth::user(); 
        $query = Task::query()->where('assigned_user_id', $user->id)->with(['project', 'assignedUser', 'createdBy', 'updatedBy']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('search')) {
            $searchTerm = request('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%');
            });
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10);

        $tasks->appends(request()->query());

        return inertia('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks)->additional([
                'meta' => [
                    'current_query_params' => request()->query() ?: []
                ]
            ]),
            'queryParams' => request()->query() ?: null,
            'isMyTasks' => true,
        ]);
    }
}
