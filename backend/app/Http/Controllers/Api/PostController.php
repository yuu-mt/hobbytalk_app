<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // 最新投稿を取得
        return Post::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2024',
            'video' => 'nullable|mimetypes:video/mp4,mov,video/quicktime|max:10240',
        ]);

        $post = new Post();
        $post->user_id = auth()->id();
        $post->content = $validated['content'] ?? null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts/images','public');
            $post->image_path = $path;
        }

        if($request->hasFile('video')) {
            $path = $request->file('video')->store('posts/videos', 'public');
            $post->video_path = $path;
        }

        $post->save();

        return response()->json(['message' => '投稿しました', 'post' => $post], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);
        return $post->load('user');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $this->authorize('delete', $post);
        $post->delete();

        return response()->json(['message' => '投稿を削除しました']);
    }
}
