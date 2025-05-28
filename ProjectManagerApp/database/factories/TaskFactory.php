<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // // Options images
        $taskImages = [
            'https://picsum.photos/640/480?random=10', // Lorem Picsum variadas
            'https://picsum.photos/640/480?random=11',
            'https://picsum.photos/640/480?random=12',
            'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=640&h=480&fit=crop', // Desk setup
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=640&h=480&fit=crop', // Laptop work
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=480&fit=crop', // Workspace
            'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=640&h=480&fit=crop', // Document planning
            'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=640&h=480&fit=crop', // Task management
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=640&h=480&fit=crop', // Productivity setup
            'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=640&h=480&fit=crop', // Work environment
        ];

        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement(['pending', 'completed', 'in_progress']),
            'priority' => fake()
                ->randomElement(['low', 'medium', 'high']),
            'image_path' => fake()->randomElement($taskImages),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
