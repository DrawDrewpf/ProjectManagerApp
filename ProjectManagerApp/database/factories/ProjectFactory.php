<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Options images
        $businessImages = [
            'https://picsum.photos/640/480?random=1', // Lorem Picsum
            'https://picsum.photos/640/480?random=2',
            'https://picsum.photos/640/480?random=3',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=480&fit=crop', // Unsplash business
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=480&fit=crop', // Office workspace
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=480&fit=crop', // Business meeting
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=640&h=480&fit=crop', // Office environment
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=640&h=480&fit=crop', // Team collaboration
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=480&fit=crop', // Corporate building
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=640&h=480&fit=crop', // Modern office
        ];

        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()
                ->randomElement(['pending', 'completed', 'in_progress']),
            'image_path' => fake()->randomElement($businessImages),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time()
        ];
    }
}
