<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query= Project::query();

        $sortField= request('sort_field', 'created_at');
        $sortDirection= request('sort_direction',"desc");

        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField,$sortDirection) 
        ->paginate(10);

        $projects->appends(request()->query());
        
        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects)->additional([
                'meta' => [
                    'current_query_params' => request()->query() ?: []
                ]
            ]),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        try {
            $data = $request->validated();
            $image = $data ['image'] ?? null;
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
            
            if ($image) {
                // Validate image file size again for extra security
                if ($image->getSize() > 5120 * 1024) { // 5MB in bytes
                    return back()->withErrors([
                        'image' => 'La imagen excede el límite de 5MB. Por favor, selecciona una imagen más pequeña.'
                    ])->withInput();
                }
                
                // Validate image type
                $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!in_array($image->getMimeType(), $allowedMimeTypes)) {
                    return back()->withErrors([
                        'image' => 'Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG, GIF y WebP.'
                    ])->withInput();
                }
                
                $data['image_path'] = $image->store('project/'.Str::random(), 'public');
            }
            
            Project::create ($data); 

            return to_route('projects.index') 
                -> with('success', 'Project created successfully.');
                
        } catch (\Exception $e) {
            \Log::error('Error uploading project image: ' . $e->getMessage());
            return back()->withErrors([
                'image' => 'Hubo un problema al subir la imagen. Por favor, inténtalo de nuevo.'
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query= $project->tasks();

        $sortField= request('sort_field', 'created_at');
        $sortDirection= request('sort_direction',"desc");

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortField,$sortDirection) 
        ->paginate(10);
        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit', [
            'project' => new ProjectResource($project),
        ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
{
    try {
        $data = $request->validated();
        $name = $project->name;
        
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        
        if ($image) {
            // Validate image file size again for extra security
            if ($image->getSize() > 5120 * 1024) { // 5MB in bytes
                return back()->withErrors([
                    'image' => 'La imagen excede el límite de 5MB. Por favor, selecciona una imagen más pequeña.'
                ])->withInput();
            }
            
            // Validate image type
            $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!in_array($image->getMimeType(), $allowedMimeTypes)) {
                return back()->withErrors([
                    'image' => 'Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG, GIF y WebP.'
                ])->withInput();
            }
            
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        } else {
            unset($data['image']);
        }
        
        $project->update($data);

        return to_route('projects.index')->with('success', "Project \"$name\" edited successfully.");
        
    } catch (\Exception $e) {
        \Log::error('Error updating project image: ' . $e->getMessage());
        return back()->withErrors([
            'image' => 'Hubo un problema al actualizar la imagen. Por favor, inténtalo de nuevo.'
        ])->withInput();
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        
        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);

            $directory = dirname($project->image_path);
            if (Storage::disk('public')->exists($directory) && count(Storage::disk('public')->files($directory)) === 0) {
                Storage::disk('public')->deleteDirectory($directory);
            }
        }
        
        $project->delete();

        return to_route('projects.index')
        -> with('success', "Project \"$name\" deleted successfully.");
    }
}
