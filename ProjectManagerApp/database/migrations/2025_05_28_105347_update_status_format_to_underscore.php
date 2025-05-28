<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update projects table
        DB::table('projects')
            ->where('status', 'in progress')
            ->update(['status' => 'in_progress']);
            
        // Update tasks table
        DB::table('tasks')
            ->where('status', 'in progress')
            ->update(['status' => 'in_progress']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback projects table
        DB::table('projects')
            ->where('status', 'in_progress')
            ->update(['status' => 'in progress']);
            
        // Rollback tasks table
        DB::table('tasks')
            ->where('status', 'in_progress')
            ->update(['status' => 'in progress']);
    }
};
