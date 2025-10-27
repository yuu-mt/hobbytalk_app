<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // 入力チェック
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 認証試行
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        // Sanctumトークン発行
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'ログイン成功',
            'token' => $token,
            'user' => $user,
        ], 200);
    }


}
