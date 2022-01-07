<?php

namespace Common\Packages\JsonHttp;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response as BaseResponse;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class Response
{
    /**
     * Unauthorized
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function unauthorized(string $message = 'unauthorized'): JsonResponse
    {
        Return BaseResponse::json(['message' => $message], HttpResponse::HTTP_UNAUTHORIZED);
    }

    /**
     * Bad request
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function badRequest(string $message = 'bad request'): JsonResponse
    {
        Return BaseResponse::json(['message' => $message], HttpResponse::HTTP_BAD_REQUEST);
    }

    /**
     * Forbidden
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function forbidden(string $message = 'forbidden'): JsonResponse
    {
        Return BaseResponse::json(['message' => $message], HttpResponse::HTTP_FORBIDDEN);
    }

    /**
     * Forbidden
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function conflict(string $message = 'http conflict'): JsonResponse
    {
        Return BaseResponse::json(['message' => $message], HttpResponse::HTTP_CONFLICT);
    }
}