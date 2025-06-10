<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seeder 
        $this->call(EnhancedUserSeeder::class);

        // Create 10 random users
        User::factory(10)->create();

        // User specific
        User::factory()->create([
            'name' => 'Drew User',
            'email' => 'drewpf@e.com',
            'password' => bcrypt('123.321A'),
        ]);

        Project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();
    }
}
