<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Response;
use Symfony\Component\ErrorHandler\Error\FatalError;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e)
    {
        try {
            $code = $e->getStatusCode();
            if ($e->getStatusCode() === HttpResponse::HTTP_NOT_FOUND) {
                $message = 'Entity not found exception';
            }
        }catch (Throwable $exception) {
            $code = HttpResponse::HTTP_INTERNAL_SERVER_ERROR;
        }

        return Response::json([
            'message' => $message ?? $e->getMessage(),
            'file' => $e->getFile()
        ],
            $code
        );
    }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
