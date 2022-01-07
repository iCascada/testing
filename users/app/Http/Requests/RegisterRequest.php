<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends LoginRequest
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
     * @return array
     */
    public function rules()
    {
        $additionalRules = [
            'name' => 'required|min:2',
            'lastName' => 'required|min:2',
            'confirmPassword' => 'required|same:password',
            'departmentId' => 'required',
        ];

        return [...parent::rules(), ...$additionalRules];
    }

    public function messages()
    {
        $additionalMessages = [
            'name.required' => 'Имя обязательно для заполнения',
            'name.min' => 'Имя не может содержать менее 2 символов',
            'lastName.required' => 'Фамилия обязательна для заполнения',
            'lastName.min' => 'Фамилия не может содержать менее 2 символов',
            'confirmPassword.required' => 'Пароль не подтвержден',
            'confirmPassword.same' => 'Пароли не совпадают',
            'departmentId.required' => 'Дапартамент обязателен для заполнения'
        ];

        return [...parent::messages(), ...$additionalMessages];
    }
}
