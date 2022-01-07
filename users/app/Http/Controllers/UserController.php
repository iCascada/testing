<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Packages\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Получить пользователя по идентификатору
     *
     * @param User $user
     * @return JsonResponse
     */
    public function getUserById(User $user): JsonResponse
    {
        return Response::json($user);
    }

    /**
     * Получить пользователя по адресу электронной почты
     *
     * @param Request $request
     * @param UserRepository $userRepository
     * @return JsonResponse
     * @throws ValidationException
     */
    public function getUserByEmail(Request $request, UserRepository $userRepository): JsonResponse
    {
        $validated = $this->validate(
            $request,
            [
                'email' => 'required|email',
            ]
        );

        $user = $userRepository->getUserByEmail($validated['email']);

        return Response::json($user);
    }
}
