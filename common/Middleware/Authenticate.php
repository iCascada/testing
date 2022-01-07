<?php

namespace Common\Middleware;

use Closure;
use Common\Exceptions\Exception;
use Common\Packages\JsonHttp\Response;
use Common\Traits\JwtCheck;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class Authenticate
{
    use JwtCheck;

    /**
     * @throws Exception
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$request->hasHeader('authorization')) {
            return Response::json([], HttpResponse::HTTP_UNAUTHORIZED);
        }

        $this->jwtCheck($request);

        return $next($request);
    }
}
