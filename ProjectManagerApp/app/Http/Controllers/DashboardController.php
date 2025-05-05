<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $totalPendingTasks = Task::query() 
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalProgressTasks = Task::query() 
            ->where('status', 'in progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedTasks = Task::query() 
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeTasks = Task::query() 
            ->whereIn('status', ['pending', 'in progress']) 
            ->where('assigned_user_id', $user->id)
            ->limit(10) 
            ->get();
        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'myPendingTasks' => $myPendingTasks,
            'totalprogressTasks' => $totalProgressTasks,
            'myProgressTasks' => $myProgressTasks,  
            'totalCompletedTasks' => $totalCompletedTasks,
            'myCompletedTasks' => $myCompletedTasks,
            'activeTasks' => $activeTasks,
        ]);
    }
}