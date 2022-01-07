<?php

declare(strict_types=1);

use JetBrains\PhpStorm\NoReturn;
use Symfony\Component\VarDumper\VarDumper;

if (!function_exists('dd')) {
    /**
     * Dump the passed variables and end the script.
     *
     * @param  mixed  $args
     * @return void
     */
    #[NoReturn] function dd(...$args)
    {
        header('Access-Control-Allow-Origin: ' . env('APP_ACCESS_CONTROL'));
        header('Access-Control-Allow-Methods: *');
        header('Access-Control-Allow-Headers: *');
        http_response_code(500);

        foreach ($args as $arg) {
            VarDumper::dump($arg);
        }

        exit(1);
    }
}
