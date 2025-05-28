<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Project;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('code')->nullable()->after('id');
        });

        // Generar códigos para registros existentes
        $projects = Project::all();
        foreach ($projects as $index => $project) {
            $project->code = 'PRJ-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $project->save();
        }

        // Hacer el campo unique y not null
        Schema::table('projects', function (Blueprint $table) {
            $table->string('code')->unique()->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
};
