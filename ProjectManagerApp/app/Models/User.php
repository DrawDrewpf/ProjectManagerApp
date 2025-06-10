<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\HasCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable 
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasCode;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'email',
        'password',
        'avatar_path',
        'phone',
        'bio',
        'position',
        'department',
        'status',
        'role',
        'timezone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_login_at' => 'datetime',
        ];
    }

    /**
     * Get tasks assigned to this user
     */
    public function tasks()
    {
        return $this->hasMany(Task::class, 'assigned_user_id');
    }

    /**
     * Get tasks created by this user
     */
    public function createdTasks()
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    /**
     * Get tasks updated by this user
     */
    public function updatedTasks()
    {
        return $this->hasMany(Task::class, 'updated_by');
    }

    /**
     * Get projects created by this user
     */
    public function createdProjects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    /**
     * Get projects updated by this user
     */
    public function updatedProjects()
    {
        return $this->hasMany(Project::class, 'updated_by');
    }

    /**
     * Get the user's avatar URL
     */
    public function getAvatarUrlAttribute()
    {
        if ($this->avatar_path) {
            $url = asset('storage/' . $this->avatar_path);
            // Add timestamp to prevent caching issues
            return $url . '?t=' . $this->updated_at->timestamp;
        }
        
        // Return default avatar based on user initials
        return $this->getDefaultAvatarUrl();
    }

    /**
     * Get default avatar URL with initials
     */
    public function getDefaultAvatarUrl()
    {
        $initials = strtoupper(substr($this->name, 0, 1));
        if (strpos($this->name, ' ') !== false) {
            $nameParts = explode(' ', $this->name);
            $initials = strtoupper(substr($nameParts[0], 0, 1) . substr(end($nameParts), 0, 1));
        }
        
        // Using UI Avatars service for default avatars
        return "https://ui-avatars.com/api/?name=" . urlencode($initials) . "&background=3b82f6&color=ffffff&size=200";
    }

    /**
     * Get user's full display name with position
     */
    public function getDisplayNameAttribute()
    {
        return $this->position ? $this->name . ' (' . $this->position . ')' : $this->name;
    }

    /**
     * Check if user is active
     */
    public function isActive()
    {
        return $this->status === 'active';
    }

    /**
     * Get user's task statistics
     */
    public function getTaskStats()
    {
        return [
            'total' => $this->tasks()->count(),
            'pending' => $this->tasks()->where('status', 'pending')->count(),
            'in_progress' => $this->tasks()->where('status', 'in_progress')->count(),
            'completed' => $this->tasks()->where('status', 'completed')->count(),
        ];
    }

    /**
     * Update last login timestamp
     */
    public function updateLastLogin()
    {
        $this->update(['last_login_at' => now()]);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'code';
    }

}
