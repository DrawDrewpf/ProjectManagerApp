<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EnhancedUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@projectmanager.com',
            'password' => Hash::make('password'),
            'phone' => '+1-555-0100',
            'bio' => 'System administrator with full access to all features.',
            'position' => 'System Administrator',
            'department' => 'Operations',
            'status' => 'active',
            'timezone' => 'UTC',
            'email_verified_at' => now(),
        ]);

        // Create sample users with enhanced data
        $sampleUsers = [
            [
                'name' => 'John Smith',
                'email' => 'john.smith@projectmanager.com',
                'password' => Hash::make('password'),
                'phone' => '+1-555-0101',
                'bio' => 'Experienced software developer with expertise in web technologies.',
                'position' => 'Software Developer',
                'department' => 'Development',
                'status' => 'active',
                'timezone' => 'America/New_York',
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@projectmanager.com',
                'password' => Hash::make('password'),
                'phone' => '+1-555-0102',
                'bio' => 'Creative UI/UX designer passionate about user experience.',
                'position' => 'UI/UX Designer',
                'department' => 'Design',
                'status' => 'active',
                'timezone' => 'America/Los_Angeles',
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael.brown@projectmanager.com',
                'password' => Hash::make('password'),
                'phone' => '+1-555-0103',
                'bio' => 'Detail-oriented project manager with 5+ years of experience.',
                'position' => 'Project Manager',
                'department' => 'Product Management',
                'status' => 'active',
                'timezone' => 'America/New_York',
            ],
            [
                'name' => 'Emma Wilson',
                'email' => 'emma.wilson@projectmanager.com',
                'password' => Hash::make('password'),
                'phone' => '+1-555-0104',
                'bio' => 'Quality assurance engineer ensuring product excellence.',
                'position' => 'QA Engineer',
                'department' => 'Quality Assurance',
                'status' => 'active',
                'timezone' => 'Europe/London',
            ],
            [
                'name' => 'David Lee',
                'email' => 'david.lee@projectmanager.com',
                'password' => Hash::make('password'),
                'phone' => '+1-555-0105',
                'bio' => 'DevOps engineer specializing in cloud infrastructure.',
                'position' => 'DevOps Engineer',
                'department' => 'Development',
                'status' => 'inactive',
                'timezone' => 'Asia/Tokyo',
            ],
        ];

        foreach ($sampleUsers as $userData) {
            $userData['email_verified_at'] = now();
            $userData['last_login_at'] = fake()->optional()->dateTimeBetween('-1 month', 'now');
            User::create($userData);
        }

        // Generate additional random users
        User::factory(15)->create();
    }
}
