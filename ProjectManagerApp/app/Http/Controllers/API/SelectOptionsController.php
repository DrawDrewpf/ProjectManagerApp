<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;

class SelectOptionsController extends Controller
{    /**
     * Get users for select
     */
    public function users(Request $request)
    {
        $query = User::query();
        
        // Optional search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        $users = $query->select('id', 'name', 'email')
                      ->orderBy('name')
                      ->get();
        
        return response()->json([
            'success' => true,
            'data' => $users->map(function($user) {
                return [
                    'value' => $user->id,
                    'label' => $user->name,
                    'extra' => $user->email
                ];
            })
        ]);
    }
    
    /**
     * Get projects for select
     */
    public function projects(Request $request)
    {
        $query = Project::query();
        
        // Optional search
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%");
        }
        
        // Filter by status if specified
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }
        
        $projects = $query->select('id', 'name', 'status')
                         ->orderBy('name')
                         ->get();
        
        return response()->json([
            'success' => true,
            'data' => $projects->map(function($project) {
                return [
                    'value' => $project->id,
                    'label' => $project->name,
                    'extra' => $project->status
                ];
            })
        ]);
    }
    
    /**
     * Get priorities for select
     */
    public function priorities(Request $request)
    {
        $priorities = [
            ['value' => 'low', 'label' => 'Low', 'extra' => 'green'],
            ['value' => 'medium', 'label' => 'Medium', 'extra' => 'yellow'],
            ['value' => 'high', 'label' => 'High', 'extra' => 'orange'],
            ['value' => 'extreme', 'label' => 'Extreme', 'extra' => 'red'],
        ];
        
        // Optional search filter
        if ($request->filled('search')) {
            $search = strtolower($request->get('search'));
            $priorities = array_filter($priorities, function($priority) use ($search) {
                return strpos(strtolower($priority['label']), $search) !== false;
            });
        }
        
        return response()->json([
            'success' => true,
            'data' => array_values($priorities)
        ]);
    }    /**
     * Get statuses for select
     */
    public function statuses(Request $request)
    {
        $type = $request->get('type', 'task'); // 'task' o 'project'
        
        $statuses = [];
        
        if ($type === 'task') {
            $statuses = [
                ['value' => 'pending', 'label' => 'Pending', 'extra' => 'gray'],
                ['value' => 'in_progress', 'label' => 'In Progress', 'extra' => 'blue'],
                ['value' => 'completed', 'label' => 'Completed', 'extra' => 'green'],
            ];
        } else if ($type === 'project') {
            $statuses = [
                ['value' => 'pending', 'label' => 'Pending', 'extra' => 'gray'],
                ['value' => 'in_progress', 'label' => 'In Progress', 'extra' => 'blue'],
                ['value' => 'completed', 'label' => 'Completed', 'extra' => 'green'],
            ];
        }
        
        // Optional search filter
        if ($request->filled('search')) {
            $search = strtolower($request->get('search'));
            $statuses = array_filter($statuses, function($status) use ($search) {
                return strpos(strtolower($status['label']), $search) !== false;
            });
        }
        
        return response()->json([
            'success' => true,
            'data' => array_values($statuses)
        ]);
    }
}
