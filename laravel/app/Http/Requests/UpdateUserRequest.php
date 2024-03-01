<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'firstname' => 'required|string|max:20|alpha_only',
            'middlename' => 'nullable|string|max:20|alpha_only',
            'lastname' => 'required|string|max:20|alpha_only',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:20|alpha_only',
            'age' => 'required|integer',
        ];
    }
}
