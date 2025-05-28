<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) 
    {
        $user = Auth::user();

        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        return Inertia::render('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'myPendingTasks' => $myPendingTasks,
            'totalProgressTasks' => $totalProgressTasks,
            'myProgressTasks' => $myProgressTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'myCompletedTasks' => $myCompletedTasks,
        ]);
    }

    public function myActiveTasksData(Request $request)
    {
        $user = Auth::user();
        $query = Task::with(['project:id,name'])
            ->where('assigned_user_id', $user->id)
            ->whereIn('status', ['pending', 'in_progress']);

        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                    ->orWhereHas('project', function ($projectQuery) use ($searchTerm) {
                        $projectQuery->where('name', 'like', '%' . $searchTerm . '%');
                    });
            });
        }

        $sortField = $request->input('sort_field', 'due_date');
        $sortDirection = $request->input('sort_direction', 'asc');

        if ($sortField === 'project.name') {
            $query->join('projects', 'tasks.project_id', '=', 'projects.id')
                  ->orderBy('projects.name', $sortDirection)
                  ->select('tasks.*');
        } else if (in_array($sortField, ['id', 'name', 'status', 'priority', 'due_date', 'created_at'])) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('due_date', 'asc');
        }

        $tasks = $query->paginate($request->input('per_page', 10))->onEachSide(1);

        return response()->json([
            'data' => TaskResource::collection($tasks->items()),
            'meta' => [
                'current_page' => $tasks->currentPage(),
                'from' => $tasks->firstItem(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'to' => $tasks->lastItem(),
                'total' => $tasks->total(),
                'links' => $tasks->linkCollection()->toArray(),
            ]
        ]);
    }
}