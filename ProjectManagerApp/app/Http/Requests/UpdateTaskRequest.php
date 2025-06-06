<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:low,medium,high,extreme',
            'assigned_user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a file of type: JPEG, PNG, JPG, or GIF.',
            'image.max' => 'The image file size cannot exceed 5MB.',
        ];
    }
}
