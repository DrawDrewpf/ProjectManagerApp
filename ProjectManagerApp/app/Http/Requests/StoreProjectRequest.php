<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif,svg", "max:5120"],
            "description" => "nullable|string|max:1000",
            "status" => ["required", Rule::in(['pending', 'in_progress', 'completed'])],
            "due_date" => "nullable|date",

        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'The image must be a file of type: JPEG, PNG, JPG, GIF, or SVG.',
            'image.max' => 'The image file size cannot exceed 5MB.',
        ];
    }
}
