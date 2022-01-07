<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Common\Packages\Auth\JwtService;
use Common\Traits\JwtCheck;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Throwable;

class LoginController extends Controller
{
    use JwtCheck;

    public function login(LoginRequest $loginRequest)
    {
        $credentials = $loginRequest->validated();

        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user()->with('department', 'role')->first();

            return Response::json($user)->withHeaders(
                [
                    'Authorization' => 'Bearer ' . JwtService::encode($user->toArray())
                ]
            );
        }

        return Response::json([], HttpResponse::HTTP_FORBIDDEN);
    }

    /**
     * Проверка пользователя на аутентификацию
     *
     * @param Request $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function isAuth(Request $request): JsonResponse
    {
        try {
            $this->jwtCheck($request);
        }catch (Throwable $exception) {
            return Response::json(['message' => $exception->getMessage()]);
        }

        return Response::json(['user' => $request->get('user')]);
    }

    public function logout(Request $request)
    {
        $user = $request->get('user');

        if (!$user) {
            return Response::json(['message' => 'bad request'], HttpResponse::HTTP_BAD_REQUEST);
        }

        $request->request->remove('user');
        $request->headers->remove('Authorization');

        return Response::json();
    }
}
