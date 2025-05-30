<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SelectOptionsController;

Route::middleware(['web', 'auth'])->group(function () {
    // Rutas para opciones de select dinámicos
    Route::get('/users', [SelectOptionsController::class, 'users']);
    Route::get('/projects', [SelectOptionsController::class, 'projects']);
    Route::get('/priorities', [SelectOptionsController::class, 'priorities']);
    Route::get('/statuses', [SelectOptionsController::class, 'statuses']);
});
