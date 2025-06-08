<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar_path')->nullable()->after('email');
            $table->string('phone')->nullable()->after('avatar_path');
            $table->text('bio')->nullable()->after('phone');
            $table->string('position')->nullable()->after('bio');
            $table->string('department')->nullable()->after('position');
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active')->after('department');
            $table->timestamp('last_login_at')->nullable()->after('status');
            $table->string('timezone')->default('UTC')->after('last_login_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar_path',
                'phone', 
                'bio',
                'position',
                'department',
                'status',
                'last_login_at',
                'timezone'
            ]);
        });
    }
};
