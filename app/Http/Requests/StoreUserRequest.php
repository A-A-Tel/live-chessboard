<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string|max:32|unique:users|min:6',
            'email' => 'email|required|unique:users',
            'password' => 'min:6|required|confirmed',
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ];
    }
}
