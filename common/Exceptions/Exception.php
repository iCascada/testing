<?php

namespace Common\Exceptions;

use Exception as BaseException;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class Exception extends BaseException
{
    #[Pure] public function __construct(string $message = "", int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    #[Pure] public static function unauthorized(string $message = 'authorization error'): static
    {
        return new static($message, Response::HTTP_UNAUTHORIZED);
    }

    #[Pure] public static function badRequest(string $message = 'bad request error'): static
    {
        return new static($message, Response::HTTP_BAD_REQUEST);
    }

    #[Pure] public static function forbidden(string $message = 'forbidden error'): static
    {
        return new static($message, Response::HTTP_FORBIDDEN);
    }

    #[Pure] public static function conflict(string $message = 'conflict error'): static
    {
        return new static($message, Response::HTTP_CONFLICT);
    }
}
