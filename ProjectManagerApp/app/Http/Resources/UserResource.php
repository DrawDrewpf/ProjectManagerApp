<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "code" => $this->code,
            "name" => $this->name,
            "email" => $this->email,
            "avatar_url" => $this->avatar_url,
            "phone" => $this->phone,
            "bio" => $this->bio,
            "position" => $this->position,
            "department" => $this->department,
            "status" => $this->status,
            "timezone" => $this->timezone,
            "role" => $this->role,
            "display_name" => $this->display_name,
            "is_active" => $this->isActive(),
            "last_login_at" => $this->last_login_at ? Carbon::parse($this->last_login_at)->format('d/m/Y H:i') : null,
            "created_at" => Carbon::parse($this->created_at)->format('d/m/Y'),
            "updated_at" => Carbon::parse($this->updated_at)->format('d/m/Y'),
            "task_stats" => $this->when(
                $request->routeIs('users.show'), 
                fn() => $this->getTaskStats()
            ),
        ];
    }
}