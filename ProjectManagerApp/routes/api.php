<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SelectOptionsController;
use App\Http\Controllers\Api\UserController;

Route::middleware(['web', 'auth'])->group(function () {
    // Routes for dynamic select options
    Route::get('/users', [SelectOptionsController::class, 'users']);
    Route::get('/projects', [SelectOptionsController::class, 'projects']);
    Route::get('/priorities', [SelectOptionsController::class, 'priorities']);
    Route::get('/statuses', [SelectOptionsController::class, 'statuses']);
    
    // User management API routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/departments', [UserController::class, 'departments']);
        Route::get('/positions', [UserController::class, 'positions']);
        Route::get('/roles', [UserController::class, 'roles']);
        Route::get('/statuses', [UserController::class, 'statuses']);
    });
});
