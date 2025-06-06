<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('code')->nullable()->after('id');
        });

        // Generate codes for existing records
        $users = User::all();
        foreach ($users as $index => $user) {
            $user->code = 'USR-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $user->save();
        }

        // Make field unique and not null
        Schema::table('users', function (Blueprint $table) {
            $table->string('code')->unique()->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
};
