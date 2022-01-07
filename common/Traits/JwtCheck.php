<?php

declare(strict_types=1);

namespace Common\Traits;

use Common\Exceptions\Exception;
use Common\Packages\Auth\JwtService;
use Common\Packages\JsonHttp\HttpRequest;
use Firebase\JWT\ExpiredException;
use Illuminate\Http\Request;
use Throwable;
use UnexpectedValueException;

trait JwtCheck
{
    use HttpRequest;

    /**
     * @param Request $request
     * @return void
     * @throws Exception
     */
    public function jwtCheck(Request $request)
    {
        $jwt = $request->bearerToken() ?? substr($request->get('token') ?? '', 7);

        if (!$jwt) {
            throw Exception::unauthorized('Token not found');
        }

        try {
            $tokenPayload = JwtService::decode($jwt);
        } catch (ExpiredException $expiredException) {
            throw Exception::unauthorized($expiredException->getMessage());
        } catch (UnexpectedValueException $unexpectedValueException) {
            throw Exception::badRequest($unexpectedValueException->getMessage());
        } catch (Throwable $exception) {
            throw Exception::forbidden($exception->getMessage());
        }

        if (!$this->isValidIssuer($tokenPayload->iss)) {
            throw Exception::forbidden('Issuer is not valid');
        }

        if (!$this->isValidAudience($tokenPayload->aud)) {
            throw Exception::forbidden('Audience is not valid');
        }

        $user = $this->getRequest(
            env('APP_INTERNAL_URL') . '/api/users/account/by-user-email?email=' . $tokenPayload->email
        );

        $request->request->add(['user' => $user]);
    }

    private function isValidIssuer(string $issuer): bool
    {
        return $issuer === env('APP_ISS');
    }

    private function isValidAudience(string $audience): bool
    {
        return $audience === env('APP_AUD');
    }
}