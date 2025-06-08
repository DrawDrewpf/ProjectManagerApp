<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'phone' => fake()->optional()->phoneNumber(),
            'bio' => fake()->optional()->sentence(15),
            'position' => fake()->optional()->randomElement([
                'Software Developer',
                'Project Manager',
                'UI/UX Designer',
                'QA Engineer',
                'DevOps Engineer',
                'Product Owner',
                'Scrum Master',
                'Business Analyst',
                'Tech Lead',
                'Data Analyst'
            ]),
            'department' => fake()->optional()->randomElement([
                'Development',
                'Design',
                'Quality Assurance',
                'Product Management',
                'Marketing',
                'Operations',
                'Human Resources',
                'Finance'
            ]),
            'status' => fake()->randomElement(['active', 'active', 'active', 'inactive']), // 75% active
            'timezone' => fake()->randomElement([
                'UTC',
                'America/New_York',
                'America/Los_Angeles',
                'Europe/London',
                'Europe/Madrid',
                'Asia/Tokyo'
            ]),
            'last_login_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
