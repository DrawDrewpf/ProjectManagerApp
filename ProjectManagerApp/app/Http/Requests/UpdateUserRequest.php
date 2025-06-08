<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')->id;
        
        return [
            "name" => "required|string|max:255",
            "email" => [
                "required",
                "string",
                "email",
                "max:255",
                Rule::unique('users')->ignore($userId)
            ],
            "password" => [
                "nullable",
                "confirmed",
                Password::min(8)->letters()->symbols()->numbers(),
            ],
            "avatar" => "nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048",
            "phone" => "nullable|string|max:20",
            "bio" => "nullable|string|max:1000",
            "position" => "nullable|string|max:255",
            "department" => "nullable|string|max:255",
            "status" => "required|in:active,inactive,suspended",
            "role" => "required|in:admin,manager,user",
            "timezone" => "nullable|string|max:50",
        ];
    }
}
