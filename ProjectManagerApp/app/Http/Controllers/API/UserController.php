<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get users for select components
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%");
            });
        }

        // Apply status filter
        if ($request->has('status')) {
            $query->where('status', $request->get('status'));
        }

        // Apply department filter
        if ($request->has('department')) {
            $query->where('department', $request->get('department'));
        }

        // Apply role filter
        if ($request->has('role')) {
            $query->where('role', $request->get('role'));
        }

        // Limit results
        $limit = min($request->get('limit', 50), 100);
        
        $users = $query->select('id', 'name', 'email', 'avatar_path', 'position', 'department', 'status', 'role')
                      ->orderBy('name')
                      ->take($limit)
                      ->get();

        $data = $users->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
                'extra' => $user->email . ($user->position ? " • {$user->position}" : ''),
                'status' => $user->status,
                'role' => $user->role,
                'department' => $user->department,
                'avatar' => $user->avatar_url,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
            'total' => $users->count()
        ]);
    }

    /**
     * Get departments for select components
     */
    public function departments(Request $request)
    {
        $query = User::query()->whereNotNull('department')->distinct();

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('department', 'like', "%{$search}%");
        }

        $departments = $query->pluck('department')
                            ->filter()
                            ->unique()
                            ->sort()
                            ->values();

        $data = $departments->map(function ($department) {
            return [
                'value' => $department,
                'label' => $department,
                'extra' => 'Department'
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
            'total' => $data->count()
        ]);
    }

    /**
     * Get positions for select components
     */
    public function positions(Request $request)
    {
        $query = User::query()->whereNotNull('position')->distinct();

        // Apply search filter
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('position', 'like', "%{$search}%");
        }

        // Apply department filter
        if ($request->has('department')) {
            $query->where('department', $request->get('department'));
        }

        $positions = $query->pluck('position')
                          ->filter()
                          ->unique()
                          ->sort()
                          ->values();

        $data = $positions->map(function ($position) {
            return [
                'value' => $position,
                'label' => $position,
                'extra' => 'Position'
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
            'total' => $data->count()
        ]);
    }

    /**
     * Get user roles for select components
     */
    public function roles(Request $request)
    {
        $roles = [
            ['value' => 'admin', 'label' => 'Administrator', 'extra' => 'Full system access'],
            ['value' => 'manager', 'label' => 'Manager', 'extra' => 'Team management'],
            ['value' => 'user', 'label' => 'User', 'extra' => 'Standard access'],
        ];

        // Apply search filter
        if ($request->has('search')) {
            $search = strtolower($request->get('search'));
            $roles = array_filter($roles, function ($role) use ($search) {
                return strpos(strtolower($role['label']), $search) !== false ||
                       strpos(strtolower($role['extra']), $search) !== false;
            });
        }

        return response()->json([
            'success' => true,
            'data' => array_values($roles),
            'total' => count($roles)
        ]);
    }

    /**
     * Get user statuses for select components
     */
    public function statuses(Request $request)
    {
        $statuses = [
            ['value' => 'active', 'label' => 'Active', 'extra' => 'User is active'],
            ['value' => 'inactive', 'label' => 'Inactive', 'extra' => 'User is inactive'],
            ['value' => 'suspended', 'label' => 'Suspended', 'extra' => 'User is suspended'],
        ];

        // Apply search filter
        if ($request->has('search')) {
            $search = strtolower($request->get('search'));
            $statuses = array_filter($statuses, function ($status) use ($search) {
                return strpos(strtolower($status['label']), $search) !== false ||
                       strpos(strtolower($status['extra']), $search) !== false;
            });
        }

        return response()->json([
            'success' => true,
            'data' => array_values($statuses),
            'total' => count($statuses)
        ]);
    }
}
