<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable 
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
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
}
