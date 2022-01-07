<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterRequest;
use App\Packages\UserRepository;
use Common\Packages\Auth\JwtService;
use Common\Packages\JsonHttp\Response as CommonResponse;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Throwable;

class RegisterController
{
    /**
     * @throws Throwable
     */
    public function register(RegisterRequest $request, UserRepository $userRepository)
    {
        try {
            $user = $userRepository->saveUser($request->all());

            return Response::json(
                $user,
                HttpResponse::HTTP_CREATED
            )->withHeaders(
                [
                    'Authorization' => 'Bearer ' . JwtService::encode($user->toArray())
                ]
            );
        }catch (Throwable $e){
            if ($e instanceof QueryException) {
                return CommonResponse::conflict('User with current email already exist');
            }

            throw $e;
        }
    }
}
