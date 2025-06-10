<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        try {
            $data = $request->validated();
            $user = $request->user();
            
            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                $avatarFile = $request->file('avatar');
                
                // Delete old avatar if exists
                if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
                    Storage::disk('public')->delete($user->avatar_path);
                }
                
                // Store new avatar
                $avatarPath = $avatarFile->store('avatars', 'public');
                $data['avatar_path'] = $avatarPath;
            }
            
            // Remove avatar from data if not uploaded to avoid overwriting with null
            if (!$request->hasFile('avatar')) {
                unset($data['avatar']);
            }
            
            // Email is not editable from this form, so we exclude it
            unset($data['email']);
            
            $user->fill($data);
            $user->save();

            return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
            
        } catch (\Exception $e) {
            return back()->withErrors([
                'avatar' => 'There was a problem updating your profile. Please try again.'
            ])->withInput();
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
