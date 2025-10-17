<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'birthday' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '名前は必須です。',
            'username.required' => 'ユーザー名は必須です。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'password.confirmed' => 'パスワード確認が一致していません。',
        ];
    }
}
